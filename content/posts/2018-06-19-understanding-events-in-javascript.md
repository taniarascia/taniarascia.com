---
date: 2018-06-19
title: 'Understanding Events in JavaScript'
template: post
thumbnail: '../thumbnails/dom.png'
slug: understanding-events-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - dom
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-events-in-javascript)_.

### Introduction

In the Understanding the DOM series, we have learned about [the DOM tree](/understanding-the-dom-tree-and-nodes) and how to [access](/how-to-access-elements-in-the-dom), [traverse](/how-to-traverse-the-dom), [add/remove](/how-to-make-changes-to-the-dom), and [modify](/how-to-modify-attributes-classes-and-styles-in-the-dom) nodes and elements using the Developer Tools _Console_.

Although we have learned to make almost any change we want to the DOM, this has not been very useful yet from a user perspective, as we still have to manually trigger changes. With the introduction of events, we will learn how to tie it all together to make interactive websites.

**Events** in JavaScript are actions that have taken place in the browser. Below are a few examples of common events that can happen on a website:

- The page finishes loading
- The user clicks a button
- The user hovers over a dropdown
- The user submits a form
- The user presses a key on their keyboard

In this article, we will learn what event handlers, event listeners, and event objects are, three different ways to write code to handle events, and a few of the most common events.

## Event Handlers and Event Listeners

When a user clicks a button or presses a key, an event is fired - specifically, a click event or a keypress event. An **event handler** is a JavaScript function that runs when an event fires. An **event listener** attaches a listener to an element, which allows that particular element to wait and "listen" for that particular event to fire.

There are three ways to assign events to elements: inline event handlers, event handler properties, and event listeners. We will go over all three methods to ensure that you are familiar with every way an event can be triggered, the discuss the pros and cons of each method.

### Inline Event Handler Attributes

The simplest method to understand events is the **inline event handler**. Let's start with a very basic example that consists of a `button` element and a `p` element. We want to click the `button` to change the text content of the `p`.

Let's begin with an HTML page with a button in the body. We'll be referencing a JavaScript file that we'll add code to in a bit.

<div class="filename">events.html</div>

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Events</title>
  </head>

  <body>
    <!-- Add button -->
    <button>Click me</button>

    <p>Try to change me.</p>
  </body>

  <!-- Reference JavaScript file -->
  <script src="js/events.js"></script>
</html>
```

Directly on the `button`, we will add an attribute called `onclick`. The attribute value will be a function we create called `changeText()`.

```html
<button onclick="changeText()">Click me</button>

<p>Try to change me.</p>
```

In our JavaScript, we will create that function, which will modify the `textContent` of the `p` element.

<div class="filename">events.js</div>

```js
// Function to modify the text content of the paragraph
const changeText = () => {
  const p = document.querySelector('p')

  p.textContent = 'I changed because of an inline event handler.'
}
```

When you first load the events.html, you'll see a page that looks like this:

![](../images/events-1.png)

Now when you click on the button, the text of the `p` will change from `Try to change me.` to `I changed because of an inline event handler.`.

![](../images/events-2.png)

Inline event handlers are a simple and straightforward way to begin understanding events, but they generally should not be used beyond testing and educational purposes.

You can compare inline event handlers to inline CSS styles on an HTML element. It is much easier to maintain a separate stylesheet of classes than create inline styles on every element, just as it is easier to maintain JavaScript that is handled entirely through a separate script file than add handlers to every element.

### Event Handler Properties

The next step up from an inline event handler is the **event handler property**. This works very similarly to an inline handler, except we're setting the property of an element in JavaScript instead of the attribute in the HTML.

The setup will be the same here, except we no longer include the `onclick="changeText()"` in the markup.

<div class="filename">events.html</div>

```html
<button>Click me</button>

<p>I will change.</p>
```

Our function will remain the same as well, except now we need to access the `button` element in the JavaScript. We can simply access `onclick` just as we would access `style` or `id` or any other element property, then assign the function reference.

<div class="filename">events.js</div>

```js
// Function to modify the text content of the paragraph
const changeText = () => {
  const p = document.querySelector('p')

  p.textContent = 'I changed because of an event handler property.'
}

// Add event handler as a property of the button element
const button = document.querySelector('button')
button.onclick = changeText
```

> **Note**: Event handlers do not follow the camelCase convention that most JavaScript code adheres to. Notice that the code is onclick, not onClick.

Now when you click the button, it will have the same effect as before. Note that when passing a function reference to the `onclick` property, we do not include parentheses, as we are not invoking the function in that moment, but only passing a reference to it.

The event handler property is slightly more maintainable than the inline handler, but it still suffers from some of the same hurdles. For example, trying to set multiple, separate `onclick` properties will cause all but the last one to be overwritten, as demonstrated below.

```js
const p = document.querySelector('p')
const button = document.querySelector('button')

