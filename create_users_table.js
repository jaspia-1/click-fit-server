const mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL server: ', err);
    return;
  }
  console.log('Connected to MySQL server');
});

// SQL query to create users table
const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    ID INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    active TINYINT DEFAULT 1,
    PRIMARY KEY (ID)
  )
`;

// Execute the query to create users table
connection.query(createUserTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating users table: ', err);
    return;
  }
  console.log('Users table created successfully');
});

// Close the connection
connection.end();
