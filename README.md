# wordpress-plugin-stats-scraper.js

Scrapes daily installation metrics for a public WordPress plugin hosted on WordPress.org (for use with cron)

## Getting Started

Scrapes and saves the following info:

- `date`: The current date
- `version`: The most recent plugin version
- `installsActive`: The current number of installs (rounded to 100's)
- `downloadsYesterday`: The number of yesterday's new downloads
- `downloadsTotal`: The number of total downloads
- `issuesMonthTotal`: The number of support issues reported in the last month
- `issuesMonthResolved`: The number of resolved support issues in the last month


### Prerequisites

The script is based on PhantomJS. On Linux:

```
apt-get install phantomjs
```

### Running

```
phantomjs wordpress-plugin-stats-scraper.js <plugin_slug> [<output_file.csv>]
```

* To see usage instructions

```
phantomjs wordpress-plugin-stats-scraper.js
```

* To save today's statistics for plugin with slug `akismet`

```
phantomjs wordpress-plugin-stats-scraper.js akismet
```

The above will write or append to `akismet-installs.csv` in the current working directory.

* To save today's statistics for plugin with slug `akismet` to file `/home/user/akismet-statistics.csv`:

```
phantomjs wordpress-plugin-stats-scraper.js akismet /home/user/akismet-statistics.csv
```

## Built With

* [PhantomJS](http://phantomjs.org/) - Scriptable Headless Browser

## Authors

* **Alexandros Georgiou** - *Initial work* - [github](https://github.com/alex-georgiou) [blog](https://alexgeorgiou.gr)

## License

This project is licensed under the WTFPL License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* A big thank you to the nice people at WordPress.org and to the PhantomJS developers!
