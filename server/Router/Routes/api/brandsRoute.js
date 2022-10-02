const express = require("express");
const router = express.Router();
const {getBrands, createBrand} = require('./controllers/brandsCont')

router.get('/', async (req, res)=> {
    const brandsList = await getBrands();
    res.json(brandsList);
});

router.post('/', async (req, res) => {
    await createBrand(req.body.name);
    res.json({message: `${req.body.name} brand added`})
})

module.exports = router;