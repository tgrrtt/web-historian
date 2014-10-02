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


  // if (/archives/) serve archives/sites folder
  if (/^\/archives\//.test(req.url)) {
    // serve up some hot files
    console.log('archives yo');

  } else if (req.url === '/' || req.url === '') {
    switch (req.method) {
      case 'GET':
        //   GET: server up index.html
        //   fs.readFile something something
        //
        var indexPath = path.join (archive.paths.siteAssets, "/index.html");
        fs.readFile(indexPath, {encoding: 'utf-8'} ,function(err, data) {
          res.writeHead(200, headers);
          res.end(data);
        });

        break;
      case 'POST':
        //   POST: (fn NAME): boolean lookup in sites.txt
        //         if in archives.
        //            respond html archived
        //         else
        //            respond loading.
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
      if (!err) {
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
