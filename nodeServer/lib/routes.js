var fs = require('co-fs');
var koaRouter = require('koa-router');

var myTools = require('./myTools');
var FileManager = require('./fileManager');

var router = new koaRouter();
  
router.get('/(.*)', myTools.loadRealPath,  function *() { 
  console.log('GET api fired\n');
  var p = this.request.fPath;
  console.log("this.request.fPath = " + p);
  var stats = yield fs.stat(p);  
  
  if (stats.isDirectory()) {
    this.body = yield * FileManager.list(p);   
  }
  else {
    //Can create readStream here if app further developed.    
  }  
});

module.exports = router;  
