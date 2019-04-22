---
date: 2018-03-04
title: 'How to Set Up a Cron Job in MAMP'
template: post
thumbnail: '../thumbnails/mamp.png'
slug: how-to-set-up-a-cron-job-in-mamp
categories:
  - Tools
tags:
  - cron
  - mamp
---

In [Setting Up a Basic Cron Job in Linux](/setting-up-a-basic-cron-job-in-linux/), I went over how cron jobs work and how to set one up.

Recently I wanted to set up a cron job on MAMP, and could not find any resources on how to get that done. I figured out that you need to call MAMP's PHP executable, which will depend on on the version of PHP you're running. For 5.6.32, the below would be the proper URL.

```bash
*/1 * * * * /Applications/MAMP/bin/php/php5.6.32/bin/php /Users/tania/cron.php > /dev/null 2>&1
```

Just change the version number to whatever version of PHP MAMP is currently running.
