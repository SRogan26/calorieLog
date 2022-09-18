const express = require("express");
const router = express.Router();
const homeRoute = require('./Routes/homeRoute');
const apiItemsRoute = require('./Routes/api/itemsRoute');
const apiBrandsRoute = require('./Routes/api/brandsRoute');
const apiUsersRoute = require('./Routes/api/usersRoute');
const apiEntryRoute = require('./Routes/api/logEntryRoute');
const cors = require('cors');

router.options('*', cors());
router.use('/', homeRoute);
router.use('/api/items', apiItemsRoute);
router.use('/api/brands', apiBrandsRoute);
router.use('/api/users', apiUsersRoute);
router.use('/api/entries', apiEntryRoute);


module.exports = router;