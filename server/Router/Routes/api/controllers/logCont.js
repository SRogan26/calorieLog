const mysql = require("mysql2");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Learn65%Big?',
    database: 'my_calories_db'
}).promise();