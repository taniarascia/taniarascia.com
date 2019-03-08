---
date: 2018-03-05 00:56:05
title: 'How to Create an Error Log in PHP'
template: post
slug: /how-to-create-an-error-log-in-php/
categories:
  - Programming
  - Tutorials
tags:
  - php
---

It was only recently that I realized you could send custom error logs to whatever file you want. I just create a `logs` directory and told PHP to write a message to that location when the script was hit. In the below code, the message "Error message" will get sent to **error.log**.

```php
<?php

    error_log("Error message\n", 3, "/Users/tania/logs/error.log");
```
