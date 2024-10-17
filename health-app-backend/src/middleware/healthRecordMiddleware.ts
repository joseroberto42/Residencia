import { Request, Response, NextFunction } from 'express';

// Conjunto de tipos válidos para registros de saúde em português
const validTypes = [
    'Pressão Arterial', 
    'Glicose', 
    'Frequência Cardíaca', 
    'Peso', 
    'Altura', 
    'Temperatura Corporal', 
    'Colesterol', 
    'Saturação de Oxigênio', 
    'IMC' // Índice de Massa Corporal
];

export const validateHealthRecord = (req: Request, res: Response, next: NextFunction) => {
    const { userId, type, value } = req.body;

    // Verificação se os campos obrigatórios estão presentes
    if (!userId || !type || !value) {
        return res.status(400).json({ message: 'Dados incompletos. Verifique userId, tipo e valor.' });
    }

    // Validação se userId é um número
    if (typeof userId !== 'number') {
        return res.status(400).json({ message: 'O userId deve ser um número válido.' });
    }

    // Validação se type é uma string
    if (typeof type !== 'string') {
        return res.status(400).json({ message: 'O campo tipo deve ser uma string.' });
    }

    // Validação de tipos permitidos (em português)
    if (!validTypes.includes(type)) {
        return res.status(400).json({ message: `O tipo de registro de saúde "${type}" não é válido. Tipos válidos: ${validTypes.join(', ')}.` });
    }

    // Validação se value é uma string ou número (dependendo do tipo)
    if (typeof value !== 'string' && typeof value !== 'number') {
        return res.status(400).json({ message: 'O campo valor deve ser uma string ou número válido.' });
    }

    // Se todas as validações forem bem-sucedidas, prossiga para o próximo middleware ou rota
    next();
};
