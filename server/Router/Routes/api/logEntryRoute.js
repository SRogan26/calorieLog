const express = require("express");
const router = express.Router();

router.get('/', (req, res)=> {
    res.send('We Log Entries')
});

module.exports = router;