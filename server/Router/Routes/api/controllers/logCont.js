const db = require('../../../../models');

const getEntriesWithData = async (userId) => {
    const entries = await db.log_entry.findAll({
        where: { person_id : userId},
        include: [{
            model: db.item,
            attributes: ['name', 'calories', 'fat', 'carbs', 'protein'],            
            include: [{
                model: db.brand,
                attributes: ['name'],
                
            }]
        }],
        order: [
            ['time_log', 'ASC']
        ]
    })
    const entryList = entries.map(entry => entry.dataValues)
    entryList.forEach(entry => {
        const item = entry.item.dataValues;
        entry.Brand = item.brand.dataValues.name;
        entry.Item = item.name;
        entry.calories = item.calories;
        entry.fat = item.fat;
        entry.carbs = item.carbs;
        entry.protein = item.protein;
    })

    return entryList;
};

const addEntry = async (entry) => {
    await db.log_entry.create({
        time_log: entry.time,
        item_id: entry.item,
        person_id: entry.user
    });
}

module.exports = { getEntriesWithData, addEntry }