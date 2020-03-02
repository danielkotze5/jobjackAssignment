var fs = require('co-fs');
var koaRouter = require('koa-router');
var Tools = require('./myTools');
var FileManager = require('./fileManager');

var router = new koaRouter();

router.get('/(.*)', function *() {     //doStuff name is not necessary
  this.redirect('/');    
  console.log('get1(redirect) fired');
});

//This shows the json data for current folder. Works on both server and client.
router.get('/', Tools.loadRealPath,  function *() { 
  console.log('GET fired\n');
  var p = this.request.fPath;
  var stats = yield fs.stat(p);  
  
  if (stats.isDirectory()) {
    this.body = yield * FileManager.list(p);    
  }
  else {
    //Todo: can create readstream here for file manipulation if desired
  }  
});

//Todo: Collect die nuwe directory hier en repost die updated directory. Enable deur button/intteractive folder clicking in die files.html op client
//router.post...

module.exports = router;  
