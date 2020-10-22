"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
const diagnosesrouter = express_1.default.Router();
diagnosesrouter.get('/', (_req, res) => {
    res.send(diagnoseService_1.default.getEntries());
});
diagnosesrouter.post('/', (_req, res) => {
    res.send('Saving a diagnose!');
});
exports.default = diagnosesrouter;
