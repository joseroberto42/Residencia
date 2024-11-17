import { Request, Response } from 'express';
import { 
    createMedication, 
    findMedicationsByUserId, 
    findMedicationsByUserIdAndName, 
    updateMedication, 
    deleteMedication 
} from '../models/MedicationModel';

// Criar medicamento
export const createMedicationHandler = async (req: Request, res: Response) => {
    const { userId, name, dosage, frequency, schedule, brand, days } = req.body;
    try {
        await createMedication({ userId, name, dosage, frequency, schedule, brand, days });
        res.status(201).json({ message: 'Medicamento criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar medicamento.', error });
    }
};

// Buscar medicamentos por ID de usuário
export const getMedicationsHandler = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    try {
        const medications = await findMedicationsByUserId(userId);
        res.json(medications);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar medicamentos.', error });
    }
};

// Buscar medicamentos por ID de usuário e nome
export const getMedicationsByNameHandler = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const name = req.query.name as string; // Nome fornecido como parâmetro de consulta (query string)
    try {
        const medications = await findMedicationsByUserIdAndName(userId, name);
        res.json(medications);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar medicamentos por nome.', error });
    }
};

// Atualizar medicamento
export const updateMedicationHandler = async (req: Request, res: Response) => {
    const medicationId = Number(req.params.id);
    const { userId, name, dosage, frequency, schedule, brand, days } = req.body;
    try {
        await updateMedication(medicationId, { userId, name, dosage, frequency, schedule, brand, days });
        res.json({ message: 'Medicamento atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar medicamento.', error });
    }
};

// Excluir medicamento
export const deleteMedicationHandler = async (req: Request, res: Response) => {
    const medicationId = Number(req.params.id);
    try {
        await deleteMedication(medicationId);
        res.json({ message: 'Medicamento excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir medicamento.', error });
    }
};
