var fs = require('co-fs');
var path = require('path');

var FileManager = {};

FileManager.getStats = function *(p) {
  var stats = yield fs.stat(p);

  return {
    folder: stats.isDirectory(),
    size: stats.size,    
	  birthdate: stats.birthtime.toLocaleDateString("en-US"),
  	birthtime: stats.birthtime.toLocaleTimeString("en-US"),
  	myPermissions : '0' + (stats.mode & parseInt('777', 8)).toString(8),
  }  
};

FileManager.list = function *(dirPath) {  
  var files = yield fs.readdir(dirPath);
  var stats = [];

  for (var i=0; i<files.length; ++i) {
    var fPath = path.join(dirPath, files[i]);
    var stat = yield FileManager.getStats(fPath);
    stat.name = files[i];
    stats.push(stat);
  }
  return stats;
};

module.exports = FileManager;
