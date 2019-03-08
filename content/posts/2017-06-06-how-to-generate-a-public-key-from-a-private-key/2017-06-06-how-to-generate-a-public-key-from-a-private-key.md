---
date: 2017-06-06 14:42:37+00:00
title: "How to Generate a Public Key from a Private Key"
template: post
slug: /how-to-generate-a-public-key-from-a-private-key/
categories:
- DevOps
- Tutorials
- Web
tags:
- server
- sysadmin
---


Recently, I needed to find the corresponding public key from a private key (`.pem`) to give a Linux user access to a server. I used the below code to generate the public key.


    
    <code class="language-bash">ssh-keygen -y -f privatekey > publickey</code>



This code generates an OpenSSL key, which wasn't what I needed in that specific case, but might also come in handy.


    
    <code class="language-bash">openssl rsa -in privatekey -pubout > publickey</code>

		
