const express = require("express");
const fav = require("serve-favicon");
const app = express();
const PORT = 3000;
const router = require('./Router/router');

app.use(express.json());
app.use(fav('./server/public/favicon.ico'));
app.use(router);
app.use(express.static('./public'));


app.listen(PORT, () => {
    console.log(`${PORT} is listeneing`);
})