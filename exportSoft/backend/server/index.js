// index.js
import express from 'express';
import cors from 'cors';
import { pool } from './conexion_db.js'; // Asegúrate de que esta ruta sea correcta

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: '🚀 API del sistema financiero está funcionando!',
        endpoints: {
            clients: {
                get_all: 'GET /clients',
                get_by_id: 'GET /clients/:id',
                create: 'POST /clients',
                update: 'PUT /clients/:id',
                delete: 'DELETE /clients/:id'
            }
        }
    });
});

// --- CRUD para Clients ---

app.get('/clients', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                id_client,
                identification,
                name,
                address,
                phone,
                email
            FROM client
            ORDER BY id_client;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener clientes:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/clients', async (req, res) => {
    const { id_client, identification, name, address, phone, email } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO client (id_client,identification, name, address, phone, email) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
            [id_client,identification, name, address, phone, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear cliente:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
app.delete('/clients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM client WHERE id_client = $1 RETURNING *;', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        
        if (result.rows.length > 0) {
            res.json({ message: 'Cliente eliminado', cliente: result.rows[0] });
        } else {
            res.json({ message: 'Cliente eliminado (o no existía)' });
        }
    } catch (error) {
        console.error('Error al eliminar cliente:', error.message);

        if (error.code === '23503') {
            res.status(409).json({ 
                error: 'No se puede eliminar el cliente porque tiene transacciones asociadas. Primero elimine las transacciones relacionadas.' 
            });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al eliminar cliente' });
        }
    }
});

app.get('/api/reports/total-paid-client', async (req, res) => {
    try {
        const result = await pool.query(`
              select c.id_client, coalesce(sum(amount_paid),0) as total from transaction t
                join invoice i on t.invoice_number = i.invoice_number
                jOIN client c ON t.id_client  = c.id_client
                group by c.id_client;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error en consulta 1:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al ejecutar la consulta 1' });
    }
});

