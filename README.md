In this readme you work with queries with postgresql, first you have to install npm install express pg cors multer csv-parser pg-format what is done most in this readme are the specifications so that you can use it with seeders, those of uploading the data, in which you can also see that it had to pass and it was divided into 3 tables which are invoice, transactions and client, in which all the treatment is given, in the sql query you can see where you could do the queries and in the only one that could do is the query, where I did
1)Relationships

Customers ↔ Transactions: One-to-Many (a customer can have multiple transactions, but each transaction belongs to a single customer). Linked by IDNumber.
Invoices ↔ Transactions: One-to-Many (an invoice can have multiple payment attempts, but each transaction is associated with a single invoice). Linked by InvoiceNumber.
There is no direct relationship between Customers and Invoices (it is inferred through Transactions, assuming that invoices implicitly belong to customers via payments).
