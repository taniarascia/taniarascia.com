---
date: 2018-03-06
title: 'How to Use the JavaScript Fetch API to Get JSON Data'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-use-the-javascript-fetch-api-to-get-json-data
categories:
  - JavaScript
tags:
  - api
  - javascript
---

In [How to Use JSON Data with PHP or JavaScript](/how-to-use-json-data-with-php-or-javascript/), I discussed how to use `XMLHttpRequest()` to get data from a JSON feed.

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a newer built-in feature of JavaScript that makes working with requests and responses easier.

```js
// Replace ./data.json with your JSON feed
fetch('./data.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
  })
  .catch(err => {
    // Do something for an error here
  })
```

Note that with Fetch, even a `404` or `500` error will not return an error. Only a network error or a request not completing will throw an error.
