module.exports = {
    _stack: new Set(),
    
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

        this._stack.add(JSON.stringify(error));
        this.length = this._stack.size;
    },

    render: function() {
        var output = [];

        for (let hash of this._stack) {
            item = JSON.parse(hash);
            output.push(
                item.reason +
                ' ' + item.url +
                "\n\tfrom " + item.base +
                ' on line ' + item.line
            );
        }

        return output.join("\n");
    },
};
