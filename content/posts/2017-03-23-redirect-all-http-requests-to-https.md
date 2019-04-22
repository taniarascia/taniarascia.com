---
date: 2017-03-23
title: 'Redirect all HTTP requests to HTTPS'
template: post
thumbnail: '../thumbnails/ssl.png'
slug: redirect-all-http-requests-to-https
categories:
  - Tools
tags:
  - htaccess
---

If you have SSL/TLS set up on your server, you might need to force the site to redirect to the secure HTTPS version. If you need to know how to obtain the certificate, [read about that here](/https-ssl-tls-certificate-how-to/). Otherwise, create an **.htaccess** file in the root of your server with the following code.

```apacheconf
RewriteEngine on
    RewriteCond %{HTTP:X-Forwarded-Proto} !https
    RewriteRule ^.*$ https://%{SERVER_NAME}%{REQUEST_URI} [L,R=301]
```

If this causes a "too many redirects" error for you, you can replace `RewriteCond %{HTTP:X-Forwarded-Proto} !https` with `RewriteCond %{HTTPS} !=on`.
