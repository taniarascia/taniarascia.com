---
date: 2018-08-08
title: 'How to Promisify an Ajax Call'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-promisify-an-ajax-call
categories:
  - JavaScript
tags:
  - es6
  - javascript
  - jQuery
  - promise
---

Let's say you have an AJAX call, and some other function that depends on the AJAX call loading before it runs.

Here's the AJAX function.

```js
function doTheThing() {
  $.ajax({
    url: window.location.href,
    type: 'POST',
    data: {
      key: 'value',
    },
    success: function(data) {
      console.log(data)
    },
    error: function(error) {
      console.log(error)
    },
  })
}
```

And you might call the two functions in succession, and find that the second function doesn't work, because it depends on the first one.

```js
doTheThing()
doSomethingElse()
```

We can quickly and easily rewrite this with a `Promise`

```js
function doTheThing() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: window.location.href,
      type: 'POST',
      data: {
        key: 'value',
      },
      success: function(data) {
        resolve(data)
      },
      error: function(error) {
        reject(error)
      },
    })
  })
}
```

Now we can do the AJAX call, run the success function, and follow it up with any subsequent code.

```js
doTheThing()
  .then(data => {
    console.log(data)
    doSomethingElse()
  })
  .catch(error => {
    console.log(error)
  })
```

And that's it!
