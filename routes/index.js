var express = require('express');
var router = express.Router();

const TorrentSearchApi = require('torrent-search-api');
 
const torrentSearch = new TorrentSearchApi();
 
torrentSearch.enableProvider('Torrent9');
 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
var search = req.param('search');
var cat = req.param('cat');
torrentSearch.search(search, cat, 10)
     .then(torrents => {
     	if(torrents==[]){
         res.redirect('/');
     }
     else{
     	res.render('result', { torrents: torrents });
         console.log(torrents);
     }
     	
     })
     .catch(err => {
         console.log(err);
     });
});

module.exports = router;
