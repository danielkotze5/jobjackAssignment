var path = require('path');
var MY_ROOT = path.dirname('.');

var filePath = function (relPath, decodeURI) { 
  if (decodeURI) relPath = decodeURIComponent(relPath);
  if (relPath.indexOf('..') >= 0){
    var error = new Error('Do Not Contain .. in relPath!');
    error.status = 400;
    throw error;
  }
  else {
    return path.join(MY_ROOT, relPath);    
  }
};

module.exports = {   
  loadRealPath: function *(next) {   
    this.request.fPath = filePath(this.params[0]);    
    yield * next;   
  }  
};
