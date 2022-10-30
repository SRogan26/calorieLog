const express = require("express");
const router = express.Router();

const {getItem, getBrandItems, createAndReturnItem} = require('./controllers/itemsCont')

router.get('/by-brand/:brand_id', async (req, res)=> {
    const itemsList = await getBrandItems(req.params.brand_id)
    res.json(itemsList)
});

router.get('/:id', async (req, res) => {
    const item = await getItem(req.params.id);
    res.json(item)
})

router.post('/', async (req, res) => {
    const newItem = await createAndReturnItem(req.body);
    res.json({item: newItem})
})

module.exports = router;