---
date: 2017-02-08
title: 'How to Use jQuery, a JavaScript Library'
template: post
thumbnail: '../thumbnails/jquery.png'
slug: how-to-use-jquery-a-javascript-library
categories:
  - JavaScript
tags:
  - javascript
  - jquery
---

### Introduction

HTML, CSS, and JavaScript are the three fundamental languages of the web. We structure our websites with HTML, style them with CSS, and add interactive functionality with JavaScript. Most animations and any action that happens as a result of a user clicking, hovering, or scrolling are utilized with JavaScript.

[jQuery](https://jquery.com/) is the "Write Less, Do More" JavaScript library. It is not a programming language, but rather a tool used to vastly simplify writing common JavaScript tasks. jQuery has the added benefit of being [cross-browser compatibile](https://jquery.com/browser-support/), meaning you can be certain the output of your code will render as intended in any modern browser.

By comparing a simple "Hello, World!" example in both languages, we can see the difference of how JavaScript and jQuery are written.

```js
document.getElementById('demo').innerHTML = 'Hello, World!'
```

```js
$('#demo').html('Hello, World!')
```

As you can see, jQuery can be easier to read and write than plain JavaScript.

## Goals

This guide assumes no prior knowlegde of jQuery, will cover the following topics:

- Learn how to install jQuery in a web project.
- Learn the definitions of important web development concepts such as API, DOM, and CDN.
- Review common jQuery selectors.
- Learn about jQuery events and effects, and make some simple, functional examples.

## Prerequisites

Before you begin this guide you'll need the following:

- A basic knowledge of HTML and CSS. You should already know how to set up a simple website, and have an understanding of CSS selectors such as ids, classes, and pseudo elements.
- An understanding of the fundamentals of programming. While it is possible to begin writing jQuery without an advanced knowledge of JavaScript, familiarity with the concepts of [variables and datatypes](/javascript-day-one/) as well as [math and logic](/javascript-day-two/) will help significantly.

## Installing jQuery

jQuery is simply a JavaScript file that you will link to in your HTML. There are two ways to include jQuery in a project: by downloading a local copy, or linking to a file via CDN.

If you wish to download it, you can [get a copy from the official website](https://jquery.com/download/). However, it's even easier to link to a copy from [Google's Hosted Libraries](https://developers.google.com/speed/libraries/).

> **Note**: A **Content Delivery Network** (CDN) is a system of multiple servers that deliver web content to a user based on geographical location. When you link to Google's hosted jQuery, the file will potentially arrive faster and more efficiently to the user than if you hosted it on your own server.

To begin, make an HTML skeleton.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>jQuery Demo</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>

  <body></body>
</html>
```

Link to the jQuery CDN right before the closing `</body>` tag, followed by your own custom JavaScript file, `scripts.js`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>jQuery Demo</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>

  <body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="js/scripts.js"></script>
  </body>
</html>
```

> **Warning:** Your JavaScript file must be included _below_ the jQuery library in the document or it will not work. If you used a local copy, just link to **js/jquery.min.js**, or whatever the path to your file is.

At this point, the jQuery library is now being loaded into your site, and you have full access to the [jQuery API](http://api.jquery.com/).

> **Note:** An **Application Protocol Interface** (API) is an interface that allows software programs to interact with each other. In this case, the API for jQuery contains all the information and documentation you need to access jQuery.

## Using jQuery

At its core, jQuery is used to connect with HTML elements in the browser via the DOM.

The **Document Object Model** (DOM) is the method by which JavaScript (and jQuery) interract with the HTML in a browser. To view exactly what the DOM is, right click on the page in the browser and select **Inspect**. The HTML code you see there is the DOM. Each HTML element is considered a **node** in the DOM - an object that JavaScript can touch. JavaScript can add, remove, and change any of these elements.

The outermost layer of the DOM is the **document** object. To begin manipulating the page with jQuery, we need to ensure the document is "ready" first.

In your JavaScript file **scripts.js**, type the following code.

```js
$(document).ready(function() {
  // all custom jQuery will go here
})
```

Your entire file will be wrapped in the above code, and any custom jQuery you write will be contained within. To reduce the amount of code in these examples, assume that all HTML code is placed within the `<body>` tags, and all jQuery is wrapped in the above `ready()` method.

In the introduction of this article, we saw a simple "Hello, World!" script. To initiate this script and print text to the browser with jQuery, first we'll create an empty block-level element with the id `demo` applied to it.

```html
<p id="demo"></p>
```

jQuery is called with and represented by the dollar sign (`$`). We access the DOM with jQuery using mostly CSS syntax, and apply an action with a method. A basic jQuery example follows this format.

```js
$('selector').method()
```

Since an id is represented by a hash symbol (`#`) in CSS, we will access the demo id with the selector `#demo`. `html()` is a method that changes the HTML within an element.

```js
$('#demo').html('Hello, World!')
```

The code executes as soon as the document is ready. If everything worked properly, the DOM will now display `<p id="demo">Hello, World!</p>`.

> **Note:** In programming, "Hello World!" is a simple program that prints (displays) some text. It is generally the first program you will create when working in a new environment, to test and ensure everything is set up and working properly.
> <\$>

## Selectors

Most jQuery selectors are the same as what we use in CSS, with some jQuery-specific additions. The full list of jQuery selectors [can be found here](https://api.jquery.com/category/selectors/).

Below is a brief overview of some of the most commonly used selectors.

- `$("*")` - **Wildcard:** selects every element.
- `$(this)` - **Current:** selects the current element being operated on within a function.
- `$("p")` - **Element:** selects every instance of the `<p>` tag.
- `$(".example")` - **Class:** selects every element that has the `example` class applied to it.
- `$("#example")` - **Id:** selects a single instance of the unique `example` id.
- `$("[type='text']")` - **Attribute:** selects any element with `text` applied to the `type` attribute.
- `$("p:first-of-type")` - **Pseudo Element:** selects the first `<p>`.

Generally, classes and ids are what you will encounter the most - classes when you want to select multiple elements, and ids when you want to select only one.

## jQuery Events

In the "Hello, World!" example, the code ran as soon as the page loaded and the document was ready, and therefore required no user interaction. Clearly in this case, we could have easily written the text directly into the HTML without bothering with jQuery.

However, we'll need to utilize jQuery if we want to make text appear on the page with the click of a button. We can add a button to our HTML to trigger the event.

```html
<button id="trigger">Click me</button>
<p id="demo"></p>
```

Now we can use the `click()` method to call a function containing our "Hello, World!" code.

```js
$('#trigger').click(function() {
  $('#demo').html('Hello, World!')
})
```

If everything went smoothly, clicking the button will make the text appear.

A full list of jQuery event methods [can be found here](https://api.jquery.com/category/events/). An **event** is any time the user interacts with the browser. We just learned [click()](https://api.jquery.com/click/), which executes on a single mouse click.

Below is a brief overview of some of the most commonly used event methods.

- [hover()](https://api.jquery.com/hover/) - **Hover** executes when the mouse is hovered over an element. [mouseenter()](https://api.jquery.com/mouseenter/) and [mouseleave()](https://api.jquery.com/mouseleave/) apply only to the mouse entering or leaving an element, respectively.
- [submit()](https://api.jquery.com/submit/) - **Submit** executes when a form is submitted.
- [scroll()](https://api.jquery.com/scroll/) - **Scroll** executes when the screen is scrolled.

- [keydown()](https://api.jquery.com/keydown/) - **Keydown** executes when you press down on a key on the keyboard.

## jQuery Effects

[jQuery effects](http://api.jquery.com/category/effects/) work hand-in-hand with events by easily allowing you to add animations and otherwise manipulate elements on the page.

We will make an example where we open and close an overlay/popup modal. While we could use two ids - one to open the modal and another to close it - we'll insteas use a class to easily open and close the modal with the same function.

```html
<button class="trigger">Open</button>

<section class="overlay">
  <button class="trigger">Close</button>
</section>
```

We'll use a minimal amount of CSS to hide the `overlay` with `display: none` and center it on the screen.

```css
.overlay {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 200px;
  width: 200px;
  background: gray;
}
```

Finally, we're going to use the `toggle()` method, which will toggle the CSS `display` property between `none` and `block`, hiding and showing the overlay when clicked.

```js
$('.trigger').click(function() {
  $('.overlay').toggle()
})
```

You will now be able to toggle the visibility of the modal by clicking on the buttons. You can change `toggle()` to `fadeToggle()` or `slideToggle()` to see a few other built-in jQuery effects.

Below is a brief overview of some of the most commonly used effect methods.

- [toggle()](https://api.jquery.com/toggle/) - **Toggle** toggles the visibility of an element or elements. [show()](https://api.jquery.com/show/) and [hide()](https://api.jquery.com/hide/) are the related one-way effects.
- [fadeToggle()](https://api.jquery.com/fadetoggle/) - **Fade Toggle** toggles the visibility and animates the opacity of an element or elements. [fadeIn()](https://api.jquery.com/fadein/) and [fadeOut()](https://api.jquery.com/fadeout/) are the related one-way effects.
- [slideToggle()](https://api.jquery.com/slidetoggle/) - **Slide Toggle** toggles the visibility of an element or elements with a sliding effect. [slideDown()](https://api.jquery.com/slidedown/) and [slideup()](https://api.jquery.com/slideup) are the related one-way effects.
- [animate()](http://api.jquery.com/animate/) - **Animate** performs custom animation effects on the CSS property of an element.

## Conclusion

In this guide, we learned about a lot of very important web development concepts, including the definition of API, CDN, and the DOM. We also learned how to select and manipulate elements with jQuery, and how events and effects work together to make an interactive web experience for the user.

From here, you should have a deeper understanding of the capabilities of jQuery, and be on your way to writing your own code.
