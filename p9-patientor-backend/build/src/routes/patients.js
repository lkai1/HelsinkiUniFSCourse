"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const patientsrouter = express_1.default.Router();
patientsrouter.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
patientsrouter.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, ssn, dateOfBirth, occupation, gender } = req.body;
    const newPatientEntry = patientService_1.default.addEntry({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ssn,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        dateOfBirth,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        occupation,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        gender
    });
    res.json(newPatientEntry);
});
exports.default = patientsrouter;
