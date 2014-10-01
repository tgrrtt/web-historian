var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-get');

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

exports.readListOfUrls = function(){
  //open sites.txt
  //  read file parse stream
  //  return with a data structure???
};

exports.isUrlInList = function(siteList, site){
  if (siteList.indexOf(site) < 0) {
    return false;
  } // else
  return true;
};

exports.addUrlToList = function(){
  // open sites.txt
  // append site(actual string of text) to file
};

exports.isURLArchived = function(path){
  fs.exists(path,function(exists){
  // exists = boolean
  });
  // if directory
  //   return true;
  // else
  //   false
};

exports.downloadUrls = function(url){
  // http-get npm module
  // make get req to url
  // var options = {
  //   url: url;
  // }
  // var path = path.join(something.archivedSites, url (but without http))
  // get.(options,path,function(){
  //   completion callback
  // });
};
