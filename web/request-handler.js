var path = require('path');
var urlModule = require('url');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelper = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var statusCode;
  var headers = httpHelper.headers;
  var localFolder = __dirname + '/public/';
  var fileTypes = {
    "html":"text/html",
    "js":"text/javascript",
    "css":"text/css"
  };
  // if anything else
  // serve it
  // but if / serve index.html
  //
  // if (/archives/) serve archives/sites folder
  if (/^\/archives\//.test(req.url)) {
    var archiveUrl = req.url.match(/^\/archives\/(.+)$/)[1];
    var archiveFilepath = path.join(archive.paths.archivedSites, archiveUrl);
    fs.readFile(archiveFilepath, {encoding: 'utf-8'} ,function(err, data) {
      console.log(err);
      console.log(data);
      headers["Content-Type"] = 'text/html';
      res.writeHead(200, headers);
      res.end(data);
    });
  } else if (req.url === '/' || req.url === '') {
    switch (req.method) {
      case 'GET':
        var indexPath = path.join (archive.paths.siteAssets, "/index.html");
        fs.readFile(indexPath, {encoding: 'utf-8'} ,function(err, data) {
          headers["Content-Type"] = 'text/html';
          res.writeHead(200, headers);
          res.end(data);
        });
        break;
      case 'POST':
        var siteName = '';
        req.on('data', function(chunk) {
          siteName += chunk;
          //console.log(dat);
        });
        req.on('end', function() {
          siteName = siteName.match(/^url=(.+)$/)[1];
          siteName = siteName.replace('http%3A%2F%2F', '');
          // readListOfUrls(pathToTextfile, callback)
          archive.readListOfUrls(archive.paths.list, function(listOfUrls) {
            // isUrlInList?
            if (archive.isUrlInList(listOfUrls, siteName)) {
              // if true
              console.log("is in list");
              // isUrlArchived?

              var fullPath = path.join(archive.paths.archivedSites, siteName);
              //console.log(fullPath);
              archive.isURLArchived(fullPath, function(bool){
                if (bool) {
                  // url is archived, respond with html
                  fs.readFile(fullPath, {encoding: 'utf-8'} ,function(err, data) {
                    headers["Content-Type"] = 'text/html';
                    res.writeHead(200, headers);
                    res.end(data);
                  });
                } else {
                  // respond with loading.html
                  var htmlPath = path.join (archive.paths.siteAssets, "/loading.html");
                  fs.readFile(htmlPath, {encoding: 'utf-8'} ,function(err, data) {
                    headers["Content-Type"] = 'text/html';
                    res.writeHead(302, headers);
                    res.end(data);
                  });
                }
              });
            } else {
              // add url to sites.txt
              archive.addUrlToList(archive.paths.list, siteName);
              // respond with loading.html
              var htmlPath = path.join (archive.paths.siteAssets, "/loading.html");
              fs.readFile(htmlPath, {encoding: 'utf-8'} ,function(err, data) {
                headers["Content-Type"] = 'text/html';
                res.writeHead(302, headers);
                res.end(data);
              });
            }
          });
        });
        //   POST: take pathname
        //                if true respond with archive
        //                else respond with loading.html
        //             if false
        //               respond loading.
        break;
      default:
        // if other method, res 404
        break;
    }
  } else {
    // /\.(\w+)$/
    // serve any other files

    var filePath = path.join(archive.paths.siteAssets, req.url);

    fs.readFile(filePath, {encoding: 'utf-8'} ,function(err, data) {
      if (data !== undefined) {
        headers["Content-Type"] = fileTypes[filePath.match(/\.(\w+)$/)[1]];
        res.writeHead(200, headers);
        res.end(data);
      } else {
        res.writeHead(404, headers);
        res.end();
      }
    });
  }
};
