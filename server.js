#! /usr/bin/env node
const blc           = require("broken-link-checker")
const report        = require("./lib/report.js")
const service       = require('./lib/service.js')
const errorStack    = require('./lib/error-stack.js')
const scannedUrl    = require('./lib/scanned-url.js')
const commander     = require('commander')


commander.arguments('<site> [sentry_url]')
.action(function(site, sentry_url) {
    siteUrl = site;
    sentryUrl = sentry_url;
});
commander.parse(process.argv)


if (typeof siteUrl === 'undefined') {
    console.error("No site url provided. Please set the site url as first argument.")
    process.exit(1)
}

if (typeof sentryUrl === 'undefined') {
    console.error(
        "No Sentry url provided." +
        "\nYou can optionally set the Sentry DSN url as second argument for monitoring."
    )
}

console.log('Scanning ' + siteUrl)

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
