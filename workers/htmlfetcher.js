// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
//
// fetch bot
var path = require('path');

var helper = require('../helpers/archive-helpers.js');

var runHandler = function() {
  console.log("bot running");
  helper.readListOfUrls(helper.paths.list, function(siteArr){
    // generate path based on urls

    for (var i = 0; i < siteArr.length;i++) {
      (function() {
        var siteUrl = siteArr[i];
        console.log(siteUrl);
        var filePath = path.join(helper.paths.archivedSites, siteUrl);
        console.log(filePath)
        // check if each url is archived
        helper.isURLArchived(filePath,function(bool){
          // if not, downloadUrls();
          if (bool === false) {
           //console.log(filePath, bool);
            helper.downloadUrls(siteUrl,filePath);
          }
        });
      })();
    }
  });
};
module.exports = runHandler;
