const express = require("express");
const router = express.Router();

const {getItems, createItem} = require('./controllers/itemsCont')

router.get('/', async (req, res)=> {
    const itemsList = await getItems(req.body.brand_id)
    res.json(itemsList)
});

router.post('/', async (req, res) => {
    await createItem(req.body);
    res.json({message: `${req.body.name} item added`})
})

module.exports = router;