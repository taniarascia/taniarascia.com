---
date: 2017-06-06
title: 'How to Generate a Public Key from a Private Key'
template: post
thumbnail: '../thumbnails/linux.png'
slug: how-to-generate-a-public-key-from-a-private-key
categories:
  - Tools
tags:
  - server
  - sysadmin
---

Recently, I needed to find the corresponding public key from a private key (`.pem`) to give a Linux user access to a server. I used the below code to generate the public key.

```bash
ssh-keygen -y -f privatekey > publickey
```

This code generates an OpenSSL key, which wasn't what I needed in that specific case, but might also come in handy.

```bash
openssl rsa -in privatekey -pubout > publickey
```
