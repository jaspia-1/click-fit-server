const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: 'root', // Provide 'root' as a string
    password: "",
    database: "click_fit",
    connectionLimit: 10
});

// Handle connection errors
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');

    // Use the connection to run queries
    connection.query(`SELECT * FROM users`, (err, result, fields) => {
        // Release the connection back to the pool after executing the query
        connection.release();

        if (err) {
            console.error('Error querying MySQL database:', err);
            return;
        }

        console.log(result); // Log the query result
    });
});
