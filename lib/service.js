var raven = require("raven");
var client = new raven.Client(process.env.ZOMBIESNITCH_SENTRY_URL);

module.exports = {
    send: function(message) {
        process.stdout.write('Sending broken links to Sentry: '); 
        client.captureMessage(message);
        process.stdout.write('√ Sent.'); 
    },
};
