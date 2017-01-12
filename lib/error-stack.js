var util = require('util');

module.exports = {
    _stack: [],
    
    length: 0,

    /**
     * @param blcResult A single (broken) link result from BLC's SiteCheck mode.
     */
    push: function(blcResult) {
        var error = {
            url: blcResult.url.resolved,
            reason: blcResult.brokenReason,
            base: blcResult.base.resolved || null,
            line: blcResult.html.location.line
        };

        if (!(error.url in this._stack)) {
            this._stack[error.url] = new Set();
        }

        this._stack[error.url].add(JSON.stringify(error));
        this.length = this._getStackSize();
    },

    render: function() {
        var output = [];
        var firstErrorForUrl = true;

        for (stackPerUrl in this._stack) {
            firstErrorForUrl = true;

            for (let hash of this._stack[stackPerUrl]) {
                item = JSON.parse(hash);

                if (firstErrorForUrl) {
                    output.push(
                        item.reason +
                        ' ' + item.url + ':'
                    );
                }

                output.push(
                    "\tfrom " + item.base +
                    ' on line ' + item.line
                );

                firstErrorForUrl = false;
            }
        }

        return output.join("\n");
    },

    _getStackSize: function() {
        var output = 0;

        for (var stackPerUrl in this._stack) {
            output += stackPerUrl.length;
        }

        return output;
    },
};
