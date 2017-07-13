#! /usr/bin/env node
var blc         = require("broken-link-checker");
var report      = require("./lib/report.js");
var service     = require('./lib/service.js');
var errorStack  = require('./lib/error-stack.js');
var scannedUrl  = require('./lib/scanned-url.js');
const commander = require('commander')


commander.arguments('<site> [sentry_url]')
.action(function(site, sentry_url) {
    siteUrl = site;
    sentryUrl = sentry_url;
});
commander.parse(process.argv)

console.log('Scanning ' + siteUrl)

if (!siteUrl) {
    throw "No site url provided. Please set the site url as first argument.";
}
if (!sentryUrl) {
    console.error(
        "No Sentry url provided." +
        "\nYou can optionally set the Sentry DSN url as second argument for monitoring."
    );
}

var blcOptions = {
    filterLevel: 2,
    honorRobotExclusions: false
};

var scannedUrls = 0;

var processLink = function(result, customData) {
    scannedUrls++;
    process.stdout.write('Scanned ' + scannedUrls +
        " urls. Found " + errorStack.length + " broken links.\r");

    if (scannedUrl.isBroken(result)) {
        errorStack.push(result);
        return;
    }
};

var finalize = function() {
    var finalReport = report.getFinalReport(errorStack, scannedUrls);
    process.stdout.write("\n" + finalReport);

    if (errorStack.length && sentryUrl) {
        service.send(finalReport, sentryUrl);
    }
};

var siteChecker = new blc.SiteChecker(blcOptions, {
    link: processLink,
    end: finalize 
});

siteChecker.enqueue(siteUrl);
