import patientEntries from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntry = ( entry: NewPatientEntry): PatientEntry => {
    const id: string = uuidv4();
    const newPatientEntry = {
        id: id,
        ...entry
    };
    patientEntries.push(newPatientEntry);
    return newPatientEntry;
};
export default {
    getNonSensitiveEntries,
    addEntry
};