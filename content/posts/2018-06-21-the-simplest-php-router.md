---
date: 2018-06-21
title: 'The Simplest PHP Router'
template: post
thumbnail: '../thumbnails/php.png'
slug: the-simplest-php-router
categories:
  - PHP
tags:
  - mvc
  - php
  - routes
  - routing
---

I wanted to create the absolute most basic routing code in PHP, so here it is. We will direct ALL traffic to `index.php` and route to the new files from there.

## Redirect all requests to index.php

In the root of your project, create a `.htaccess` file that will redirect all requests to `index.php`.

<div class="filename">.htaccess</div>

```apacheconf
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.+)$ index.php [QSA,L]
```

## Create a routing switch

Get the requested path with `$_SERVER['REQUEST_URI']`, and require the page you want to display. I have `''` and `'/'` for both _url.com/_ and _url.com_.

<div class="filename">index.php</div>

```php
<?php

$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case '/' :
        require __DIR__ . '/views/index.php';
        break;
    case '' :
        require __DIR__ . '/views/index.php';
        break;
    case '/about' :
        require __DIR__ . '/views/about.php';
        break;
    default:
        require __DIR__ . '/views/404.php';
        break;
}
```

## Create the views

Create a `/views` directory and place the files.

<div class="filename">/views/index.php</div>

```html
<h1>Main</h1>
```

<div class="filename">/views/about.php</div>

```html
<h1>About</h1>
```

<div class="filename">/views/404.php</div>

```html
<h1>404</h1>
```

That's it!
