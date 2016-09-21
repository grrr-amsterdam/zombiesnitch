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

    printBroken: function() {
        console.log("\n");

        for (var i in this.links.broken) {
            console.log(
                this.links.broken[i].reason
                + " "
                + this.links.broken[i].url
            );
        }
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

    printFinalReport: function() {
        console.log(
            this.links.getTotal()
            + ' links scanned.'
        );

        if (!this.links.getBroken()) {
            console.log('🤗  No broken links!');
            return;
        }

        this.printBroken();
    }    
};
