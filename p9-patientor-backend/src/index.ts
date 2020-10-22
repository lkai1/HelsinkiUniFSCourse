import express from 'express';
import diagnosesrouter from './routes/diagnoses';
import patientsrouter from './routes/patients';
import cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;

app.use('/api/diagnoses', diagnosesrouter);
app.use('/api/patients', patientsrouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});