module.exports = {
    isBroken: function(blcResult) {
        return (
            blcResult.broken &&

            /*  DNS prefetching addresses the base url,
                which is often not a valid url itself. */
            blcResult.html.attrs.rel !== 'dns-prefetch' &&

            /*  LinkedIn throws non-official http error 999 if
                you try to access its urls directly. */
            blcResult.http.response.statusCode !== 999 &&

            /*  We will ignore POST urls faults,
                since these will throw 405 (or even 404) errors
                when fetched by GET.
                The blc package currently doesn't have a way
                to call urls by POST.
                @todo: following them by POST would be a nice feature. */
            blcResult.html.attrs.method !== 'post'
        );
    }
};
