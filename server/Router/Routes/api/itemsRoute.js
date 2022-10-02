const express = require("express");
const router = express.Router();

const {getItem, getBrandItems, createItem} = require('./controllers/itemsCont')

router.get('/by-brand/:brand_id', async (req, res)=> {
    const itemsList = await getBrandItems(req.params.brand_id)
    res.json(itemsList)
});

router.get('/:id', async (req, res) => {
    const item = await getItem(req.params.id);
    res.json(item)
})

router.post('/', async (req, res) => {
    await createItem(req.body);
    res.json({message: `${req.body.name} item added`})
})

module.exports = router;