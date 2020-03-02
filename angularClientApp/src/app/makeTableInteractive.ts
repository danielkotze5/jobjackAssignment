var humanSize = function (size) {
    var hz;
    if (size < 1024) hz = size + ' B';
    else if (size < 1024*1024) hz = (size/1024).toFixed(2) + ' KB';
    else if (size < 1024*1024*1024) hz = (size/1024/1024).toFixed(2) + ' MB';
    else hz = (size/1024/1024/1024).toFixed(2) + ' GB';
    return hz;
  };