// src/controllers/MedicationController.ts
import { Request, Response } from 'express';
import { 
    createMedication, 
    findMedicationsByUserId, 
    updateMedication, 
    deleteMedication 
} from '../models/MedicationModel';

export const createMedicationHandler = async (req: Request, res: Response) => {
    // Extraindo os campos necessários do corpo da requisição, incluindo brand
    const { userId, name, dosage, frequency, schedule, brand } = req.body; 
    try {
        // Incluindo brand na chamada para createMedication
        await createMedication({ userId, name, dosage, frequency, schedule, brand });
        res.status(201).json({ message: 'Medicamento criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar medicamento.', error });
    }
};

export const getMedicationsHandler = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    try {
        const medications = await findMedicationsByUserId(userId);
        res.json(medications);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar medicamentos.', error });
    }
};

export const updateMedicationHandler = async (req: Request, res: Response) => {
    const medicationId = Number(req.params.id);
    // Extraindo todos os campos necessários, incluindo brand
    const { userId, name, dosage, frequency, schedule, brand } = req.body; 
    try {
        // Incluindo brand na chamada para updateMedication
        await updateMedication(medicationId, { userId, name, dosage, frequency, schedule, brand });
        res.json({ message: 'Medicamento atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar medicamento.', error });
    }
};

export const deleteMedicationHandler = async (req: Request, res: Response) => {
    const medicationId = Number(req.params.id);
    try {
        await deleteMedication(medicationId);
        res.json({ message: 'Medicamento excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir medicamento.', error });
    }
};