const changeText = () => {
  p.textContent = 'Will I change?'
}

const alertText = () => {
  alert('Will I alert?')
}

// Events can be overwritten
button.onclick = changeText
button.onclick = alertText
```

In the above example, the `button` click would only display an alert, and not change the `p` text, since the `alert()` code was the last one added to the property.

![](../images/events-5.png)

With an understanding of both inline event handlers and event handler properties, let's move onto event listeners.

### Event Listeners

The latest addition to JavaScript event handlers are event listeners. An **event listener** watches for an event on an element. Instead of assigning the event directly to a property on the element, we will use the `addEventListener()` method to listen for the event.

`addEventListener()` takes has two mandatory parameters - the event to be listening for, and the listener callback function.

The HTML for our event listener will be the same as the previous example.

<div class="filename">events.html</div>

```html
<button>Click me</button>

<p>I will change.</p>
```

We will still be using the exact same `changeText()` function as before. We'll attach the `addEventListener()` method to the button.

```js
// Function to modify the text content of the paragraph
const changeText = () => {
  const p = document.querySelector('p')

  p.textContent = 'I changed because of an event listener.'
}

// Listen for click event
const button = document.querySelector('button')
button.addEventListener('click', changeText)
```

Notice that with the first two methods, a click event was referred to as `onclick`, but with event listeners it is referred to as `click`. Every event listener drops the `on` from the word. In the next section, we will look at more examples of other types of events.

At first look, event listeners seem very similar to event handler properties, but they have a few advantages. We can set multiple event listeners on the same element, as demonstrated in this example below.

```js
const p = document.querySelector('p')
const button = document.querySelector('button')

const changeText = () => {
  p.textContent = 'Will I change?'
}

const alertText = () => {
  alert('Will I alert?')
}

