---
date: 2016-10-14
title: 'Setting Up a Basic Cron Job in Linux'
template: post
thumbnail: '../thumbnails/linux.png'
slug: setting-up-a-basic-cron-job-in-linux
categories:
  - Tools
tags:
  - cron
  - linux
  - server
---

Recently, I had to set up a scheduled task on a server, which is a little intimidating and scary the first time around, so here's a quick article about the steps for setting up a basic cron job. In this article, we'll create a simple PHP script to send out an email once per day.

#### Prerequisites

- Basic command line familiarity.
- Ability to SSH into a Linux server.

#### Goals

- Learn how to set a basic scheduled task (cron job) in a Linux server environment.
- Set a cronjob to send out an email every day at a specified time.

## Sending an Email from PHP

First, we can make a simple PHP script to test. I'm going to make a file that sends a simple email to myself.

```php
<?php
$to = 'me@example.com';
$message = 'This is the message.';
$subject = 'Insert Subject Here';
$headers = 'From: noreply@example.com' . "\r\n" .
           'Reply-To: me@example.com';

@mail($to, $subject, $message, $headers);
?>
```

If you're not familiar with the `mail()` function in PHP, [here is the official documentation](http://php.net/manual/en/function.mail.php). I'm setting variables for who the e-mail should send to, where it should come from, the subject, a message, and headers. This is not the most up-to-date or secure way to send an email, but it's a script that works so I'm going to use it for testing. I'm just going to save this as **cron.php**.

The path to your public facing folder will depend on the Linux distro, but for the sake of this tutorial I'll put it in _/var/www/html/crontest_. Therefore, the full path to my script will be _/var/www/html/crontest/cron.php_. You can test this script directly from your browser by hitting the file. If your website is **example.com**, it would most likely be **example.com/crontest/cron.php**. If you load the file and get an email, you know the script works.

> localhost is not set up to send out PHP mail, so this script needs to be run from a live Linux environment.

## Basic Cron Syntax

There's a useful site called [Crontab Generator](http://crontab-generator.org/) that will calculate the setup of a cron job for you, but first we'll go through a brief overview of what a syntax will look like.

#### Example cron job

```bash
* * * * * /usr/bin/php /var/www/html/crontest/cron.php > /dev/null 2>&1
```

### Parts of a cron command

There are four main parts to a cron command.

|Timing|Execute PHP|Path to script|Output|
|--- |--- |--- |--- |
|`* * * * *`|`/usr/bin/php`|`/var/www/html/crontest/cron.php`|`> /dev/null 2>&1`|


- **Timing** - set the minutes, hours, days, months, and weekday settings (more below).
- **Execute** - the cron job needs to call upon PHP to run, which is located at `/usr/bin/php`.
- **Path to script** - the full path of the file you plan to run.
- **Output** - (optional) you can write the output to a file or discard it - `> /dev/null 2>&1` will discard.

In the above example, the cron job is set to send every minute - or more specifically, every minute of every hour of every day of every month, every day of the week. An asterisk is a wildcard that stands for "all".

- **Minutes** - set the minutes, from 0-59
- **Hours** - set the hour, from 0-24
- **Days** - set the day, from 1-31
- **Months** - set the month, from 1-12 (January - December)
- **Week** - set the day of the week, from 0-6 (Sunday - Saturday)

Here are a few basic examples to get an idea of how it works.

Syntax | Explanation
| ----------- | -------------------------------------------------------------------------------------------- |
| `0 * * * *` | run once an hour (every hour at minute zero)                                                 |
| `0 0 * * *` | run once a day (every day at midnight and minute zero)                                       |
| `0 0 1 * *` | run once a month (on the first day of every month at midnight and minute zero)               |
| `0 0 1 1 *` | run once a year (on the first day of the first month every year at midnight and minute zero) |

There are all sorts of settings, such as for odd/even days, every 5 minutes, etc, and plenty of resources to find the exact scheduling you're looking for.

## Setting Up a Cron Job

> If cron is set up under root, you'll need to run `sudo` before your code.

The cron command is known as `crontab`. We'll set our cron job to send out an email once a day, so here will be the full command:

```bash
0 0 * * * /usr/bin/php /var/www/html/crontest/cron.php >/dev/null 2>&1
```

Once you SSH into the server, you can check if there are any current jobs running with the following command to list all `crontabs`:

```bash
crontab -l
```

```terminal
crontab: no crontab for user
```

Now, we'll edit the `crontab`.

```bash
crontab -e
```

At this point, you'll most likely be in the [vi editor](https://www.ccsf.edu/Pub/Fac/vi.html), if you've never changed the default editor for your server. It can be a little confusing and scary the first time you use it, so here's what to do:

1. press esc.
2. press i (for "insert") to begin editing the file.
3. paste the cron command in the file.
4. press esc again to exit editing mode.
5. type :wq to save (`w` - write) and exit (`q` - quit) the file.

Now your `crontab` is saved, and an email should send out once per day at midnight. You can set it to `*/5 * * * *` for every 5 minutes for a faster test.

You can also put multiple cron jobs in the file, just put each command on a separate line and they will all run.

## Conclusion

There are more tutorials that will go into deeper explanation of cron jobs, such as [this one from Envato Tuts](https://code.tutsplus.com/tutorials/scheduling-tasks-with-cron-jobs--net-8800), but this is a simple article to just get familiar with the concept.

I usually like to get at least one article per month, but I was away from computers on vacation in Sweden, so I haven't had a chance to write anything lately. Don't worry, I still have plenty of ideas for guides and tutorials in the works. Meanwhile, here's a picture from Sweden!

![sweden](../images/sweden.jpg)
