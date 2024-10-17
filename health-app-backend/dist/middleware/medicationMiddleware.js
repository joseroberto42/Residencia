"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMedication = void 0;
const validateMedication = (req, res, next) => {
    const { userId, name, dosage, frequency, schedule, brand } = req.body;
    if (typeof userId !== 'number') {
        return res.status(400).json({ message: 'Campo userId deve ser um número.' });
    }
    if (!name) {
        return res.status(400).json({ message: 'Campo name é obrigatório.' });
    }
    if (!dosage) {
        return res.status(400).json({ message: 'Campo dosage é obrigatório.' });
    }
    if (!frequency) {
        return res.status(400).json({ message: 'Campo frequency é obrigatório.' });
    }
    if (!schedule) {
        return res.status(400).json({ message: 'Campo schedule é obrigatório.' });
    }
    if (!brand) {
        return res.status(400).json({ message: 'Campo brand é obrigatório.' });
    }
    next();
};
exports.validateMedication = validateMedication;
