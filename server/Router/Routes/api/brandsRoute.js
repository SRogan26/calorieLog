const express = require("express");
const router = express.Router();
const {getBrands, createAndReturnBrand} = require('./controllers/brandsCont')

router.get('/', async (req, res)=> {
    const brandsList = await getBrands();
    res.json(brandsList);
});

router.post('/', async (req, res) => {
    const newBrand = await createAndReturnBrand(req.body.name);
    res.json({brand: newBrand})
})

module.exports = router;