"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedicationHandler = exports.updateMedicationHandler = exports.getMedicationsHandler = exports.createMedicationHandler = void 0;
const MedicationModel_1 = require("../models/MedicationModel");
const createMedicationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extraindo os campos necessários do corpo da requisição, incluindo brand e days
    const { userId, name, dosage, frequency, schedule, brand, days } = req.body;
    try {
        // Incluindo todos os campos na chamada para createMedication
        yield (0, MedicationModel_1.createMedication)({ userId, name, dosage, frequency, schedule, brand, days });
        res.status(201).json({ message: 'Medicamento criado com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao criar medicamento.', error });
    }
});
exports.createMedicationHandler = createMedicationHandler;
const getMedicationsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    try {
        const medications = yield (0, MedicationModel_1.findMedicationsByUserId)(userId);
        res.json(medications);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar medicamentos.', error });
    }
});
exports.getMedicationsHandler = getMedicationsHandler;
const updateMedicationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medicationId = Number(req.params.id);
    // Extraindo todos os campos necessários, incluindo brand e days
    const { userId, name, dosage, frequency, schedule, brand, days } = req.body;
    try {
        // Incluindo todos os campos na chamada para updateMedication
        yield (0, MedicationModel_1.updateMedication)(medicationId, { userId, name, dosage, frequency, schedule, brand, days });
        res.json({ message: 'Medicamento atualizado com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar medicamento.', error });
    }
});
exports.updateMedicationHandler = updateMedicationHandler;
const deleteMedicationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medicationId = Number(req.params.id);
    try {
        yield (0, MedicationModel_1.deleteMedication)(medicationId);
        res.json({ message: 'Medicamento excluído com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao excluir medicamento.', error });
    }
});
exports.deleteMedicationHandler = deleteMedicationHandler;
