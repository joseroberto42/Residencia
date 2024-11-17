import express from 'express';
import { createUser, findUserByEmail } from '../models/Usernodel'; // Corrigido nome para 'UserModel'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/authMiddleware'
const router = express.Router();



// Cadastro de usuário
router.post('/register', async (req, res) => {
    const { name, email, password, birthdate, gender, ethnicity } = req.body;

    if (!name || !email || !password || !birthdate || !gender || !ethnicity) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser({
            name,
            email,
            password: hashedPassword,
            birthdate,
            gender,
            ethnicity,
        });

        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro interno ao criar usuário.' });
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'E-mail ou senha incorretos.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'E-mail ou senha incorretos.' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'secreta',
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login realizado com sucesso!',
            userId: user.id,
            token,
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro interno ao fazer login.' });
    }
});

// Perfil do usuário
router.get('/profile', authMiddleware, async (req, res) => {
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
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        res.status(500).json({ message: 'Erro interno ao buscar perfil.' });
    }
});
export default router;