"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedication = exports.updateMedication = exports.findMedicationsByUserId = exports.createMedication = void 0;
const dt_1 = __importDefault(require("../config/dt"));
// Criar um novo medicamento
const createMedication = (medicationData) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Medications (userId, name, dosage, frequency, schedule, brand, days, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())';
        dt_1.default.query(query, [
            medicationData.userId,
            medicationData.name,
            medicationData.dosage,
            medicationData.frequency, // Frequência é diretamente o número
            medicationData.schedule,
            medicationData.brand,
            medicationData.days // Adiciona a nova coluna days
        ], (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.createMedication = createMedication;
// Buscar medicamentos por ID de usuário
const findMedicationsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Medications WHERE userId = ?';
        dt_1.default.query(query, [userId], (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.findMedicationsByUserId = findMedicationsByUserId;
// Atualizar um medicamento existente
const updateMedication = (medicationId, medicationData) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Medications SET name = ?, dosage = ?, frequency = ?, schedule = ?, brand = ?, days = ?, updatedAt = NOW() WHERE id = ?';
        dt_1.default.query(query, [
            medicationData.name,
            medicationData.dosage,
            medicationData.frequency, // Frequência é diretamente o número
            medicationData.schedule,
            medicationData.brand,
            medicationData.days, // Atualiza a coluna days
            medicationId
        ], (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.updateMedication = updateMedication;
// Deletar um medicamento
const deleteMedication = (medicationId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Medications WHERE id = ?';
        dt_1.default.query(query, [medicationId], (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.deleteMedication = deleteMedication;
