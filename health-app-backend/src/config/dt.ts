import { createConnection, Connection } from 'mysql2';
import dotenv from 'dotenv';

// Configurando variáveis de ambiente
dotenv.config();

const connection: Connection = createConnection({
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

export default connection;
