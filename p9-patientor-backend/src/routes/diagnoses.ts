import express from 'express';
import diagnoseService from '../services/diagnoseService';
const diagnosesrouter = express.Router();

diagnosesrouter.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

diagnosesrouter.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});
export default diagnosesrouter;