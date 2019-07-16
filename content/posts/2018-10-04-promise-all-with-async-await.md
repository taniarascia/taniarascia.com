---
date: 2018-10-04
title: 'Promise.all with Async/Await'
template: post
thumbnail: '../thumbnails/clock.png'
slug: promise-all-with-async-await
categories:
  - JavaScript
tags:
  - async/await
  - es6
  - javascript
  - promise
---

Let's say I have an API call that returns all the users from a database and takes some amount of time to complete.

```js
// First promise returns an array after a delay
const getUsers = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve([{ id: 'jon' }, { id: 'andrey' }, { id: 'tania' }]), 600)
  })
}
```

Now there's another call that relies on some information that exists in the entire array of users.

```js
// Second promise relies on the result of first promise
const getIdFromUser = users => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(users.id), 500)
  })
}
```

And a third call that modifies the second call.

```js
// Third promise relies on the result of the second promise
const capitalizeIds = id => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(id.toUpperCase()), 200)
  })
}
```

I might try to run the first call, then use a `for...of` loop to run the subsequent calls that rely on it.

```js
const runAsyncFunctions = async () => {
  const users = await getUsers()

  for (let user of users) {
    const userId = await getIdFromUser(user)
    console.log(userId)

    const capitalizedId = await capitalizeIds(userId)
    console.log(capitalizedId)
  }

  console.log(users)
}

runAsyncFunctions()
```

However, this will be my output:

```terminal
jon
JON
andrey
ANDREY
tania
TANIA
(3) [{…}, {…}, {…}]
```

I can use `Promise.all()` instead to run all of the first, then all the second, then all the third functions.

```js
const runAsyncFunctions = async () => {
  const users = await getUsers()

  Promise.all(
    users.map(async user => {
      const userId = await getIdFromUser(user)
      console.log(userId)

      const capitalizedId = await capitalizeIds(userId)
      console.log(capitalizedId)
    })
  )

  console.log(users)
}
```

```terminal
(3) [{…}, {…}, {…}]
jon
andrey
tania
JON
ANDREY
TANIA
```

Hope that helps someone.

Here's the whole snippet you can run in the console.

```js
// First promise returns an array
const getUsers = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve([{ id: 'jon' }, { id: 'andrey' }, { id: 'tania' }]), 600)
  })
}

// Second promise relies on the resulting array of first promise
const getIdFromUser = users => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(users.id), 500)
  })
}

// Third promise relies on the result of the second promise
const capitalizeIds = id => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(id.toUpperCase()), 200)
  })
}

const runAsyncFunctions = async () => {
  const users = await getUsers()

  Promise.all(
    users.map(async user => {
      const userId = await getIdFromUser(user)
      console.log(userId)

      const capitalizedId = await capitalizeIds(userId)
      console.log(capitalizedId)
    })
  )

  console.log(users)
}

runAsyncFunctions()
```
