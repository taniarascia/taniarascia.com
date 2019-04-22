---
date: 2017-04-14
title: 'Smooth Scroll to ID with jQuery'
template: post
thumbnail: '../thumbnails/jquery.png'
slug: smooth-scroll-to-id-with-jquery
categories:
  - JavaScript
tags:
  - javascript
  - jQuery
---

Here's a quick snippet of jQuery code I use often when I need to smoothly scroll to an ID. Just change the `500` to whatever speed (in milliseconds) you want the page to scroll at.

[View Demo](http://codepen.io/taniarascia/pen/MJEXZj)

```js
$('a[href*="#"]').on('click', function(e) {
  e.preventDefault()

  $('html, body').animate(
    {
      scrollTop: $($(this).attr('href')).offset().top,
    },
    500,
    'linear'
  )
})
```
