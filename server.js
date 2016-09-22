#! /usr/bin/env node
var blc = require("broken-link-checker");
var report = require("./lib/report.js");
var service = require('./lib/service.js');
var errorStack = require('./lib/error-stack.js');
var scannedUrl = require('./lib/scanned-url.js');

var siteUrl = process.env.ZOMBIESNITCH_URL;
if (!siteUrl) {
    throw "No site url provided as environment variable. Please set ZOMBIESNITCH_URL.";
}

var blcOptions = {
    filterLevel: 2,
    //excludeExternalLinks: true
    //options.honorRobotExclusions
};

var scannedUrls = 0;

var processLink = function(result, customData) {
    scannedUrls++;
    process.stdout.write('Scanned ' + scannedUrls + " urls.\r");

    if (scannedUrl.isBroken(result)) {
        errorStack.push(result);
        return;
    }
};

var finalize = function() {
    console.log(report.getFinalReport(errorStack, scannedUrls));

    if (errorStack.length) {
        service.send(report.getFinalReport(errorStack, scannedUrls));
    }
};

var siteChecker = new blc.SiteChecker(blcOptions, {
    link: processLink,
    end: finalize 
});

siteChecker.enqueue(siteUrl);
