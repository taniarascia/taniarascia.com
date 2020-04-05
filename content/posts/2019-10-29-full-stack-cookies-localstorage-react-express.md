---
date: 2019-10-29
title: 'Authentication on the Client Side the Right Way: Cookies vs. Local Storage'
template: post
thumbnail: '../thumbnails/cookie.png'
slug: full-stack-cookies-localstorage-react-express
categories:
  - Code
tags:
  - javascript
  - react
  - node
  - express
  - authentication
---

### The expectation

When you log into an application, you have the expectation that the next time you open a new tab or window in the browser, you will still be logged into that application. This means that in some way, shape, or form, **the client (browser) must maintain a reference to you** in order to keep you logged in.

### Where can I persist state on the client?

Dealing with security and authentication in a front end application can be a difficult problem. There are generaly two ways to maintain state on the client in a web application:

- [Local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

### What are the vulnerabilities?

Both of these methods comes with potential related security issues:

| Method        | Vulnerability                         |
| ------------- | ------------------------------------- |
| Local storage | **XSS** - cross-site scripting        |
| Cookies       | **CSRF** - cross-site request forgery |

- An [**XSS**](<https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)>) vulnerability enables an attacker to inject JavaScript into a site.
- A [**CSRF**](<https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)>) vulnerability enables an attacker to perform actions on a website via an authenticated user.

A good primer on some of the differences between these two vulnerabilities and their causes can be found in [Where to Store your JWTs – Cookies vs HTML5 Web Storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage).

### How can I get around it?

If local storage can be exploited by third-party scripts (such as those found in browser extensions) and if authentication can be spoofed with cookies, where is it acceptable to place client state?

