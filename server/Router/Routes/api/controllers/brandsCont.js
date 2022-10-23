const db = require('../../../../models');

const getBrands = async () => {
    const brands = await db.brand.findAll();
    const brandsList = brands.map(brand => brand.dataValues)
    return brandsList;
};

const createBrand = async (brandName) => {     
    await db.brand.create({ name: brandName });
}

module.exports = {getBrands, createBrand}