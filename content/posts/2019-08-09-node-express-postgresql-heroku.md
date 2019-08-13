---
date: 2019-08-09
title: 'Create and Deploy a Node.js, Express, & PostgreSQL REST API to Heroku'
template: post
thumbnail: '../thumbnails/heroku.png'
slug: node-express-postgresql-heroku
categories:
  - JavaScript
tags:
  - node
  - express
  - postgres
  - api
---

Recently, I wanted to create and host a Node server, and discovered that [Heroku](https://heroku.com) is an excellent cloud platform service that has free hobby hosting for Node and PostgreSQL, among many other languages and databases.

This tutorial walks through creating a local REST API with Node using an Express server and PostgreSQL database. It also lists the instructions for deploying to Heroku.

#### Prerequisites

This guide uses installation instructions for macOS and assumes a prior knowledge of:

- [Command line usage](/how-to-use-the-command-line-for-apple-macos-and-linux/)
- [Basic JavaScript](/javascript-day-one/)
- [Basic Node.js and npm](/how-to-install-and-use-node-js-and-npm-mac-and-windows/)
- [SQL](/overview-of-sql-commands-and-pdo-operations/) and [PostgreSQL](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/)
- [Understanding REST/REST APIs](https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-understanding-rest-apis--cms-31697)

#### Goals

This walkthrough will have three parts:

- [Setting up a local **PostgreSQL database**](#set-up-postgresql-database)
- [Setting up a local **Node/Express API server**](#create-express-api)
- [Deploying the Node, Express, PostgreSQL API to **Heroku**](#deploy-app-to-heroku)

We'll create a local, simple REST API in Node.js that runs on an Express server and utilizes PostgreSQL for a database. Then we'll deploy it to Heroku.

I also have a few production tips for validation and rate limiting.

- [4. Production tips](#production-tips)

## Set Up PostgreSQL Database

We're going to:

- Install PostgreSQL
- Create a user
- Create a database, table, and entry to the table

This will be a very quick runthrough - if it's your first time using PostgreSQL, or Express, I recommend reading [Setting up a RESTful API with Node.js and PostgreSQL](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/).

Install and start PostgreSQL.

```bash
brew install postgresql
brew services start postgresql
```

Login to `postgres`.

```bash
psql postgres
```

Create a user and password and give them create database access.

```bash
CREATE ROLE api_user WITH LOGIN PASSWORD 'password';
ALTER ROLE api_user CREATEDB;
```

Log out of the root user and log in to the newly created user.

```bash
\q
psql -d postgres -U api_user
```

Create a `books_api` database and connect to it.

```sql
CREATE DATABASE books_api;
\c books_api
```

Create a `books` table with `ID`, `author`, and `title`.

```sql
CREATE TABLE books (
  ID SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);
```

Insert one entry into the new table.

```sql
INSERT INTO books (author, title)
VALUES  ('J.K. Rowling', 'Harry Potter');
```

## Create Express API

The Express API will set up an Express server and route to two endpoints, `GET` and `POST`.

Create the following files:

- `.env` - file containing environment variables (does not get version controlled)
- `package.json` - information about the project and dependencies
- `init.sql` - file to initialize PostgreSQL table
- `config.js` - will create the database connection
- `index.js` - the Express server

```bash
touch .env package.json init.sql config.js index.js
```

### Environment variables

Set your database user, password, host, port, and database name.

<div class="filename">.env</div>

```bash
DB_USER=api_user
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=books_api
```

### Database initialization

Create a file for initializing the table with an entry. We'll use this for the Heroku database.

<div class="filename">init.sql</div>

```sql
CREATE TABLE books (
  ID SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);

INSERT INTO books (author, title)
VALUES  ('J.K. Rowling', 'Harry Potter');
```

### Set up PostgreSQL connection

Use the [node-postgres](https://www.npmjs.com/package/pg) package to create a [Pool](https://node-postgres.com/api/pool), which will be used to make queries to the database.

Create a connection string that follows the pattern of `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`. I'll use the environment variables from `.env` using `process.env.VARIABLE`. Initializing with `require('dotenv').config()` will allow you to use those environment variables.

I've also created an `inProduction` string - in an environment like Heroku, `NODE_ENV` will be set to `production` so you can have different behavior between environments. Heroku will supply us with a string called `DATABASE_URL` for the connectionString, so we won't have to build a new one.

<div class="filename">config.js</div>

```js
require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

module.exports = { pool }
```

Set up the Express server. [Setting up a RESTful API with Node.js and PostgreSQL](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/) will go into much more detail on this process, and go through creating all the most important CRUD endpoints - `GET`, `POST`, `PUT`, and `DELETE`. I've purposely made this example very simple just to get a minimum viable product up and running.

### Set up Express server

<div class="filename">index.js</div>

```js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const getBooks = (request, response) => {
  pool.query('SELECT * FROM books', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addBook = (request, response) => {
  const { author, title } = request.body

  pool.query('INSERT INTO books (author, title) VALUES ($1, $2)', [author, title], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Book added.' })
  })
}

app
  .route('/books')
  // GET endpoint
  .get(getBooks)
  // POST endpoint
  .post(addBook)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})
```

### Dependencies

The `package.json` file will list your dependencies/devDependencies and other information.

- [express](https://www.npmjs.com/package/express) - web server framework
- [pg](https://www.npmjs.com/package/pg) - PostgreSQL client for Node
- [dotenv](https://www.npmjs.com/package/dotenv) - allows you to load environment variables from `.env` file
- [cors](https://www.npmjs.com/package/cors) - enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

We'll also install [nodemon](https://www.npmjs.com/package/nodemon) for development, which automatically restarts the server every time you make a change.

Don't forget to include the `engines` property for Node version.

<div class="filename">package.json</div>

```js
{
  "name": "books-api",
  "version": "1.0.0",
  "private": true,
  "description": "Books API",
  "main": "index.js",
  "engines": {
    "node": "11.x"
  },
  "scripts": {
    "start": "node index.js",
    "start:dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

Now you just need to install all the dependencies.

```bash
npm i cors dotenv express pg
npm i -D nodemon
```

Everything is set up, so you can run `npm start`, to start the server once, or `npm run start:dev` to restart the server after every change.

```
npm start
```

You can test the API by making a call to Postman:

![](../images/heroku1.png)

Or using cURL.

```bash
curl http://localhost:3002/books
# [{"id":1,"author":"J.K. Rowling","title":"Harry Potter"}]
```

> Don't know how to use Postman or cURL? Read [Making API Requests with Postman or cURL](/making-api-requests-postman-curl/).

## Deploy App to Heroku

Now we have everything working locally, so we can create a Heroku account, install Heroku CLI, and set up the app server and database server.

### Set up Heroku CLI and app

Go to [Heroku](https://heroku.com) and create an account.

Install Heroku CLI.

```bash
brew install heroku/brew/heroku
```

Login to Heroku CLI. This will open a browser window, which you can use to log in.

```bash
heroku login
```

Create app.

```bash
# this can be whatever you want, but must be unique
heroku create example-node-api
```

```terminal
Creating app... done, ⬢ example-node-api
https://<example-node-api>.herokuapp.com/ | https://git.heroku.com/<example-node-api>.git
```

If you don't pass a name, it will create a random one for you.

```bash
heroku create # generates random name
```

### Set up Heroku Postgres

Go to [Heroku Add-ons](https://elements.heroku.com/addons) and select [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql). Click on "Install Heroku Postgres". Click "Apply to app".

It might take up to 5 minutes to propagate. Once that time passes, check to see if your add-on exists via Heroku CLI.

```bash
heroku addons
```

```terminal
example-node-api  postgresql-whatever-00000  heroku-postgresql:hobby-dev  free   created
```

You'll see your new PostgreSQL instance as some autogenerated name like `postgresql-whatever-00000`.

Log into the Heroku PostgreSQL instance.

```bash
heroku pg:psql postgresql-whatever-00000 --app example-node-api
```

From the root of the project where you have `init.sql`, run the following command to create your table and entries on Heroku Postgres.

```bash
cat init.sql | heroku pg:psql postgresql-whatever-00000 --app example-node-api
```

### Test and deploy

At this point, everything should be set up and ready to go for Heroku. You can test this by running the following command:

```
heroku local web
```

With this, you can go to `http://localhost:5000/books` and see what your app will look like on Heroku.

If everything looks good, add, commit, and push to Heroku.

```bash
git add .
git commit -m "init"
git push heroku master
```

```terminal
-----> Launching... done
       http://<example-node-api>.herokuapp.com deployed to Heroku
```

## Production Tips

I'll list a few tips to help make your Node API a bit more secure and efficient in production.

- [helmet](https://www.npmjs.com/package/helmet) - secure HTTP headers in an Express app
- [compression](https://www.npmjs.com/package/compression) - compression middleware
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - limit repeated requests to endpoints
- [express-validator](https://www.npmjs.com/package/express-validator) - string validators and santizers

Let's bring in all the new dependencies.

<div class="filename">index.js</div>

```js
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { body, check } = require('express-validator')
```

### HTTP headers and compression

`helmet` and `compression` require no additional setup - they'll just add some helpful compression and HTTP header security.

```js
const app = express()

...

app.use(compression())
app.use(helmet())
```

### Securing CORS

We'll add some options to the [cors](https://www.npmjs.com/package/cors) library. When we used `cors()`, we made the app available for use from any browser. This is good for development because we'll be using `localhost`, but on production we only want our app to be accessed through our own domain.

<div class="filename">index.js</div>

```js
const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://www.example.com' : '*',
}

app.use(cors(origin))
```

Not that CORS protection _only_ applies to browsers - it does not protect your app from being accessed via cURL and Postman.

### Rate limiting

To help protect against brute force/DDoS attacks, we can limit the amount of requests using [express-rate-limit](https://www.npmjs.com/package/express-rate-limit). The `windowMs` determines the amount of time and `max` determines how many requests. Here I can say any client can only access any endpoint 5 times in 1 minute.

<div class="filename">index.js</div>

```js
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests,
})

app.use(limiter)
```

With `app.use()`, it will apply to every endpoint, but we can also make certain endpoints stricter with another `rateLimit`.

```js
const postLimiter = rateLimit({
  windowMs: 1 * 60 * 1000
  max: 1,
})

app.post('/books', postLimiter, addBook)
```

### Validation

If someone manages to send invalid data to the PostgreSQL database, the app can crash - for example, if more than 255 characters are sent to a `VARCHAR(255)` database entry. We can use [express-validator](https://www.npmjs.com/package/express-validator) to ensure any incoming request is valid, otherwise display an error.

```js
app.post(
  '/books',
  [
    check('author')
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 255 })
      .trim(),
    check('title')
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 255 })
      .trim(),
  ],
  postLimiter,
  (request, response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() })
    }

    const { author, title } = request.body

    pool.query('INSERT INTO books (author, title) VALUES ($1, $2)', [author, title], error => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'Book added.' })
    })
  }
)
```

### API Key

To secure your app, you might want to use [JSON Web Tokens (JWTs)](https://jwt.io/introduction/) to create an access token/refresh token which you would send as a header to the API. Implementing JWTs is a bit more of an involved process, but the simplest way you can restrict traffic to an endpoint is using an API key. This could be as simple as a key/value pair of header and value.

In Heroku, we can set an environment variable with `heroku config:set`.

```bash
heroku config:set API_KEY=hunter2
```

If the request to the endpoint does not contain the proper header, it can return an unauthorized error.

```js
const deleteBook = (request, response) => {
  if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
    return response.status(401).json({ status: 'error', message: 'Unauthorized.' })
  }
  // ...
}
```

With this code, it would be required to set headers with the request via Postman or cURL.

```bash
curl -X DELETE \
  https://<example-node-api>.herokuapp.com/books/1 \
  -H 'Content-Type: application/json' \
  -H 'ApiKey: hunter2'
```

## Using the API on the Front End

If you're not familiar with how to work with an API from the front end, read [How to Connect to an API with JavaScript](/how-to-connect-to-an-api-with-javascript/). As a quick review, here is how you can use the built-in [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API to do `GET` and `POST` requests to the endpoints.

### Get

```js
try {
  const response = await fetch('https://<example-node-api>.herokuapp.com/books')
  const books = await response.json()

  console.log(books)
} catch (error) {
  console.log(error)
}
```

### Post

```js
const newBook = {
  title: 'Game of Thrones',
  author: 'George R. R. Martin',
}

try {
  const response = await fetch('https://<example-node-api>.herokuapp.com/books', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(newBook),
  })
} catch (error) {
  console.log(error)
}
```

## Conclusion

This is all the steps required to set up a very basic Node, Express, and PostgreSQL REST API server and deploy it to Heroku. If anything about the app didn't make sense, I recommend reading I recommend reading [Setting up a RESTful API with Node.js and PostgreSQL](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/).
