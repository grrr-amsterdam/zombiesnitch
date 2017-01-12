module.exports = {
    getFinalReport: function(errorStack, scannedUrls) {
        var output = [];
        var linksNoun = 'link' + 
            (errorStack.length > 1 ? 's' : '')
        ;
        var linksVerb = (
            errorStack.length === 1
            ? 'was'
            : 'were'
        );

        var errorMsg = '😕  There ' +
            linksVerb + ' '
            + errorStack.uniqueErrorUrls
            + ' unique broken ' + linksNoun + ' found in '
            + errorStack.length + ' occurrences.'
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
