# ZombieSnitch ☠️

_Crawls your site, in search of dead links._

[![Dependencies](https://david-dm.org/grrr-amsterdam/schoolwijzer-dead-link-checker.svg)](https://david-dm.org/grrr-amsterdam/schoolwijzer-dead-link-checker)



A script that crawls a website, looking for dead links and broken pages.

You can schedule this script with a cronjob.

It optionally reports to the [Sentry](https://sentry.io) error reporting service.

Note that we do _NOT_ honor Robot exclusions. This is not a bug, but a feature.
It enables you to scan staging servers for dead links.



____________________

## Usage

```bash
$ zombiesnitch https://example.com
```

### With error reporting to Sentry.io

```bash
$ zombiesnitch https://example.com https://****:****@sentry.io/****
```


_Happy undead lynching!_ 💫

____________________

Agency: [Grrr Amsterdam](https://grrr.nl)
