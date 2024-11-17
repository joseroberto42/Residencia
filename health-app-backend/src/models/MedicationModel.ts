import connection from '../config/dt';

export interface Medication {
    id?: number;
    userId: number; // ID do usuário que possui o medicamento
    name: string; // Nome do medicamento
    dosage: string; // Dosagem do medicamento
    frequency: number; // Frequência de uso (número de vezes por dia)
    schedule: string; // Horário de uso (ex: "08:00")
    brand: string; // Marca do medicamento
    days: number; // Quantidade de dias que o medicamento será utilizado
    createdAt?: Date; // Data de criação (opcional)
    updatedAt?: Date; // Data da última atualização (opcional)
}



// Criar um novo medicamento
export const createMedication = (data: any) => {
    const { userId, name, dosage, frequency, schedule, brand, days } = data;
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Medications (userId, name, dosage, frequency, schedule, brand, days) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [userId, name, dosage, frequency, schedule, brand, days], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Buscar medicamentos por ID de usuário
export const findMedicationsByUserId = (userId: number) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Medications WHERE userId = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Buscar medicamentos por ID de usuário e nome
export const findMedicationsByUserIdAndName = (userId: number, name?: string) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM Medications WHERE userId = ?';
        const params: any[] = [userId];

        // Adicionar filtro por nome, se fornecido
        if (name) {
            query += ' AND name LIKE ?';
            params.push(`%${name}%`);
        }

        connection.query(query, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Atualizar medicamento
export const updateMedication = (id: number, data: any) => {
    const { userId, name, dosage, frequency, schedule, brand, days } = data;
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Medications SET userId = ?, name = ?, dosage = ?, frequency = ?, schedule = ?, brand = ?, days = ? WHERE id = ?';
        connection.query(query, [userId, name, dosage, frequency, schedule, brand, days, id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Excluir medicamento
export const deleteMedication = (id: number) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Medications WHERE id = ?';
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
