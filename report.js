module.exports = {
    links: {
        valid: 0,
        broken: [],

        /** Get number of broken links */
        getBroken: function() {
            return this.broken.length || 0;
        },

        /** Get total links processed */
        getTotal: function() {
            return this.getBroken() + this.valid;
        },

    },

    renderBroken: function() {
        var output = [];
        for (var i in this.links.broken) {
            output.push(
                this.links.broken[i].reason +
                ' ' + this.links.broken[i].url +
                "\n\tfrom " + this.links.broken[i].base
            );
        }

        return output.join("\n");
    },

    printLine: function(blcLinkResult) {
        return "Broken links: "
            + this.links.getBroken() 
            + ' / '
            + this.links.getTotal()
            + ' '
            + blcLinkResult.url.resolved
        ;
    },

    getFinalReport: function() {
        var output = [];
        var broken = this.links.getBroken();
        var errorMsg = '😕  There ' +
            (broken === 1
             ? 'was'
             : 'were'
            ) + ' ' + broken +
            ' broken link' +
            (broken > 1
             ? 's'
             : ''
            ) + ' found.'
        ;

        output.push(!broken
            ? '🤗  No broken links!'
            : errorMsg
        );

        output.push(this.links.getTotal() + ' links scanned.');

        if (this.links.getBroken()) {
            output.push(this.renderBroken());
        }

        return output.join("\n");
    },
};
