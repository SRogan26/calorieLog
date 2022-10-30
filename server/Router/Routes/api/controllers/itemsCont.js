const db = require('../../../../models');

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
const createAndReturnItem = async (item) => {
    await db.item.create({
        name: item.name,
        calories: item.calories,
        fat: item.fat,
        carbs: item.carbs,
        protein: item.protein,
        brand_id: item.brand_id
    });
    const newItem = await db.item.findOne({
        where: { name:item.name, brand_id: item.brand_id}
    });
    return newItem.dataValues;
}

module.exports = { getItem, getBrandItems, createAndReturnItem }