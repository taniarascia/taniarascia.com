---
date: 2018-04-09
title: 'How to Paginate an Array in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-paginate-an-array-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - pagination
---

I wanted to take an array of URLs in JavaScript and be able to paginate to the correct one by clicking on the previous and next buttons.

Here's the HTML code.

```html
<button id="behind"></button> <button id="forward"></button>
```

And the JavaScript, modified from an answer on [this StackOverflow post](https://codereview.stackexchange.com/questions/132397/prev-next-buttons-for-a-circular-list).

```js
var host = 'https://' + document.location.hostname
var pages = [host + '/index.html', host + '/index2.html', host + '/index3.html']

var behind = document.getElementById('behind')
var forward = document.getElementById('forward')

function prev(current, pages) {
  var index = pages.indexOf(current)
  if (index === 0) {
    return pages[pages.length - 1]
  }
  return pages[index - 1]
}

function next(current, pages) {
  var index = pages.indexOf(current)
  if (index === pages.length - 1) {
    return pages[0]
  }
  return pages[index + 1]
}

behind.addEventListener('click', function() {
  var newUrl = prev(host + window.location.pathname, pages)
  window.location.href = newUrl
})

forward.addEventListener('click', function() {
  var newUrl = next(host + window.location.pathname, pages)
  window.location.href = newUrl
})
```
