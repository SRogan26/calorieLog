const mysql = require("mysql2");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Learn65%Big?',
    database: 'my_calories_db'
}).promise();

const getItems = async (brand_id) => {
    const itemsList = await con.query(
    `SELECT
    items.item_id, 
    brands.name AS Brand, 
    items.name,
    items.calories,
    items.fat,
    items.carbs,
    items.protein
    FROM items LEFT JOIN brands
    ON items.brand_id = brands.brand_id
    WHERE items.brand_id = (?)`,
    [brand_id]);
    return itemsList[0];
};
//item as an object with necessary properties
const createItem = async (item) => {
    const query = 
    `INSERT INTO items (name, calories, fat, carbs, protein, brand_id)
    VALUES (?,?,?,?,?,?)`
    await con.query(query,
        [
            item.name,
            item.calories,
            item.fat,
            item.carbs,
            item.protein,
            item.brand_id
        ]
    );    
}

module.exports = {getItems, createItem}