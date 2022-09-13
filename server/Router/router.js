const express = require("express");
const router = express.Router();
const homeRoute = require('./Routes/homeRoute');

router.use('/', homeRoute);


module.exports = router;