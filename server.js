#! /usr/bin/env node
var blc = require("broken-link-checker");
var report = require("./report.js");
var service = require('./service.js');

var siteUrl = process.env.ZOMBIESNITCH_URL;
if (!siteUrl) {
    throw "No site url provided as environment variable. Please set ZOMBIESNITCH_URL.";
}

var options = {
    filterLevel: 2,
    //excludeExternalLinks: true
    //options.honorRobotExclusions
};

var processLink = function(result, customData) {
    process.stdout.write('Scanned ' + report.links.getTotal() + " urls.\r");
    //console.log(report.printLine(result));

    if (
        result.broken &&
        result.html.attrs.rel !== 'dns-prefetch'   
    ) {
        //console.log(result);
        report.links.broken.push({
            url: result.url.resolved,
            reason: result.brokenReason
        });
        //console.log(report.links.broken);
        return;
    }

    report.links.valid++;
};

var finalize = function() {
    console.log(report.getFinalReport());

    if (report.links.getBroken()) {
        service.send(report.getFinalReport());
    }
};

var siteChecker = new blc.SiteChecker(options, {
    link: processLink,
    end: finalize 
});

siteChecker.enqueue(siteUrl);
