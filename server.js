#! /usr/bin/env node
var blc = require("broken-link-checker");

var siteUrl = 'https://schoolwijzer.amsterdam.nl/nl/';
var options = {
    filterLevel: 2,
    excludeExternalLinks: true
};

//blc https://schoolwijzer.amsterdam.nl/nl/ -roe --filter-level=2

var report = {
    links: {
        valid: 0,
        broken: 0,
        getTotal: function() {
            return this.broken + this.valid;
        }
    },
};

var processLink = function(result, customData) {
    console.log("Broken links: "
                + report.links.broken
                + ' / '
                + report.links.getTotal()
    );

    if (result.broken) {
        console.log(result);
        report.links.broken++;
        return;
    }

    report.links.valid++;
};

var siteChecker = new blc.SiteChecker(options, {link: processLink});

//var siteChecker = new blc.SiteChecker(options, {
    //robots: function(robots, customData){},
    //html: function(tree, robots, response, pageUrl, customData){},
    //junk: function(result, customData){},
    //link: function(result, customData){},
    //page: function(error, pageUrl, customData){},
    //site: function(error, siteUrl, customData){},
    //end: function(){}
//});

siteChecker.enqueue(siteUrl);
