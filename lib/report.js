module.exports = {
    getFinalReport: function(errorStack, scannedUrls) {
        var output = [];
        var linksNoun = 'link' + 
            (errorStack.length > 1 ? 's' : '')
        ;

        var errorMsg = '😕  There ' +
            (errorStack.length === 1
             ? 'was'
             : 'were'
            ) + ' ' + errorStack.length +
            ' broken ' + linksNoun + ' found.'
        ;

        output.push(!errorStack.length
            ? '🤗  No broken links!'
            : errorMsg
        );

        output.push(scannedUrls + ' ' + linksNoun + ' scanned.');

        if (errorStack.length) {
            output.push(errorStack.render());
        }

        return output.join("\n");
    },
};
