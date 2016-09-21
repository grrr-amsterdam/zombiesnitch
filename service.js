var raven = require("raven");

module.exports = {
    sentryUrl: process.env.ZOMBIESNITCH_SENTRY_URL,

    client: new raven.Client(this.sentryUrl),

    send: function(message) {
        console.log('Sending broken links to Sentry:'); 
        this.client.captureMessage(message);
        console.log('Sent.');
    },
};
