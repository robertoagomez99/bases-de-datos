# Financial Transaction Management System

## Description

This project is a solution developed for ExpertSoft to manage financial information from Fintech platforms (Nequi, Daviplata). It involves normalizing data from an Excel file, structuring it into a SQL database, implementing data loading from CSV files, and providing a basic CRUD API and frontend dashboard for managing client information. Additionally, it includes advanced SQL queries to fulfill specific business requirements.

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL
*   **Data Processing:** JavaScript (`csv-parser`, `pg`), potentially Python or another language for initial CSV conversion.
*   **Database Design:** draw.io (or similar tool for manual modeling)
*   **Version Control:** Git, GitHub

## Database Setup

1.  **Create Database:** Create a PostgreSQL database named `pd_roberto_gomez_mangla` .
2.  **Execute DDL Script:** Run the provided `**[CreateTable.sql]**` script to create the tables (`client`, `invoice`, `transaction`) and define their relationships (Primary Keys, Foreign Keys, constraints).

## Data Loading (CSV)

1.  **Convert Excel to CSV:** The original `data.xlsx` file was manually converted into separate CSV files for each entity (`**[client.csv]**`, `**[invoice.csv]**`, `**[transaction.csv]**`). Ensure the column headers in these CSV files match the expected column names in your loading scripts (e.g., use English names like `transaction_amount`, `transaction_status` if your script expects them).
2.  **Execute Loading Script(s):** Run the data loading scripts (e.g., `**[loud_clients.js]**`, `**[loud_invoices.js]**`, `**[loud_transactions.js]**`) to populate the database tables from the respective CSV files. This typically involves executing the Node.js script:

## Running the Backend API

1.  **Install Dependencies:** Navigate to your backend project directory and install the required Node.js packages.

    ```bash
    npm install
    ```
2.  **Start the Server:** Run the main application file (e.g., `index.js`).

    ```bash
    node index.js
    ```
3.  **Access API:** The API will be available at `http://localhost:3000`. You can interact with the CRUD endpoints for the `client`

## Normalization Process

The original Excel data was normalized manually following the first three normal forms (1NF, 2NF, 3NF):
1.  **1NF:** Eliminated repeating groups and ensured atomic values. The single Excel sheet was broken down.
2.  **2NF:** Removed partial dependencies. Separate entities (`Client`, `Invoice`, `Transaction`) were created, ensuring non-key attributes depended on the full primary key.
3.  **3NF:** Removed transitive dependencies. Attributes were placed in the entity they directly related to.

*(Consider adding a brief description of your final relational model here or refer to the image/PDF)*

## Relational Model

The final relational model is depicted in the file **` transaccion.pdf`**. It shows the `client`, `invoice`, and `transaction` tables and their relationships (1 Client -> Many Invoices, 1 Client -> Many Transactions, 1 Invoice -> Many Transactions).

*   **Email:** **[your.email@example.com]**

