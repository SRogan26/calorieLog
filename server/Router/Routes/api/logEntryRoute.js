const express = require("express");
const router = express.Router();
const { getEntriesWithData, addEntry } = require('./controllers/logCont')

router.get('/:userId', async (req, res)=> {
    const entryList = await getEntriesWithData(req.params.userId);
    res.json(entryList);
});

router.post('/', async (req, res)=> {
    await addEntry(req.body.entry);
    res.json(req.body.entry);
});

module.exports = router;