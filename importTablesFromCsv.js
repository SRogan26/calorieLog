const mysql = require("mysql2");
const csv = require("csvtojson");
const path = require("path");

// const testLogImport = './csv/2020testimport.csv';
const brandsCsv = './csv/brands_import.csv'
const itemsCsv = './csv/items_import.csv'

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Learn65%Big?',
//     database: 'my_calories_db'
// });
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Learn65%Big?',
    database: 'my_calories_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

const testQuery = async () => {
    const result = await pool.query('SELECT * FROM people')
    console.log(result[0]);
}

const initialImport = async () => {
    await testQuery();
    await importBrands();
    await importItems();
    pool.end();
}

const importBrands = async () => {
    const brandsJson = await csv().fromFile(path.join(__dirname, brandsCsv));
    for (i = 0; i < brandsJson.length; i++) {
        await pool.query(
            'INSERT INTO brands (brand_id, name) VALUES (?,?)',
            [parseInt(brandsJson[i].BRAND_ID), brandsJson[i].BRAND]
        );
    }
    console.log(brandsJson.length + ' records submitted to brands table');
};
const importItems = async () => {
    const itemsJson = await csv().fromFile(path.join(__dirname, itemsCsv));
    for (i = 0; i < itemsJson.length; i++) {
        const item = itemsJson[i];
        await pool.query(
            'INSERT INTO items (item_id, name, calories, fat, carbs, protein, brand_id) VALUES (?,?,?,?,?,?,?)',
            [
                parseInt(item.ITEM_ID), 
                item.ITEM, 
                parseInt(item.Cal), 
                parseInt(item.Fat), 
                parseInt(item.Carb),
                parseInt(item.Protein),
                parseInt(item.BRAND_ID_FK)
            ]
        );
    }
    console.log(itemsJson.length + ' records submitted to items table');
}

initialImport();