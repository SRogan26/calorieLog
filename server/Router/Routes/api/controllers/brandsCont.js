const mysql = require("mysql2");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Learn65%Big?',
    database: 'my_calories_db'
}).promise();

const getBrands = async () => {
    const brandsList = await con.query('SELECT * FROM brands');
    return brandsList[0];
};

const createBrand = async (brandName) => {
    await con.query('INSERT INTO brands (name) VALUES (?)',
        [brandName]
    );    
}

module.exports = {getBrands, createBrand}