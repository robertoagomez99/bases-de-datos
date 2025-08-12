import { cargarClientes } from "./load_clientes.js";
import { cargarInvoice } from "./load_invoice.js";
import { cargarTransaction} from "./load_transaction.js";
import { pool } from "../server/conexion_db.js";

(async () => {
    try {
        console.log('🚀 Iniciando carga de datos...');

        // Limpiar tablas en orden correcto para evitar errores de FK
        console.log('🧹 Limpiando tablas...');
        await pool.query('TRUNCATE TABLE client RESTART IDENTITY CASCADE');
        await pool.query('TRUNCATE TABLE invoice RESTART IDENTITY CASCADE');
        await pool.query('TRUNCATE TABLE transaction RESTART IDENTITY CASCADE');
        console.log('✅ Tablas limpiadas');

        // Cargar datos en el orden correcto (respetando dependencias)
        console.log('Cargando clientes...');
        await cargarClientes();
        
        console.log('Cargando invoice...');
        await cargarInvoice();
        
        console.log('Cargando transaction...');
        await cargarTransaction();

        console.log('✅ Todos los datos cargados correctamente.');
        
        // Verificar conteos
        const [client, transaction, invoice] = await Promise.all([
            pool.query('SELECT COUNT(*) as total FROM client'),
            pool.query('SELECT COUNT(*) as total FROM invoice'),
            pool.query('SELECT COUNT(*) as total FROM transaction '),
        ]);

        console.log('\n📊 Resumen de carga:');
        console.log(`   - clientes: ${client.rows[0].total}`);
        console.log(`   - invoice: ${invoice.rows[0].total}`);
        console.log(`   - transaction: ${transaction.rows[0].total}`);

    } catch (error) {
        console.error('❌ Error cargando los datos:', error.message);
        console.error('Stack trace:', error.stack);
    } finally {
        // Cerrar la conexión a la base de datos
        await pool.end();
        process.exit();
    }
})()