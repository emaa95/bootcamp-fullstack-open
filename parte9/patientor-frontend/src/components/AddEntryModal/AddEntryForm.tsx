import { SyntheticEvent, useEffect, useState } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../types";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import diagnosesService from "../../services/diagnosis";



interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

interface HealthCheckRatingOption {
    value: number;
    label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating).filter((value) => typeof value === "number")
.map((v) => ({
    value: v as number,
    label: HealthCheckRating[v as number]
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [entryOptions, setEntryOptions] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await diagnosesService.getAll();
        setDiagnoses(response);
      } catch (error) {
        console.error("Error fetching diagnoses:", error);
      }
    };

    fetchDiagnoses();
  }, []);

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
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

    typeof value === "string"
      ? setDiagnosisCodes(value.split(", "))
      : setDiagnosisCodes(value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (entryOptions) {
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
            criteria,
          },
        });
        break;

      case "OccupationalHealthcare":
        onSubmit({
          type:"OccupationalHealthcare",
          ...baseEntry,
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                }
              : undefined,
        });
    }
  };

  return (
    <div>
        <Grid container direction="row" spacing={1}
        justifyContent="center"
        alignItems="center">
        <FormControl fullWidth style={{marginBottom: "0.5rem"}}>
        <Grid item xs={12}>  
        <InputLabel id="demo-simple-select-label">Entry options</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={entryOptions}
          label="Entry Options"
          onChange={({ target }) => setEntryOptions(target.value)}
          fullWidth
        >
          <MenuItem key="HealthCheck" value="HealthCheck">
            Health Check
          </MenuItem>
          <MenuItem key="Hospital" value="Hospital">
            Hospital
          </MenuItem>
          <MenuItem key="OccupationalHealthcare" value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
        </Select>
       
        </Grid>
        </FormControl>
        <FormControl component="form" onSubmit={addEntry}>
        <Grid item container xs={12} spacing={1}>
        <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ margin: 0 }} 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            name="specialist"
            label="Specialist"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
            fullWidth
          />
          </Grid>
          
          <Grid item xs={6} >
          <FormControl fullWidth style={{marginBottom: "0.5rem"}}>
          <InputLabel id="demo-multiple-chip-label">Diagnosis Codes</InputLabel>
          <Select 
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            value={diagnosisCodes}
            onChange={onDiagnosisCodesChange}
            fullWidth
            multiple
            input={<OutlinedInput id="select-multiple-chip" label="Diagnosis Codes"/>}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
           
          )}
          >
          {
            diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code}
              </MenuItem>
            ))  
          }
          </Select>
          </FormControl>
          </Grid>
          
          </Grid>
          
        {entryOptions === "HealthCheck" && (
          <>
            <FormControl style={{marginBottom: "0.5rem"}}>
            <InputLabel >HealthCheckRating</InputLabel>
            <Select

              label="HealthCheckRating"
              value={healthCheckRating.toString()}
              onChange={onHealthCheckRatingChange}
              variant="outlined"
            >
            {
              healthCheckRatingOptions.map((op) => (
                <MenuItem key={op.label} value={op.value}>
                  {op.label}
                </MenuItem>
              ))
            }
            </Select>
            </FormControl>
          </>
        )}
        {entryOptions === "Hospital" && (
          <>
            <FormControl style={{marginBottom: "0.5rem"}}>
            <Grid item container xs={12} spacing={1}>
            <Grid item xs={6}>
            <TextField
              type="date"
              label="Discharge Date"
              name="dischargeDate"
              variant="outlined" 
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              type="text"
              name="criteria"
              label="Criteria"
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
              fullWidth
            />
            </Grid>
            </Grid>
            </FormControl>
          </>
        )}
        {entryOptions === "OccupationalHealthcare" && (
          <>
            <FormControl fullWidth>
            <Grid container spacing={1}>
            <Grid item xs={12}>            
            <TextField
              type="text"
              name="employerName"
              label="Employer Name"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              fullWidth
            />
            <Divider style={{margin:"0.5rem"}}>
              Sick Leave
            </Divider>
            <Grid container spacing={1}>
            <Grid item xs={6}>
            <TextField
              type="date"
              label="Start Date"
              name="startDate"
              variant="outlined" 
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            </Grid>
            <Grid item xs={6}>
             <TextField
              type="date"
              label="End Date"
              name="endDate"
              variant="outlined" 
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            </Grid>
            </Grid>
            </Grid>
            </Grid>
            </FormControl>
          </>
        )}
        <Grid container spacing={4.5}>
        <Grid item xs={10}>
        <Button variant="contained" onClick={onCancel}>CANCEL</Button>
        </Grid>
        <Grid item xs={2}>
        <Button variant="contained" type="submit">ADD</Button>
        </Grid>
        </Grid>
        </FormControl>
        </Grid>
        
        
    </div>

  );
};

export default AddEntryForm;
