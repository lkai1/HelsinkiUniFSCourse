import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
const patientsrouter = express.Router();

patientsrouter.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});
patientsrouter.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addEntry(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

export default patientsrouter;
