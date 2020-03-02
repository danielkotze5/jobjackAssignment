var fs = require('co-fs');
var path = require('path');

var FileManager = {};

FileManager.getStats = function *(p) {
  var stats = yield fs.stat(p);
  return {
    folder: stats.isDirectory(),
    size: stats.size,
    //birthtime: stats.birthtime.getTime()
	birthdate: stats.birthtime.toLocaleDateString("en-US"),
	birthtime: stats.birthtime.toLocaleTimeString("en-US"),
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
