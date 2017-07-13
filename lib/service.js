const raven = require("raven");

module.exports = {
    send: function(message, sentryUrl) {
        var client = new raven.Client(sentryUrl);

        process.stdout.write('Sending broken links to Sentry: '); 
        client.captureMessage(message);
        process.stdout.write('√ Sent.'); 
    },
};
