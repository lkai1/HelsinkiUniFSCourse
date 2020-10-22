import express from 'express';
import patientService from '../services/patientService';
const patientsrouter = express.Router();

patientsrouter.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});
patientsrouter.post('/', (_req, res) => {
    res.send('saving patient!');
});

export default patientsrouter;
