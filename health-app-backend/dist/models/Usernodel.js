"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.deleteUser = exports.updateUser = exports.findUserByEmail = exports.createUser = void 0;
const dt_1 = __importDefault(require("../config/dt"));
const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Users (name, email, password, birthdate, gender, ethnicity, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
        dt_1.default.query(query, [userData.name, userData.email, userData.password, userData.birthdate, userData.gender, userData.ethnicity], (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.createUser = createUser;
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Users WHERE email = ?';
        dt_1.default.query(query, [email], (err, results) => {
            if (err)
                return reject(err);
            resolve(results.length > 0 ? results[0] : null);
        });
    });
};
exports.findUserByEmail = findUserByEmail;
// Atualize as funções de atualização e exclusão conforme necessário para incluir 'birthdate' e 'gender'.
const updateUser = (userId, userData) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Users SET name = ?, email = ?, birthdate = ?, gender = ?, ethnicity = ?, updatedAt = NOW() WHERE id = ?';
        dt_1.default.query(query, [userData.name, userData.email, userData.birthdate, userData.gender, userData.ethnicity, userId], (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.updateUser = updateUser;
const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Users WHERE id = ?';
        dt_1.default.query(query, [userId], (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
};
exports.deleteUser = deleteUser;
const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Users WHERE id = ?';
        dt_1.default.query(query, [id], (err, results) => {
            if (err)
                return reject(err);
            resolve(results.length > 0 ? results[0] : null); // Retorna o primeiro usuário encontrado ou null
        });
    });
};
exports.findUserById = findUserById;
