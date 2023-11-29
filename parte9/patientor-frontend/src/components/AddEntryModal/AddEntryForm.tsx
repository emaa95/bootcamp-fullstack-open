import { SyntheticEvent, useState } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating} from "../../types";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
}

/*
interface HealthCheckRatingOption {
    value: number;
    label: string;
}

const HealthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating).filter((value) => typeof value === "number")
.map((v) => ({
    value: v as number,
    label: HealthCheckRating[v as number]
}));
*/
const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
    const [dischargeDate, setDischargeDate] = useState('');
    const [criteria, setCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');
    const [entryOptions, setEntryOptions] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

    const onHealthCheckRAtingChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();

        const value = Number(event.target.value);

        const healthCheckRating = Object.values(HealthCheckRating);
    
        if (value && healthCheckRating.includes(value)) {
            setHealthCheckRating(value);
        }
    };

    const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
        event.preventDefault();

        const value = event.target.value;

        typeof value === "string" ?
        setDiagnosisCodes(value.split(', '))
        : 
        setDiagnosisCodes(value);
    };

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        
        const baseEntry = {
            description,
            date,
            specialist,
            diagnosisCodes,
        };
        
        switch(entryOptions){
            case "HealthCheck":
                onSubmit({
                    type: "HealthCheck",
                    ...baseEntry,
                    healthCheckRating
                });
                break;
            case "Hospital": 
                onSubmit({
                    type: "Hospital",
                    ...baseEntry,
                    discharge: {
                        date: dischargeDate,
                        criteria
                    }
                });
                break;

            case "OccupationalHealthcare":
                onSubmit({
                    type: "OccupationalHealthcare",
                    ...baseEntry,
                    employerName,
                    sickLeave: sickLeaveStart && sickLeaveEnd ? {
                        startDate: sickLeaveStart,
                        endDate: sickLeaveEnd
                    } : undefined
                });
        }
    };

    return (
        <div>
            <InputLabel>Entry Options</InputLabel>
            <Select 
            label="Option"
            fullWidth
            value={entryOptions}
            onChange={({target}) => setEntryOptions(target.value)}
            >
                <MenuItem key="HealthCheck" value="HealthCheck">Health Check</MenuItem>
                <MenuItem key="Hospital" value="Hospital">Hospital</MenuItem>
                <MenuItem key="OccupationalHealthcare" value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            </Select>
        <form onSubmit={addEntry}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Specialist:</label>
          <input
            type="text"
            name="specialist"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>
        <div>
          <label>Diagnosis Codes (comma-separated):</label>
          <input
            type="text"
            name="diagnosisCodes"
            value={diagnosisCodes.join(', ')}
            onChange={(e) => onDiagnosisCodesChange(e)}
          />
        </div>
        {entryOptions === "HealthCheck" && 
            <>
                <label>HealthCheckRating</label>
                <input  
                    type="number"
                    name="healtCheckRating"
                    value={healthCheckRating}
                    onChange={onHealthCheckRAtingChange}
                />
            </>
        }
        {
            entryOptions === "Hospital" && 
            <>
                <label>Discharge Date</label>
                <input  
                    type="text"
                    name="dischargeDate"
                    value={dischargeDate}
                    onChange={({target}) => setDischargeDate(target.value)}
                />
                <label>Discharge Criteria</label>
                <input  
                    type="text"
                    name="criteria"
                    value={criteria}
                    onChange={({target}) => setCriteria(target.value)}
                />
            </>
        }
        {
            entryOptions === "OccupationalHealthcare" && 
            <>
                <label>
                    Employer Name
                </label>
                <input  
                    type="text"
                    name="employerName"
                    value={employerName}
                    onChange={({target}) => setEmployerName(target.value)}
                />
                <label>
                    Sick Leave: 
                </label>
                <label>
                    Start Date
                </label>
                <input 
                    type="text"
                    name="sickLeaveStart"
                    value={sickLeaveStart}
                    onChange={({target}) => setSickLeaveStart(target.value)}

                />
                <label>
                    End Start
                </label>
                <input 
                    type="text"
                    name="sickLeaveEnd"
                    value={sickLeaveEnd}
                    onChange={({target}) => setSickLeaveEnd(target.value)}

                />
            </>
        }

        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
      </div>
      );
    
};

export default AddEntryForm;