import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from '../server/conexion_db.js';
import format from 'pg-format';

export async function cargarClientes() {
    const rutaArchivo = path.resolve('./data/client.csv');
    const clientes = [];

    if (!fs.existsSync(rutaArchivo)) {
        throw new Error(`Archivo CSV no encontrado en: ${rutaArchivo}`);
    }

    return new Promise((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (fila) => {
                clientes.push([
                    fila.id_client,
                    fila.name.trim(),
                    fila.identification,
                    fila.address,
                    fila.phone,
                    fila.email
                ]);
            })
            .on('end', async () => {
                try {
                    if (clientes.length === 0) {
                        console.log('No hay clientes para insertar.');
                        resolve();
                        return;
                    }

                    const sql = format(
                        'INSERT INTO client(id_client, name, identification, address, phone, email) VALUES %L',
                        clientes
                    );

                    const result = await pool.query(sql);
                    console.log(`✅ Se insertaron ${result.rowCount} clientes.`);
                    resolve();
                } catch (error) {
                    console.error('❌ Error al insertar clientes:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de clientes:', err.message);
                reject(err);
            });
    });
}
