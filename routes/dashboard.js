var express = require('express');
var router = express.Router();
var json = require('../raw_data/percap.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  var data={
    "json" : json,
    "id" : req.query.id || 0
  }
  res.render('percap',{"data" : data});
});
router.get('/get_country/:id',function(req,res,next){
  var id = req.params.id;
  var country_data= {};
  for (key in json[id]){
    if (key>=1990 && key<=2011){
      country_data[key]=json[id][key];
        }
  }
  res.send(country_data);
});
module.exports = router;
