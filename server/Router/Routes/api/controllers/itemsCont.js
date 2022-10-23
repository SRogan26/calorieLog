const db = require('../../../../models');
const mysql = require("mysql2");
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Learn65%Big?',
    database: 'my_calories_db'
}).promise();

const getItem = async (id) => {
    const item = await db.item.findOne({
        where: {
            item_id: id
        }
    })
    return item.dataValues;
}

const getBrandItems = async (brand_id) => {
    const items = await db.item.findAll({
        where: { brand_id },
        include: [{
            model: db.brand,
            attributes: ['name'],
            where: { brand_id }
        }]
    })
    const itemsList = items.map(item => item.dataValues)
    itemsList.forEach(item => item.brand = item.brand.dataValues.name)
    return itemsList;
};
//item as an object with necessary properties
const createItem = async (item) => {
    await db.item.create({
        name: item.name,
        calories: item.calories,
        fat: item.fat,
        carbs: item.carbs,
        protein: item.protein,
        brand_id: item.brand_id
    });
}

module.exports = { getItem, getBrandItems, createItem }