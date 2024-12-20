"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = require("mysql2");
const dotenv_1 = __importDefault(require("dotenv"));
// Configurando variáveis de ambiente
dotenv_1.default.config();
const connection = (0, mysql2_1.createConnection)({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
// Conectando ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
});
exports.default = connection;
