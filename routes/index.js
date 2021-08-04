var express = require('express');
const path = require ('path');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
// res.render('index', { title: 'MSS NodeJS MicroService' });
res.sendFile(path.join(__dirname, `../${process.env.APP_DIRECTORY || "client/build"}/${process.env.HTML_INDEX || "index.html"}`)); 
// console.log('route_log');
// res.sendFile(path.join(__dirname, `../${process.env.APP_DIRECTORY || "client/server"}/${process.env.HTML_INDEX || "server.js"}`));
});

module.exports = router;
