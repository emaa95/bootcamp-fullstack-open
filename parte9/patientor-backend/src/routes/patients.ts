import  express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry, { toNewEntry } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id',(req,res) => {
    res.send(patientService.findById(req.params.id));
});

router.post('/', (req, res) => {

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    
});

router.post('/:id/entries', (req,res) => {
    
    try{
        const patient = patientService.findById(req.params.id);
        if( patient === undefined){
            res.status(404).send('patient not found');
            return;
        }
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(patient, newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;


