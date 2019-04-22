---
date: 2017-02-23
title: 'Simple jQuery Examples with Code and Demos'
template: post
thumbnail: '../thumbnails/jquery.png'
slug: simple-jquery-examples-with-code-and-demos
categories:
  - JavaScript
tags:
  - javascript
  - jQuery
---

Recently, I wrote a beginner's guide to [using and understanding jQuery](https://www.digitalocean.com/community/tutorials/an-introduction-to-jquery) for [Digital Ocean](https://www.digitalocean.com/). I found the official jQuery documentation difficult to understand, especially for beginners who only know HTML and CSS. My intent was to make a simple, easy to follow tutorial to introduce the concept of jQuery.

When I first started learning, I would often want to do something simple and common with jQuery, but when I searched I'd find code samples that were very complicated or confusing. Below, I've compiled a few examples, with and without CSS styling, for a some common jQuery tasks: accordions, tabs, popups, dropdowns, and navigation that changes when you scroll to an ID. The non-stylized examples will only have the CSS required to make the demo function.

If you don't know how to use jQuery at all, please read the Introduction to jQuery article first. The embedded demos might not display perfectly on a mobile device, so it's better to view this post on desktop, or open the demos separately.

## Accordion

An accordion is a list of headers that open and collapse more content when clicked. I chose to make my example have each section stay open when you click, but some versions only have one content panel open at a time. I may have a [slight affinity](/music/) for the word accordion in general...

- [Style](http://codepen.io/taniarascia/pen/BpwOKZ/)
- [No Style](http://codepen.io/taniarascia/pen/qRPxwo)

```js
// Clicking on the accordion header title...
$('.accordion').on('click', '.accordion-header', function() {
  // will (slide) toggle the related panel.
  $(this)
    .toggleClass('active')
    .next()
    .slideToggle()
})
```

## Tabs

Tabs are a form of navigation that switches the content inside a panel. I had a little fun with the style in the demo, but usually they resemble the tabs you might see on a Manila folder.

- [Style](http://codepen.io/taniarascia/pen/EZwdNg/)
- [No Style](http://codepen.io/taniarascia/pen/dNVKbW)

```js
// Clicking on the tab...
$('.tab-list').on('click', '.tab', function(e) {
  e.preventDefault()

  // will remove all active classes from the tabs...
  $('.tab').removeClass('active')
  // will hide all tab content...
  $('.tab-content').removeClass('show')

  // and will activate the current tab and content.
  $(this).addClass('active')
  $($(this).attr('href')).addClass('show')
})
```

## Dropdown

A dropdown is a menu that toggles when you click on it. It's usually indicated by a downward facing arrow.

- [Style](http://codepen.io/taniarascia/pen/VPraQy/)
- [No Style](http://codepen.io/taniarascia/pen/JEOGQG)

```js
// Clicking away from the dropdown will collapse it.
$('html').click(function() {
  $('.dropdown').hide()
})

// Any nav item that is not an only child...
$('nav ul li a:not(:only-child)').click(function(e) {
  // will be toggled.
  $(this)
    .siblings('.dropdown')
    .toggle()

  // Opening a new dropdown will collapse any other dropdown.
  $('.dropdown')
    .not($(this).siblings())
    .hide()

  e.stopPropagation()
})
```

## Popup Modal

A modal is a dialog box that pops up on the screen, usually blocking access to rest of the content until you interact with it in some way. This is often used like an updated `alert()` function.

- [Style](http://codepen.io/taniarascia/pen/qRVRjy/)
- [No Style](http://codepen.io/taniarascia/pen/ZeEvBM)

```js
// Clicking the open class will open the modal.
$('.open').on('click', function() {
  $('.overlay, .modal').addClass('active')
})

// Clicking the close class will close it.
$('.close, .overlay').on('click', function() {
  $('.overlay, .modal').removeClass('active')
})

// Pressing the escape key will also close the modal.
$(document).keyup(function(e) {
  if (e.keyCode === 27) {
    $('.overlay, .modal').removeClass('active')
  }
})
```

## Change on Scroll

Sometimes you might want to change an element (in this case, the navigation) after scrolling to a certain point. You might want to change th color, or shrink the nav, or make it stick to the top.

- [Style](http://codepen.io/taniarascia/pen/jyGepE/)
- [No Style](http://codepen.io/taniarascia/pen/LxzBqo)

```js
// Activates when you scroll.
$(window).on('scroll', function() {
  var position = $('#begin').offset()

  // If the top of the screen is greater than the #begin element.
  if ($(window).scrollTop() > position.top - 80) {
    // 80 pixels is the height of my navigation.
    // activate your class.
    $('nav').addClass('active')
  } else {
    // otherwise remove it.
    $('nav').removeClass('active')
  }
})
```

## Bonus

Here are two more examples that I was too lazy to stylize.

- [Smooth Scroll to an ID](http://codepen.io/taniarascia/pen/MJEXZj)
- [Simple Image Slider](https://codepen.io/taniarascia/pen/eKzXwr)

## Conclusion

I hope you found this group of demos fun and helpful. I believe everything can be simplified, and it's helpful to make visual examples without styles when you're learning. I might make some more examples in the future if it gets a positive reception.
