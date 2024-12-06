let mysql = require('mysql');

let connection = mysql.createConnection({
    host: '34.101.171.100',
    user: 'root',
    password: 'astungkaralancar17',
    database: 'db_herba_mate'
});

connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connection Succuessfully!');
    }
})

module.exports = connection;