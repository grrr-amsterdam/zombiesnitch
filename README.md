# ZombieSnitch ☠️

[![Greenkeeper badge](https://badges.greenkeeper.io/grrr-amsterdam/zombiesnitch.svg)](https://greenkeeper.io/)

_Crawls your site, in search of dead links._

[![Dependencies](https://david-dm.org/grrr-amsterdam/schoolwijzer-dead-link-checker.svg)](https://david-dm.org/grrr-amsterdam/schoolwijzer-dead-link-checker)



A script that crawls a website, looking for dead links and broken pages.

You can schedule this script with a cronjob.

It optionally reports to the [Sentry](https://sentry.io) error reporting service.

Note that we do _NOT_ honor Robot exclusions. This is not a bug, but a feature.
It enables you to scan staging servers for dead links.



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



## Usage in a cronjob

1. Check out ZombieSnitch and install its dependencies with `npm i` in the directory itself.

2. Create a shell script:

   ```bash
   export ZOMBIESNITCH_URL=https://example.com/
   export ZOMBIESNITCH_SENTRY_URL=https://****:****@sentry.io/****
   nodejs /my/path/to/zombiesnitch/server.js
   ```

3. Make the shell script executable: 

   ```bash
   $ chmod u+x my-shell-script.sh
   ```

4. Call the script in a cronjob (with `crontab -e`):

   ```bash
   2 0 * * * /my/path/to/my-shell-script.sh
   ```

   This would check for broken links every night at 2 am.

____________________

Agency: [Grrr Amsterdam](https://grrr.nl)
