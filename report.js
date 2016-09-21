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
                " " + this.links.broken[i].url
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
        output.push(this.links.getTotal() + ' links scanned.');

        output.push(!this.links.getBroken()
            ? '🤗  No broken links!'
            : '😕  There were broken links found.'
        );

        if (this.links.getBroken()) {
            output.push(this.renderBroken());
        }

        return output.join("\n");
    },
};
