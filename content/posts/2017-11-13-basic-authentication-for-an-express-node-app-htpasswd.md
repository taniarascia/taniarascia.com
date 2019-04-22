---
date: 2017-11-13
title: 'Basic Authentication for an Express Node App (htpasswd)'
template: post
thumbnail: '../thumbnails/node.png'
slug: basic-authentication-for-an-express-node-app-htpasswd
categories:
  - JavaScript
tags:
  - authentication
  - express
  - node
---

I was struggling to find a simple way to add username and password authentication to a Node.js app running on an Express server, like **.htpasswd** for Apache. Finally, a [StackOverflow](https://stackoverflow.com/questions/23616371/basic-http-authentication-with-node-and-express-4) answer helped me out.

To start, install the [basic-auth](https://www.npmjs.com/package/basic-auth) package:

```bash
npm install basic-auth
```

Create an **auth.js** with the following code, changing `username` and `password` to whatever you want.

```js
const auth = require('basic-auth')

const admins = { username: { password: 'password' } }

module.exports = function(request, response, next) {
  var user = auth(request)
  if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="example"')
    return response.status(401).send()
  }
  return next()
}
```

And in **server.js**, include this at the top of your file.

```js
const auth = require('./auth')
const app = express()

app.use(auth)
```

Make sure to hide **auth.js** with a **.gitignore** file, and you're all set!
