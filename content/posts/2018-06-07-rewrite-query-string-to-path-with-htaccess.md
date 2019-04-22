---
date: 2018-06-07
title: 'Rewrite Query String to Path with htaccess'
template: post
thumbnail: '../thumbnails/apache.png'
slug: rewrite-query-string-to-path-with-htaccess
categories:
  - Tools
tags:
  - apache
  - htaccess
  - rewrite
---

Let's say I have this URL:

```
http://example.com/users.php?name=tania
```

And I want this URL:

```
http://example.com/users/tania
```

I can do so with the following `.htaccess`:

<div class="filename">.htaccess</div>

```apacheconf
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^/?users/(.*?)/?$ /users.php?name=$1 [L]

RewriteCond %{THE_REQUEST} ^[A-Z]{3,9}\ /users\.php\?name=([^\&\ ]+)
RewriteRule ^/?users\.php$ /users/%1? [L,R=301]
```

I can even still GET the URL query.

<div class="filename">users.php</div>

```apacheconf
<?php

echo $_SERVER['REQUEST_URI'] . '<br>';

print_r($_GET);
```

```terminal
/users/tania
Array ( [name] => tania )
```

Alternatively, you could redirect everything to `index.php` and route it that way.

```apacheconf
RewriteEngine On
RewriteRule ^([a-zA-Z0-9]+)$ index.php?url=$1
```

That's all!
