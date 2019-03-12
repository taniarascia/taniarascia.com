---
date: 2017-02-08
title: 'How to Use jQuery, a JavaScript Library'
template: post
thumbnail: './thumbnail.png'
slug: how-to-use-jquery-a-javascript-library/
categories:
  - JavaScript
  - Tutorials
  - Web
tags:
  - javascript
  - jQuery
---

_I originally wrote this article for [Digital Ocean](https://www.digitalocean.com/) Community Tutorials - [An Introduction to jQuery](https://www.digitalocean.com/community/tutorials/an-introduction-to-jquery)._

HTML, CSS, and JavaScript are the three fundamental languages of the web. We structure our websites with HTML, style them with CSS, and add interactive functionality with JavaScript. In fact, most animations and any action that happens as a result of a user clicking, hovering, or scrolling are constructed with JavaScript.

[jQuery](https://jquery.com/) is the "Write Less, Do More" JavaScript library. It is not a programming language, but rather a tool used to make writing common JavaScript tasks more concise. jQuery has the added benefit of being [cross-browser compatible](https://jquery.com/browser-support/), meaning you can be certain the output of your code will render as intended in any modern browser.

By comparing a simple "Hello, World!" program in both JavaScript and jQuery, we can see the difference of how they're both written.

##### JavaScript

    <code class="language-javascript">document.getElementById("demo").innerHTML = "Hello, World!";

```






##### jQuery





    <code class="language-javascript">$("#demo").html("Hello, World!");
```

This short example demonstrates how jQuery can achieve the same end result as plain JavaScript in a succinct manner.

#### Goals

This guide assumes no prior knowledge of jQuery, and will cover the following topics:

      * How to install jQuery in a web project.
      * The definitions of important web development concepts such as API, DOM, and CDN.
      * Common jQuery selectors, events, and effects.
      * Examples to test the concepts learned throughout the article.

#### Prerequisites

Before you begin this guide you'll need the following:

      * A basic knowledge of HTML and CSS. You should already know how to set up a simple website, and have an understanding of CSS selectors such as ids, classes, and pseudo elements.
      * An understanding of the fundamentals of programming. While it is possible to begin writing jQuery without an advanced knowledge of JavaScript, familiarity with the concepts of [variables and datatypes](https://www.taniarascia.com/javascript-day-one/) as well as [math and logic](https://www.taniarascia.com/javascript-day-two/) will help significantly.

## Setting Up jQuery

jQuery is a JavaScript file that you will link to in your HTML. There are two ways to include jQuery in a project:

      * Download a local copy.
      * Link to a file via Content Delivery Network (CDN).

>

    **Note**: A **Content Delivery Network** (CDN) is a system of multiple servers that deliver web content to a user based on geographical location. When you link to a hosted jQuery file via CDN, it will potentially arrive faster and more efficiently to the user than if you hosted it on your own server.

We'll be using the CDN to reference jQuery in our examples. You can find the latest version of jQuery in [Google's Hosted Libraries](https://developers.google.com/speed/libraries/). If instead you wish to download it, you can [get a copy of jQuery from the official website](https://jquery.com/download/).

We will begin this exercise by creating a small web project. It will consist of `style.css` in the `css/` directory, `scripts.js` in the `js/` directory, and a main `index.html` in the root of the project.

    <code class="language-none">project/
    |-- css/
    |  |-- style.css
    |-- js/
    |  |-- scripts.js
    |-- index.html

```


To begin, make an HTML skeleton and save it as `index.html`.



```html
<!doctype html>
    <html lang="en">

    <head>
      <title>jQuery Demo</title>
      <link rel="stylesheet" href="css/style.css">
    </head>

    <body>
    </body>

    </html>
```

Link to the jQuery CDN right before the closing `</body>` tag, followed by your own custom JavaScript file, `scripts.js`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>jQuery Demo</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>

  <body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="js/scripts.js"></script>
  </body>
</html>
```

Your JavaScript file (`scripts.js`) must be included _below_ the jQuery library in the document or it will not work.

>

    **Note:** If you downloaded a local copy of jQuery, save it in your `js/` folder and link to it at `js/jquery.min.js`.

At this point, the jQuery library is now being loaded into your site, and you have full access to the [jQuery API](http://api.jquery.com/).

>

    **Note:** An **Application Programming Interface** (API) is an interface that allows software programs to interact with each other. In this case, the API for jQuery contains all the information and documentation needed to access jQuery.

## Using jQuery

At its core, jQuery is used to connect with HTML elements in the browser via the DOM. The **Document Object Model** (DOM) is the method by which JavaScript (and jQuery) interact with the HTML in a browser. To view exactly what the DOM is, in your web browser, right click on the current web page select **Inspect**. This will open up Developer Tools. The HTML code you see here is the DOM.

Each HTML element is considered a **node** in the DOM - an object that JavaScript can touch. These objects are arranged in a tree structure, with `<html>` being closer to the root, and each nested element being a branch further along the tree. JavaScript can add, remove, and change any of these elements.

If you right click on the site again and click **View Page Source**, you will see the raw HTML output of the website. It's easy at first to confuse the DOM with the HTML source, but they're different - the page source is exactly what is written in the HTML file. It is static and will not change, and will not be affected by JavaScript. The DOM is dynamic, and can change.

The outermost layer of the DOM, the layer that wraps the entire `<html>` node, is the **document** object. To begin manipulating the page with jQuery, we need to ensure the document is "ready" first. Create the file `scripts.js` in your `js/` directory, and type the following code:

    <code class="language-javascript">$(document).ready(function() {
        // all custom jQuery will go here
    });

```




All jQuery code you write will be wrapped in the above code. jQuery will detect this state of readiness so that code included inside this function will only run once the DOM is ready for JavaScript code to execute. Even if in some cases JavaScript won't be loaded until elements are rendered, including this block is considered to be best practice.

In the introduction of this article, you saw a simple "Hello, World!" script. To initiate this script and print text to the browser with jQuery, first we'll create an empty block-level paragraph element with the ID `demo` applied to it.



```html
...
    <body>

    <p id="demo"></p>
    ...
```

jQuery is called with and represented by the dollar sign (`$`). We access the DOM with jQuery using mostly CSS syntax, and apply an action with a method. A basic jQuery example follows this format.

    <code class="language-javascript">$("selector").method();

```


Since an ID is represented by a hash symbol (`#`) in CSS, we will access the demo ID with the selector `#demo`. `html()` is a method that changes the HTML within an element.

We're now going to put our custom "Hello, World!" program inside the jQuery `ready()` wrapper. Add this line to your `scripts.js` file within the existing function:



    <code class="language-javascript">$(document).ready(function() {
        $("#demo").html("Hello, World!");
    });
```

Once you've saved the file, you can open your `index.html` file in your browser. If everything worked properly, you will see the output `Hello, World!`.

If you were confused by the DOM before, you can see it in action now. Right click on the "Hello, World!" text on the page and choose **Inspect Element**. The DOM will now display `<p id="demo">Hello, World!</p>`. If you **View Page Source**, you will only see `<p id="demo"></p>`, the raw HTML we wrote.

## Selectors

Selectors are how we tell jQuery which elements we want to work on. Most jQuery selectors are the same as what you're familiar with in CSS, with a few jQuery-specific additions. You can view [the full list of jQuery selectors](https://api.jquery.com/category/selectors/) on their official documentation pages. To access a selector, use the jQuery symbol `$`, followed by parentheses `()`.

    <code class="language-javascript">$("selector")

```


Double-quoted strings are preferred by the [jQuery style guide](https://contribute.jquery.org/style-guide/js/), though single-quoted strings are often used as well. Below is a brief overview of some of the most commonly used selectors.

<table >
	<tr >
		Selector
		Name
		Description
	</tr>
	<tr >

<td >`$("*")`
</td>

<td >Wildcard
</td>

<td >selects every element on the page.
</td>
	</tr>
	<tr >

<td >
			`$(this)`

</td>

<td >
			Current

</td>

<td >selects the current element being operated on within a function.
</td>
	</tr>
	<tr >

<td >
			`$("p")`

</td>

<td >
			Tag

</td>

<td >selects every instance of the `<p>` tag.
</td>
	</tr>
	<tr >

<td >
			`$(".example")`

</td>

<td >
			Class

</td>

<td >selects _every_ element that has the `example` class applied to it.
</td>
	</tr>
	<tr >

<td >
			`$("#example")`

</td>

<td >
			Id

</td>

<td >selects a _single instance_ of the unique `example` id.
</td>
	</tr>
	<tr >

<td >
			`$("[type='text']")`

</td>

<td >
			Attribute

</td>

<td >selects any element with `text` apptred to the `type` attribute.
</td>
	</tr>
	<tr >

<td >`$("p:first-of-type")`
</td>

<td >
			Pseudo Element

</td>

<td >selects the first `<p>`.
</td>
	</tr>
</table>

Generally, classes and ids are what you will encounter the most — classes when you want to select multiple elements, and ids when you want to select only one.



## jQuery Events



In the "Hello, World!" example, the code ran as soon as the page loaded and the document was ready, and therefore required no user interaction. In this case, we could have written the text directly into the HTML without bothering with jQuery. However, we will need to utilize jQuery if we want to make text appear on the page with the click of a button. Return to your `index.html` file and add a `<button>` element. We will use this button to listen for our click event.



```html
...
    <body>

    <button id="trigger">Click me</button>
    <p id="demo"></p>
```

We will use the `click()` method to call a function containing our "Hello, World!" code.

    <code class="language-javascript">$(document).ready(function() {
        $("#trigger").click();
    });

```


Our `<button>` element has an ID called `trigger`, which we select with `$("#trigger")`. By adding `click()`, we're telling it to listen for a click event, but we're not done yet. Now we'll invoke a function that contains our code, inside the `click()` method.



    <code class="language-javascript">function() {
        $("#demo").html("Hello, World!");
    }
```

Here's the final code.

    <code class="language-javascript">$(document).ready(function() {
        $("#trigger").click(function() {
            $("#demo").html("Hello, World!");
        });
    });

```




Save the `scripts.js` file, and refresh `index.html` in the browser. Now when you click the button, the "Hello, World!" text will appear. An **event** is any time the user interacts with the browser. Usually this is done with the mouse or keyboard. The example we just created used a click event. From the official jQuery documentation, you can view [a full list of jQuery event methods](https://api.jquery.com/category/events/). Below is a brief overview of some of the most commonly used event methods.

<table >
	<tr >
		Method
		Name
		Description
	</tr>
	<tr >

<td >`click()`
</td>

<td >Click
</td>

<td >executes on a single mouse click.
</td>
	</tr>
	<tr >

<td >
			`hover()`

</td>

<td >
			Hover

</td>

<td > executes when the mouse is hovered over an element. `mouseenter()` and `mouseleave()` apply only to the mouse entering or leaving an element, respectively.
</td>
	</tr>
	<tr >

<td >
			`submit()`

</td>

<td >
			Submit

</td>

<td >executes when a form is submitted.
</td>
	</tr>
		<tr >

<td >
			`scroll()`

</td>

<td >
			Scroll

</td>

<td >executes when the screen is scrolled.
</td>
	</tr>
		<tr >

<td >
			`keydown()`

</td>

<td >
			Keydown

</td>

<td >executes when you press down on a key on the keyboard.
</td>
	</tr>

</table>

To make images animate or fade in as a user scrolls down the screen, use the `scroll()` method. To exit a menu using the `ESC` key, use the `keydown()` method. To make a dropdown accordion menu, use the `click()` method. Understanding events is essential to creating dynamic website content with jQuery.



## jQuery Effects



[jQuery effects](http://api.jquery.com/category/effects/) work hand-in-hand with events by allowing you to add animations and otherwise manipulate elements on the page. We will make an example where we open and close a popup overlay. While we could use two IDs - one to open the overlay and another to close it - we'll instead use a class to open and close the overlay with the same function.

Delete the current `<button>`and `<p>` tags from within the body of your `index.html` file, and add the following to your HTML document:



```html
...
    <body>
    <button class="trigger">Open</button>

    <section class="overlay">
      <button class="trigger">Close</button>
    </section>
    ...
```

In our `style.css` file, we will use a minimal amount of CSS to hide the `overlay` with `display: none` and center it on the screen.

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

Back in the `scripts.js` file, we're going to use the `toggle()` method, which will toggle the CSS `display` property between `none` and `block`, hiding and showing the overlay when clicked.

    <code class="language-javascript">$(document).ready(function() {
        $(".trigger").click(function() {
            $(".overlay").toggle();
        });
    });

```


Refresh `index.html`. You will now be able to toggle the visibility of the modal by clicking on the buttons. You can change `toggle()` to `fadeToggle()` or `slideToggle()` to see a few other built-in jQuery effects. Below is a brief overview of some of the most commonly used effect methods.

<table >
	<tr >
		Method
		Name
		Description
	</tr>
	<tr >

<td >`toggle()`
</td>

<td >Toggle
</td>

<td >switches the visibility of an element or elements. `show()` and `hide()` are the related one-way effects.
</td>
	</tr>
	<tr >

<td >
			`fadeToggle()`

</td>

<td >
			Fade Toggle

</td>

<td >switches the visibility and animates the opacity of an element or elements. `fadeIn()` and `fadeOut()` are the related one-way effects.
</td>
	</tr>
	<tr >

<td >
			`slideToggle()`

</td>

<td >
			Slide Toggle

</td>

<td >toggles the visibility of an element or elements with a sliding effect. `slideDown()` and `slideUp()` are the related one-way effects.
</td>
	</tr>
		<tr >

<td >
			`animate()`

</td>

<td >
			Animate

</td>

<td >performs custom animation effects on the CSS property of an element.
</td>
	</tr>
</table>

We use jQuery events to listen for a user interaction such as the click of a button, and we use jQuery effects to further manipulate elements once that action takes place.



## Conclusion



In this guide, we learned how to select and manipulate elements with jQuery, and how events and effects work together to make an interactive web experience for the user. From here, you should have a deeper understanding of the capabilities of jQuery, and be on your way to writing your own code.
```
