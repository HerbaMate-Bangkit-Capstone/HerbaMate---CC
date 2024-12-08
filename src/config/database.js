const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '34.101.171.100',
    user: 'root',
    password: 'astungkaralancar17',
    database: 'db_herba_mate'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err.stack);
        return;
    }
    console.log('Connection Succuessfully!');
});

module.exports = db;