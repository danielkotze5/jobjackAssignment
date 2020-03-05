var fs = require('co-fs');
var path = require('path');

var FileManager = {};

FileManager.getStats = function *(p) {

  var stats = yield fs.stat(p);
  let permisString = '0' + (stats.mode & parseInt('777', 8)).toString(8);
  let char0 = permisString.charAt(0);
  let char1 = permisString.charAt(1);
  let char2 = permisString.charAt(2);
  let char3  = permisString.charAt(3);

  let processedRaw = function(charIn){

    let stringOut = "";

    switch(charIn){      
      case '0':{
        stringOut = "none";
        break;
      }
      case '1':{
        stringOut = "execute";
        break;
      }
      case '2':{
        stringOut = "write";
        break;
      }
      case '3':{
        stringOut = "write,execute";
        break;
      }
      case '4':{
        stringOut = "read";
        break;
      }
      case '5':{
        stringOut = "read,execute";
        break;
      }
      case '6':{
        stringOut = "read,write";
        break;
      }
      case '7':{
        stringOut = "read,write,execute";
        break;
      }
    }   
    return stringOut;
  }

  return {
    folder: stats.isDirectory(),
    size: stats.size,    
	  birthdate: stats.birthtime.toLocaleDateString("en-US"),
  	birthtime: stats.birthtime.toLocaleTimeString("en-US"),        
    permissionSpecial: processedRaw(char0),
    permissionUser: processedRaw(char1),
    permissionGroup: processedRaw(char2),
    permissionOther: processedRaw(char3),    
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
