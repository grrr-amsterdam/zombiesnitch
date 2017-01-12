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

        for (stackPerUrl in this._stack) {
            output.push(
                item.reason +
                ' ' + item.url + ':'
            );

            for (let hash of stackPerUrl) {
                item = JSON.parse(hash);
                output.push(
                    "\tfrom " + item.base +
                    ' on line ' + item.line
                );
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
