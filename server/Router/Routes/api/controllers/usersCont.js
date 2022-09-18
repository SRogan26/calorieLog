const mysql = require("mysql2");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Learn65%Big?',
    database: 'my_calories_db'
}).promise();

const getUsers = async () => {
    const userList = await con.query('SELECT * FROM people');
    return userList[0];
};

const createUser = async (userName) => {
    await con.query('INSERT INTO people (name) VALUES (?)',
        [userName]
    );    
}

const deleteUser = async (userID) => {
    await con.query('DELETE FROM people WHERE person_id = (?)',
        [parseInt(userID)]
    );    
}


module.exports = { getUsers, createUser, deleteUser};