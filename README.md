# ZombieSnitch ☠️

_Crawls your site, in search of dead links._

[![Dependencies](https://david-dm.org/grrr-amsterdam/schoolwijzer-dead-link-checker.svg)](https://david-dm.org/grrr-amsterdam/schoolwijzer-dead-link-checker)



A script that crawls a website, looking for dead links and broken pages.

You can schedule this script with a cronjob.

It reports to the [Sentry](https://sentry.io) error reporting service.



____________________

## Usage

1. Set the required environment variables in your shell or scripted context:

   ```
   ZOMBIESNITCH_URL = https://example.com/
   ZOMBIESNITCH_SENTRY_URL = https://****:****@sentry.io/****
   ```

2. Execute the node script:

   ```
   $ node server.js
   ```

   Or use `npm`:

   ```
   $ npm start
   ```



_Happy undead lynching!_ 💫

____________________

Agency: [Grrr Amsterdam](https://grrr.nl)