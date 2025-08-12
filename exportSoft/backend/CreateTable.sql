--CREATE DATABASE pd_roberto_gomez_manglar OWNER postgres;
-- GRANT ALL PRIVILEGES ON DATABASE pd_roberto_gomez_manglar TO  postgres;

CREATE TABLE client (
id_client int primary key,
identification VARCHAR(60) not null unique ,
name VARCHAR(100) not null,
address VARCHAR(200) not null,
phone VARCHAR(50) not null,
email VARCHAR(100)
);

CREATE TABLE invoice (
invoice_number VARCHAR(10) PRIMARY KEY,
period_facturation VARCHAR(7),
mountain_invoicing INT
);

CREATE TABLE transaction (
    id_transactions VARCHAR(10) PRIMARY KEY, 
    transaction_amount NUMERIC(12, 2),       
    transaction_statues TEXT,
    transaction_type VARCHAR(60),
    platform_used VARCHAR(20),
    amount_paid NUMERIC(12, 2),            
    invoice_number VARCHAR(10),
    id_client INT,
    date_transactions TIMESTAMP,            
    FOREIGN KEY (id_client) REFERENCES client(id_client),
    FOREIGN KEY (invoice_number) REFERENCES invoice(invoice_number)
);

 SELECT 
    t.id_transactions,
    t.amount_paid,
    i.invoice_number,
    c.name
FROM "transaction" t 
JOIN invoice i ON t.invoice_number =i.invoice_number 
JOIN client c ON t.id_client  = c.id_client ;
 
 SELECT 
    t.id_transactions,
    t.amount_paid,
    i.invoice_number,
    c.name
FROM "transaction" t 
JOIN invoice i ON t.invoice_number =i.invoice_number 
JOIN client c ON t.id_client  = c.id_client 
WHERE c.id_client = $1;
 --Listado de transacciones por plataforma
 SELECT 
    t.id_transactions,
    t.amount_paid,
    i.invoice_number,
    t.platform_used,
    c.name
FROM transaction t 
JOIN invoice i ON t.invoice_number =i.invoice_number 
JOIN client c ON t.id_client  = c.id_client 
 where t.platform_used ='Nequi';
 
 --Total pagado por cada cliente
 select c.id_client, coalesce(sum(amount_paid),0) as total from transaction t
 join invoice i on t.invoice_number = i.invoice_number
 JOIN client c ON t.id_client  = c.id_client
 group by c.id_client;
 --Facturas pendientes con información de cliente y transacción asociada
 SELECT 
                t.id_transactions,
                t.amount_paid,
                i.invoice_number,
                t.platform_used,
                c.name
            FROM transaction t 
            JOIN invoice i ON t.invoice_number =i.invoice_number 
            JOIN client c ON t.id_client  = c.id_client 
             where t."transaction_statues"='Pendiente';


             
             
             
             
             
             
             
             
            