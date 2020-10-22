import patientEntries from '../../data/patients';
import { NonSensitivePatientEntry } from '../types';

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
const addEntry = () => {
    return null;
};
export default {
    getNonSensitiveEntries,
    addEntry
};