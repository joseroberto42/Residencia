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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Usernodel_1 = require("../models/Usernodel"); // Corrigido nome para 'UserModel'
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Cadastro de usuário
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, birthdate, gender, ethnicity } = req.body;
    if (!name || !email || !password || !birthdate || !gender || !ethnicity) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const existingUser = yield (0, Usernodel_1.findUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já registrado.' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield (0, Usernodel_1.createUser)({
            name,
            email,
            password: hashedPassword,
            birthdate,
            gender,
            ethnicity,
        });
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro interno ao criar usuário.' });
    }
}));
// Login de usuário
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }
    try {
        const user = yield (0, Usernodel_1.findUserByEmail)(email);
        if (!user) {
            return res.status(400).json({ message: 'E-mail ou senha incorretos.' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'E-mail ou senha incorretos.' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secreta', { expiresIn: '1h' });
        res.json({
            message: 'Login realizado com sucesso!',
            userId: user.id,
            token,
        });
    }
    catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro interno ao fazer login.' });
    }
}));
// Perfil do usuário
router.get('/profile', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user; // Agora o 'user' estará disponível
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        // Retorna as informações do usuário sem a senha
        const { id, name, email, birthdate, gender, ethnicity, createdAt, updatedAt } = user;
        res.json({
            id,
            name,
            email,
            birthdate,
            gender,
            ethnicity,
            createdAt,
            updatedAt,
        });
    }
    catch (error) {
        console.error('Erro ao buscar perfil:', error);
        res.status(500).json({ message: 'Erro interno ao buscar perfil.' });
    }
}));
exports.default = router;