In [Single-Page App Authentication Using Cookies](https://auth0.com/docs/login/spa/authenticate-with-cookies#how-it-works) on the Auth0 docs, we learn that if your application:

- is served to the client using your own backend
- has the same domain as your backend
- makes API calls that require authentication to your backend

then _there is a way to safely use cookies for authentication_.

### What does it look like?

A real-world example of the setup:

- a **React** single-page application (SPA) on the front end
- a **Node + Express** server backend
- **Web Cookies** (Secure, HttpOnly, Same Site)

The Express server will serve the React SPA from all routes, except those that begin with `/api`. The React application will hit the Express server for all endpoints. With this method, your front end app is on the same domain, and has a server, allowing you to secure cookies with HttpOnly, Secure, and Same Site options.

From here, you can make API calls to microservices or some protected server. The actual API endpoints and access tokens will not be visible from the browser.

Below I will lay out some of the main concepts of setting up this architecture for a full stack application (without it being an actual tutorial walkthrough).

> To see a real world example of this setup (using full stack TypeScript), look at [the source of TakeNote](https://github.com/taniarascia/takenote).

## Using HTTP cookies in Express

In order to use cookies in Express, you use the [`cookie-parser`](https://www.npmjs.com/package/cookie-parser) module.

### Parse cookies

```js
const cookieParser = require('cookie-parser')

app.use(cookieParser())
```

### Set a cookie

In a route, you can set a cookie on the `response` object, with some important properties:

```js
// Set a cookie
response.cookie('nameOfCookie', 'cookieValue', {
  maxAge: 60 * 60 * 1000, // 1 hour
  httpOnly: true,
  secure: true,
  sameSite: true,
})
```

- [**Same Site**](https://en.wikipedia.org/wiki/HTTP_cookie#SameSite_cookie) - prevents the cookie from being sent in cross-site requests
- [**HTTP Only**](https://en.wikipedia.org/wiki/HTTP_cookie#HttpOnly_cookie) - cookies are only accessible from a server
- [**Secure**](https://en.wikipedia.org/wiki/Secure_cookie) - cookie must be transmitted over HTTPS

### Get a cookie

The cookie can now be read in subsequent responses.

```js
// Get a cookie
response.cookies.nameOfCookie
```

### Clear a cookie

On logging out of the authentication, you'll want to clear the cookies.

```js
// Clear a cookie
response.clearCookie('nameOfCookie')
```

### Local values in Express middleware

Express runs on middlewares. In the case that you want to update a cookie in one middleware and use it in the next, you can store it as an Express local. This might come in handy if you have to refresh a JWT access token in a preAuth route, use that authentication in the handler, and send cookies in the response at the end.

```js
// Create a local
const refreshMiddleware = (request, response, next) => {
  const accessToken = getNewAccessToken(refreshToken)
  // Set local
  response.locals.accessToken = accessToken
  next()
}

// Use a local
const handler = (request, response) => {
  const updatedAccessToken = response.locals.accessToken
}

router.post('/app/user', refreshMiddleware, handler)
```

## Serving the Front End React Application

A good example of this setup can be found in the [Simple React Full Stack](https://github.com/crsandeep/simple-react-full-stack) boilerplate setup. Ultimately, here's what the layout of your application will look like:

```bash
- dist     # Distribution folder of the production React SPA build
- src
  - client # React source files
  - server # Express server files
```

In which case, your server file will look something like this:

<div class="filename">src/server/index.js</div>

```js
// Initialize Express app
const express = require('express')
const app = express()
const router = require('./router')

// Serve all static files from the dist folder
app.use(express.static(path.join(__dirname, '../../dist/')))

// Set up express router to serve all api routes (more on this below)
app.use('/api', router)

// Serve any other file as the distribution index.html
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../../dist/index.html'))
})
```

## Express Routes and Handlers

Using the [Express Router class](https://expressjs.com/en/guide/routing.html), you can organize all your API routes into subdirectories and bring them in with a single line in the main server entry point.

```bash
- src
  - server
    - router
    - handlers
    - index.js
```

The routes can all be organized into individual subdirectories.

<div class="filename">src/server/routes/index.js</div>

```js
const router = require('express').Router()
const bookRoutes = require('./books')
const authorRoutes = require('./authors')

router.use('/books', bookRoutes)
router.use('/authors', authorRoutes)

module.exports = router
```

In one set of routes, we can define all the `GET`, `POST`, `DELETE` routes, etc. Since the router is using `/api`, and the authors route is using `/authors`, a GET API call to `/api/authors/jk-rowling` would call the `getAuthor` handler, in this example.

<div class="filename">src/server/routes/authors.js</div>

```js
const router = require('express').Router()
const authorHandlers = require('../handlers/authors')

// Get
router.get('/', authorHandlers.getAllAuthors)
router.get('/:author', authorHandlers.getAuthor)

// Post
router.post('/', authorHandlers.addAuthor)

module.exports = router
```

You can put all your related author handlers in the `handlers` subdirectory.

<div class="filename">src/server/handlers/authors.js</div>

```js
module.exports = {
  getAllAuthors: async (request, response) => {
    // Some logic...
    if (success) {
      response.status(200).send(authors)
    } else {
      response.status(400).send({ message: 'Something went wrong' })
    }
  },
  addAuthor: async (request, response) => { ... },
}
```

This brings us back to the server entrypoint, which is bringing in all the routes for `/api`.

<div class="filename">src/server/index.js</div>

```js
// Set up all API routes
const router = require('./router')

// Use all API routes
app.use('/api', router)
```

## React Single Page Application

Tyler McGinnis has a great article about [Protected Routes and Authentication with React Router](https://tylermcginnis.com/react-router-protected-routes-authentication/), which demonstrates how you can make a `PrivateRoute` and `PublicRoute` component.

This is front-end only authentication protection, which can not be trusted to protect sensitive data - that should be protected by the backend APIs that require access tokens (or whatever security method) to return a response.

Using the basic example of routes from the aforementioned article, here's how you can make an API call to the Express server from React, authenticate some global [Context](/using-context-api-in-react/) state, and route the app through the front end.

<div class="filename">App.js</div>

```jsx
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
// ...plus page and context imports

export default class App extends Component {
  static contextType = AuthContext

  state = { loading: true }

  async componentDidMount() {
    const Auth = this.context

    try {
      const response = await axios('/api/auth')

      Auth.authenticate()
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const Auth = this.context
    const { loading } = this.state

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <Router>
        <Switch>
          <PublicRoute exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    )
  }
}
```

Now the development server will direct you to the correct route depending on your authentication status. In production mode, the distribution `index.html` file will be served - more on this below.

## Production and Development

With the production setup, an entire React application is built for distribution, and the Express app serves the SPA on all routes.

<div class="filename">package.json</div>

```js
// Production
{
  "build": "cross-env NODE_ENV=production webpack --config config/webpack.prod.js",
  "start": "npm run build && node src/server/index.js"
}
```

This is cumbersome for development. The best way to deal with development is to serve React on a Webpack dev server just as you regularly would, and proxy all API requests to the Express server.

<div class="filename">package.json</div>

```js
// Development
{
  "client": "cross-env NODE_ENV=development webpack-dev-server --config config/webpack.dev.js",
  "server": "nodemon src/server/index.js",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
```

You'll probably serve the React app on port `3000` and the server on `5000`, which can be set in the development Webpack config file.

```js
devServer: {
  historyApiFallback: true,
  proxy: {
    '/api': 'http://localhost:5000',
  },
  open: true,
  compress: true,
  hot: true,
  port: 3000,
}
```

Setting `historyApiFallback` will ensure the SPA routes work properly. It's also important to set the `publicPath` in Webpack to `/`, to ensure the routes in production serve the bundles from the root.

The [Webpack Boilerplate](https://github.com/taniarascia/webpack-boilerplate) is a good example to use for how to set up Webpack (in this case, you would just move everything from building directly to `src` to building to `src/client`).

## Conclusion

Hopefully this resource helped you understand the various types of vulnerabilities associated with persistent client-side storage (XSS and CSRF), and some approaches we can take to mitigate potential attacks, namely HttpOnly, SameSite, Secure Web Cookies.

If you have any additional insight that can make this article better, please don't hesitate to let me know.
