var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-get');
var urlModule = require('url');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(fullPath, cb){
  //open sites.txt
  //  read file parse stream
  fs.readFile(fullPath, {encoding: 'utf-8'}, function(err, data) {
    var newArr = data.split('\n');
    newArr = newArr.filter(function(v,k,c){
      return v !== "";
    });
    cb(newArr);
  });
};

// not going to be used in bot
exports.isUrlInList = function(siteList, site){
  if (siteList.indexOf(site) < 0) {
    return false;
  } // else
  return true;
};

exports.addUrlToList = function(filePath, urlFull){
  var url = urlFull + '\n';
  // append site(actual string of text) to file
  fs.appendFile(filePath,url);
};

exports.isURLArchived = function(path,cb){
  // check if url/path exists in filepath
  fs.exists(path,function(exists){
    // need to pass bool into cb.
    cb(exists);
  });
};

exports.downloadUrls = function(url,filePath){
  // http-get npm module
  // make get req to url
  var options = {
    url: url
  };
  http.get(options,filePath,function(err,res){
    if (err) {
      console.log(err);
    }
  });
};
