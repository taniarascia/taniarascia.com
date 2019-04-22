---
date: 2016-04-09
title: 'Parallax Scroll Effect'
template: post
thumbnail: '../thumbnails/js.png'
slug: parallax-scroll-effect
categories:
  - CSS
tags:
  - jQuery
  - parallax
---

Parallax scrolling, an effect that allows sections of a website to scroll at different speeds, is an effect that has gone through various stages of popularity over the last few years. I’m not going to debate the usefulness or trendiness of parallax scrolling here, I’m simply going to show you how to do it.

There’s a popular plugin called [parallax.js](http://pixelcog.github.io/parallax.js/) that can quickly and easily take care of your parallax needs if you choose to use it. However, this plugin has a lot of features you might not use, and we can get the core functionality of parallax in about 100 bytes if we write our own code (down from 11 KB). All you need is a a containing element, a contained element with a background image, and a few lines of jQuery.

#### Goals

Create a simple parallax effect using CSS and JavaScript and no plugins.

[View the Demo](http://codepen.io/taniarascia/full/mPpZZM/)

See the Pen [Parallax Scroll Effect](http://codepen.io/taniarascia/pen/mPpZZM/)

## Container

We’re going to create a outer element and call it `.parallax-container`. This class simply sets the height of the parallax window. We’re going to set it to `position: relative`.

```css
.parallax-container {
  position: relative;
  height: 500px;
}
```

## Image

Now we’re going to create an inner div that will contain the actual parallax background image. The div will be set to `position: absolute`, which means it will become attached to the nearest relative element (which in this case is the `parallax-container`).

```css
.parallax {
  position: absolute;
  height: 200%;
  width: 100%;
  z-index: -1;
}
```

The variable in this class is `height: 200%` - you can play around with it and make it bigger or smaller depending on how you want the image to look. We have to apply a `width: 100%` since the element is now absolute. Finally, a negative `z-index` needs to be set so that the image remains contained to the height of `parallax-container`.

## Content

All HTML layout elements have a transparent background by default. If you choose to use parallax, simply setting your background color on the `body` element won’t be enough anymore - you’ll have to place all of your non-parallax content inside of elements with a background color. I’m going to create a `.content` class that simply has a background color so that my content will always appear over the parallax image.

```css
.content {
  background: #fff;
  height: 600px; /* This height is only for 
      demonstration purposes since I have no content. 
      It's not necessary for the code to work. */
}
```

## Putting it Together

I’m going to create a top and bottom empty section to create scroll for demonstration purposes.

```html
<section class="content"></section>
```

On the `.parallax` div, I edit the style attribute and add a background image.

```html
<section class="parallax-container">
  <div class="parallax" style="background: url(image.jpg) center center / cover no-repeat;"></div>
</section>
```

The background image will be horizontally and vertically centered in the div, cover the entire div, and not repeat.

Here’s the final HTML:

```html
<section class="content"></section>

<section class="parallax-container">
  <div class="parallax" style="background: url(image.jpg) center center / cover no-repeat;"></div>
</section>

<section class="content"></section>
```

## JavaScript

First, I’m utilizing jQuery, so we’ll link to it.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
```

We're going to create a variable for the `parallax` class, and count all instances using `.length`.

```js
var parallaxElements = $('.parallax'),
  parallaxQuantity = parallaxElements.length
// more...
```

Next, we'll create a `scroll` function.

```js
var parallaxElements = $('.parallax'),
  parallaxQuantity = parallaxElements.length

$(window).on('scroll', function() {
  // more...
})
```

Let the browser know that we're going to do an animation with [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

```js
var parallaxElements = $('.parallax'),
  parallaxQuantity = parallaxElements.length

$(window).on('scroll', function() {
  window.requestAnimationFrame(function() {
    // more...
  })
})
```

Create a for loop, capturing each parallax element in `currentElement`, and how much has been scrolled with `scrolled`.

```js
var parallaxElements = $('.parallax'),
  parallaxQuantity = parallaxElements.length

$(window).on('scroll', function() {
  window.requestAnimationFrame(function() {
    for (var i = 0; i < parallaxQuantity; i++) {
      var currentElement = parallaxElements.eq(i)
      var scrolled = $(window).scrollTop()
      // more...
    }
  })
})
```

Finally, multiply how much has been scrolled with a negative pixel value, and apply that to the `transform: translate3D` of the CSS of the individual parallax element.

```js
var parallaxElements = $('.parallax'),
  parallaxQuantity = parallaxElements.length

$(window).on('scroll', function() {
  window.requestAnimationFrame(function() {
    for (var i = 0; i < parallaxQuantity; i++) {
      var currentElement = parallaxElements.eq(i)
      var scrolled = $(window).scrollTop()

      currentElement.css({
        transform: 'translate3d(0,' + scrolled * -0.3 + 'px, 0)',
      })
    }
  })
})
```

## Conclusion

Everything that seems complicated can be broken down and simplified. The first time I wanted to use parallax, I used a plugin, but I don’t feel like I learned anything or gained any additional understanding of how it works. Think about any code you might use and not understand, and see if you can create a simplified version of it. In the end, not only will you have learned something, but you’re code will be leaner and faster.

I'm not a fan of including parallax on mobile, so I would add an `if` statement on the jQuery and a `@media` query on the CSS to only allow parallax after a certain screen width.

[View the Demo](http://codepen.io/taniarascia/full/mPpZZM/)
