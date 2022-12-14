const express = require("express");
const fav = require("serve-favicon");
const db = require('./models');
const app = express();
const PORT = 3001;
const router = require('./Router/router');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fav('./server/public/favicon.ico'));
app.use(router);
app.use(express.static('./public'));


db.sequelize.sync({ force: false }).then(() => {
    // console.log(db)
    app.listen(PORT, () => {
        console.log(`${PORT} listening........`)
    });
})