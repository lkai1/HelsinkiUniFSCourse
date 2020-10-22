import diagnoseEntries from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
    return diagnoseEntries;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry
};