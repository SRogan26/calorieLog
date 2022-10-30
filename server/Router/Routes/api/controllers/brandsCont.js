const db = require('../../../../models');

const getBrands = async () => {
    const brands = await db.brand.findAll();
    const brandsList = brands.map(brand => brand.dataValues)
    return brandsList;
};

const createAndReturnBrand = async (brandName) => {     
    await db.brand.create({ name: brandName });
    const newBrand = await db.brand.findOne({
        where: {
            name: brandName
        }
    });
    return newBrand.dataValues;
}

module.exports = {getBrands, createAndReturnBrand}