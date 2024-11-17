import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUserById } from '../models/Usernodel'; // Certifique-se de importar corretamente seu modelo

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreta') as { id: number }; // Decodifica o token
        const user = await findUserById(decoded.id); // Busca o usuário pelo id do token

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Adiciona o usuário completo à requisição
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido.' });
    }
};
