import pkg from 'pg';
const { Pool } = pkg;


export const pool = new Pool({
    user: 'postgres',        
    host: 'localhost',      
    database: 'pd_roberto_gomez_manglar', 
    password: 'Qwe.123*',    
    port: 5432,              
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err.stack);
    } else {
        console.log('✅ Conexión exitosa a la base de datos PostgreSQL');
    }
});

export default pool;