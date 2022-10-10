const mysql = require("mysql2");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Learn65%Big?',
    database: 'my_calories_db'
}).promise();

const getEntriesWithData = async (userId) => {
    const entryList = await con.query(`
    SELECT
    l.entry_id,
    l.time_log, 
    b.name AS Brand, 
    i.name AS Item,
    i.calories,
    i.fat,
    i.carbs,
    i.protein
    FROM log_entries l LEFT JOIN items i
    ON l.item_id = i.item_id
    LEFT JOIN brands b
    ON i.brand_id = b.brand_id
    WHERE l.person_id = (?)
    ORDER BY l.time_log;`,
    [userId]);
    return entryList[0];
};

const addEntry = async (entry) => {
    await con.query('INSERT INTO log_entries (time_log, item_id, person_id) VALUES (?,?,?)',
    [entry.time, entry.item, entry.user]);
}

module.exports = { getEntriesWithData, addEntry }