import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from '../server/conexion_db.js';
import format from 'pg-format';

export async function cargarInvoice() {
    const rutaArchivo = path.resolve('./data/invoice.csv');
    const invoice = [];

    if (!fs.existsSync(rutaArchivo)) {
        throw new Error(`Archivo CSV no encontrado en: ${rutaArchivo}`);
    }

    return new Promise((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (fila) => {
                invoice.push([
                    fila.invoice_number,
                    fila.period_facturation,
                    fila.mountain_invoicing
                ]);
            })
            .on('end', async () => {
                try {
                    if (invoice.length === 0) {
                        console.log('No hay invoice para insertar.');
                        resolve();
                        return;
                    }

                    const sql = format(
                        'INSERT INTO invoice(invoice_number, period_facturation, mountain_invoicing) VALUES %L',
                        invoice
                    );

                    const result = await pool.query(sql);
                    console.log(`✅ Se insertaron ${result.rowCount} invoice.`);
                    resolve();
                } catch (error) {
                    console.error('❌ Error al insertar invoice:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de invoice:', err.message);
                reject(err);
            });
    });
}