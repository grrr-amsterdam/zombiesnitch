module.exports = {
    isBroken: function(blcResult) {
        return (
            blcResult.broken &&
            blcResult.html.attrs.rel !== 'dns-prefetch' &&
            /*  LinkedIn throws non-official http error 999 if
                you try to access its urls directly. */
            blcResult.http.response.statusCode !== 999
        );
    }
};
