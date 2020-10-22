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
patientsrouter.post('/', (_req, res) => {
    res.send('saving patient!');
});
exports.default = patientsrouter;