// Multiple listeners can be added to the same event and element
button.addEventListener('click', changeText)
button.addEventListener('click', alertText)
```

In this example, both events will fire. Often, anonymous functions will be used instead of a function reference on an event listener. Anonymous functions are functions that are not named.

```js
// An anonymous function on an event listener
button.addEventListener('click', () => {
  p.textContent = 'Will I change?'
})
```

It is also possible to use the `removeEventListener()` function to remove one or all events from an element.

```js
// Remove alert function from button element
button.removeEventListener('click', alertText)
```

Furthermore, you can use `addEventListener()` on the `document` and `window` object. Event listeners are currently the most common and preferred way to handle events in JavaScript.

## Common Events

We have learned about inline event handlers, event handler properties, and event listeners using the click event, but there are many more events in JavaScript. We will go over a few of the most common events below. [View the complete list of events](https://developer.mozilla.org/en-US/docs/Web/Events) on the Mozilla Developer Network.

### Mouse Events

Mouse events are among the most frequently used events. They refer to events that involve clicking buttons on the mouse or hovering and moving the mouse pointer. These events also correspond to the equivalent action on a touch device.

| Event                                                                          | Description                                                |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| [`click`](https://developer.mozilla.org/en-US/docs/Web/Events/click)           | Fires when the mouse is pressed and released on an element |
| [`dblclick`](https://developer.mozilla.org/en-US/docs/Web/Events/dblclick)     | Fires when an element is clicked twice                     |
| [`mouseenter`](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter) | Fires when a pointer enters an element                     |
| [`mouseleave`](https://developer.mozilla.org/en-US/docs/Web/Events/mouseleave) | Fires when a pointer leaves an element                     |
| [`mousemove`](https://developer.mozilla.org/en-US/docs/Web/Events/mouseleave)  | Fires every time a pointer moves inside an element         |

A `click` is a compound event that is comprised of combined `mousedown` and `mouseup` events, which fire when the mouse button is pressed down or lifted, respectively.

Using `mouseenter` and `mouseleave` in tandem recreates a hover effect that lasts as long as a mouse pointer is on the element.

### Form Events

Form events are actions that pertain to forms, such as `input` elements being selected or unselected, and forms being submitted.

| Event                                                                  | Description                                             |
| ---------------------------------------------------------------------- | ------------------------------------------------------- |
| [`submit`](https://developer.mozilla.org/en-US/docs/Web/Events/submit) | Fires when a form is submitted                          |
| [`focus`](https://developer.mozilla.org/en-US/docs/Web/Events/focus)   | Fires when an element (such as an input) receives focus |
| [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur)     | Fires when an element loses focus                       |

JavaScript is often used to submit forms and send the values through to a backend language. The advantage of using JavaScript to send forms is that it does not require a page reload to submit the form, and JavaScript can be used to validate required input fields.

### Keyboard Events

Keyboard events are used for handling keyboard actions, such as pressing a key, lifting a key, and holding down a key.

| Event                                                                      | Description                               |
| -------------------------------------------------------------------------- | ----------------------------------------- |
| [`keydown`](https://developer.mozilla.org/en-US/docs/Web/Events/keydown)   | Fires once when a key is pressed          |
| [`keyup`](https://developer.mozilla.org/en-US/docs/Web/Events/keyup)       | Fires once when a key is released         |
| [`keypress`](https://developer.mozilla.org/en-US/docs/Web/Events/keypress) | Fires continuously while a key is pressed |  | Event |

Although they look similar, `keydown` and `keypress` events do not access all the exact same keys. While `keydown` will acknowledge every key that is pressed, `keypress` will omit keys that do not produce a character, such as `SHIFT`, `ALT`, or `DELETE`.

Keyboard events have specific properties for accessing individual keys. In this example, we're passing a parameter through to the event listener known as an `event` object. Using this object, we can access more information about the action that took place.

| Property                                                                            | Description                               | Example |
| ----------------------------------------------------------------------------------- | ----------------------------------------- | ------- |
| [`keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) | A number pertaining to the key            | 65      |
| [`key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)         | Represents the character name             | a       |
| ['code'](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)       | Represents the physical key being pressed | KeyA    |

In the example below, we will test three properties that pertain to keyboard objects,`keyCode`, `key`, and `code`. Once this is set up, we can press a key on the keyboard, such as `a`.

```js
// Test the keyCode, key, and code properties
document.addEventListener('keydown', event => {
  console.log('key: ' + event.keyCode)
  console.log('key: ' + event.key)
  console.log('code: ' + event.code)
})
```

```terminal
keyCode: 65
key: a
code: KeyA
```

The `keyCode` property is a number that pertains to the key that has been pressed. The `key` property is the name of the character, which can change - for example, pressing `a` with `SHIFT` would result in a `key` of `A`. The `code` property represents the physical key on the keyboard.

> Note that `keyCode` is in the process of being deprecated and it is preferable to use `code` in new projects.

## Event Objects

The [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) object consists of properties and methods that all events can access. In addition to the generic `Event` object, each type of event has its own extensions, such as [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) and [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent).

The `Event` object is passed through a listener function as a parameter. It is usually written as `event` or `e`. We can access the `code` property of the `keydown` event to replicate the keyboard controls of a PC game.

```html
<p></p>
```

Then, type the following JavaScript code into your browser's Developer Console.

```js
// Pass an event through to a listener
document.addEventListener('keydown', event => {
  var element = document.querySelector('p')

  // Set variables for keydown codes
  var a = 'KeyA'
  var s = 'KeyS'
  var d = 'KeyD'
  var w = 'KeyW'

  // Set a direction for each code
  switch (event.code) {
    case a:
      element.textContent = 'Left'
      break
    case s:
      element.textContent = 'Down'
      break
    case d:
      element.textContent = 'Right'
      break
    case w:
      element.textContent = 'Up'
      break
  }
})
```

When you press one of the keys — <kbd>a</kbd>, <kbd>s</kbd>, <kbd>d</kbd>, or <kbd>w</kbd> — you'll see output similar to the following:

![](../images/events-7.png)

From here, you can continue to develop how the browser will respond and to the user pressing those keys, and can create a more dynamic website.

Next, we'll go over one of the most frequently used event properties: the `target` property. In the following example, we have three `div` elements inside one `section`.

```html
<section>
  <div id="one">One</div>
  <div id="two">Two</div>
  <div id="three">Three</div>
</section>
```

Using `event.target`, we can place one event listener on the outer `section` element and get the most deeply nested element.

```js
const section = document.querySelector('section')

// Print the selected target
section.addEventListener('click', event => {
  console.log(event.target)
})
```

Clicking on any one of those elements will return print that specific element to the `Console` using `event.target`. This is extremely useful, as it allows you to place only one event listener that can be used to access many nested elements.

![](../images/events-8.png)

## Conclusion

Events are actions that take place on a website, such as clicking, hovering, submitting a form, loading a page, or pressing a key on the keyboard. JavaScript becomes truly interactive and dynamic when we are able to make websites respond to actions the user has taken.

In this tutorial, we learned what events are, examples of common events, the difference between event handlers and event listeners, and how to access the `Event` object. Using this knowledge, you will be able to begin making dynamic websites and applications.
