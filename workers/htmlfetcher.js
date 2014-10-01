// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
//
// fetch bot
var path = require('path');

var helper = require('../helpers/archive-helpers.js');

helper.readListOfUrls(helper.paths.list, function(siteArr){
  // generate path based on urls
  for (var i = 0; i < siteArr.length;i++) {
    var siteUrl = siteArr[i];
    var filePath = path.join(helper.paths.archivedSites, siteUrl);
    // check if each url is archived
    helper.isURLArchived(filePath,function(){
      // if not, downloadUrls();
      helper.downloadUrls(siteUrl,filePath);
    });
  }

});
