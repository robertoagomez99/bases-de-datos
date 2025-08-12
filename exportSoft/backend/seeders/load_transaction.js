import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from '../server/conexion_db.js';
import format from 'pg-format';

export async function cargarTransaction() {
    const rutaArchivo = path.resolve('./data/transaction.csv');
    const transaction= [];

    if (!fs.existsSync(rutaArchivo)) {
        throw new Error(`Archivo CSV no encontrado en: ${rutaArchivo}`);
    }

    return new Promise((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (fila) => {
                transaction.push([
                    fila.id_transactions,
                    fila.transaction_amount,
                    fila.transaction_statues,
                    fila.transaction_type,
                    fila.platform_used,
                    fila.amount_paid,
                    fila.invoice_number,
                    fila.id_client,
                    fila.date_transactions
                ]);
            })
            .on('end', async () => {
                try {
                    if (transaction.length === 0) {
                        console.log('No hay transaction para insertar.');
                        resolve();
                        return;
                    }

                    const sql = format(
                        'INSERT INTO transaction(id_transactions, transaction_amount, transaction_statues, transaction_type, platform_used, amount_paid,invoice_number, id_client, date_transactions) VALUES %L',
                        transaction
                    );

                    const result = await pool.query(sql);
                    console.log(`✅ Se insertaron ${result.rowCount} transaction.`);
                    resolve();
                } catch (error) {
                    console.error('❌ Error al insertar transaction:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de transaction:', err.message);
                reject(err);
            });
    });
}