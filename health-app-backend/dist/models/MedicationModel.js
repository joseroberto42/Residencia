"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedication = exports.updateMedication = exports.findMedicationsByUserIdAndName = exports.findMedicationsByUserId = exports.createMedication = void 0;
const dt_1 = __importDefault(require("../config/dt"));
// Criar um novo medicamento
const createMedication = (data) => {
    const { userId, name, dosage, frequency, schedule, brand, days } = data;
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Medications (userId, name, dosage, frequency, schedule, brand, days) VALUES (?, ?, ?, ?, ?, ?, ?)';
        dt_1.default.query(query, [userId, name, dosage, frequency, schedule, brand, days], (err, results) => {
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
// Buscar medicamentos por ID de usuário e nome
const findMedicationsByUserIdAndName = (userId, name) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM Medications WHERE userId = ?';
        const params = [userId];
        // Adicionar filtro por nome, se fornecido
        if (name) {
            query += ' AND name LIKE ?';
            params.push(`%${name}%`);
        }
        dt_1.default.query(query, params, (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.findMedicationsByUserIdAndName = findMedicationsByUserIdAndName;
// Atualizar medicamento
const updateMedication = (id, data) => {
    const { userId, name, dosage, frequency, schedule, brand, days } = data;
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Medications SET userId = ?, name = ?, dosage = ?, frequency = ?, schedule = ?, brand = ?, days = ? WHERE id = ?';
        dt_1.default.query(query, [userId, name, dosage, frequency, schedule, brand, days, id], (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.updateMedication = updateMedication;
// Excluir medicamento
const deleteMedication = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Medications WHERE id = ?';
        dt_1.default.query(query, [id], (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.deleteMedication = deleteMedication;
