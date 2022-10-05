const express = require("express");
const router = express.Router();
const { getEntriesWithData } = require('./controllers/logCont')

router.get('/:userId', async (req, res)=> {
    const entryList = await getEntriesWithData(req.params.userId);
    res.json(entryList);
});

module.exports = router;