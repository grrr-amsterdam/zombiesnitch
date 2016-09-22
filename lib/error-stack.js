module.exports = {
    _stack: [],
    
    length: 0,

    /**
     * @param blcResult A single (broken) link result from BLC's SiteCheck mode.
     */
    push: function(blcResult) {
        // @todo: filter unique error links

        this._stack.push({
            url: blcResult.url.resolved,
            reason: blcResult.brokenReason,
            base: blcResult.base.resolved || null,
            line: blcResult.html.location.line
        });

        this.length++;
    },

    render: function() {
        var output = [];

        for (var i in this._stack) {
            output.push(
                this._stack[i].reason +
                ' ' + this._stack[i].url +
                "\n\tfrom " + this._stack[i].base +
                ' on line ' + this._stack[i].line
            );
        }

        return output.join("\n");
    },
};
