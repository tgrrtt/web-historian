var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // Path: '/'
  //   GET: server up index.html
  //   POST: (fn NAME): boolean lookup in sites.txt
  //         if in archives.
  //            respond html archived
  //         else
  //            respond loading.
  // Path: '/' + "SITEURL"
  //    GET: (fn NAME)
  res.end(archive.paths.list);
};
