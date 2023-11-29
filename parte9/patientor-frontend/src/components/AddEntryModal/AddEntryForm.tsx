import { SyntheticEvent, useState } from "react";
import { Diagnosis, EntryFormValues} from "../../types";
import { SelectChangeEvent } from "@mui/material";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
    const [dischargeDate, setDischargeDate] = useState('');
    const [criteria, setCriteria] = useState('');

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
        onSubmit({
            type: "Hospital",
            description,
            date,
            specialist,
            diagnosisCodes,
            discharge: {
                date: dischargeDate, 
                criteria
            }
        });
        setDescription('');
        setDate('');
        setSpecialist('');
        setDiagnosisCodes([]);
        setDischargeDate('');
        setCriteria('');
    };

    return (
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
        <div>
          <label>Discharge Date:</label>
          <input
            type="text"
            name="dischargeDate"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
        </div>
        <div>
          <label>Discharge Criteria:</label>
          <input
            type="text"
            name="criteria"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
      );
    
};

export default AddEntryForm;