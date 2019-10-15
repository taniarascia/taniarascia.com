---
date: 2019-10-04
title: 'Understanding This, Bind, Call, and Apply in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: this-bind-call-apply-javascript
categories:
  - Code
tags:
  - javascript
  - fundamentals
---

*This article was originally written for [DigitalOcean](https://www.digitalocean.com/community/conceptual_articles/understanding-this-bind-call-and-apply-in-javascript). I selected the [Open Internet/Free Speech Fund](https://www.brightfunds.org/open-internet-free-speech) to receive a donation as part of the [Write for DOnations](https://do.co/w4do-cta) program.*

The [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) keyword is a very important concept in JavaScript, and also a particularly confusing one to both new developers and those who have experience in other programming languages. In JavaScript, `this` is a reference to an object. The object that `this` refers to can vary, implicitly based on whether it is global, on an object, or in a constructor, and can also vary explicitly based on usage of the `Function` prototype methods `bind`, `call`, and `apply`.

Although `this` is a bit of a complex topic, it is also one that appears as soon as you begin writing your first JavaScript programs. Whether you're trying to access an element or event in [the Document Object Model (DOM)](https://www.digitalocean.com/community/tutorial_series/understanding-the-dom-document-object-model), building classes for writing in the object-oriented programming style, or using the properties and methods of regular objects, you will encounter `this`.

In this article, you'll learn what `this` refers to implicitly based on context, and you'll learn how to use the `bind`, `call`, and `apply` methods to explicitly determine the value of `this`.

## Implicit Context

There are four main contexts in which the value of `this` can be implicitly inferred:

- the global context
- as a method within an object
- as a constructor on a function or class
- as a DOM event handler

### Global

In the global context, `this` refers to the [global object](https://developer.mozilla.org/en-US/docs/Glossary/Global_object). When you're working in a browser, the global context is `window`. When you're working in Node.js, the global context is `global`.

> **Note:** If you are not yet familiar with the concept of scope in JavaScript, please review [Understanding Variables, Scope, and Hoisting in JavaScript](/understanding-variables-scope-hoisting-in-javascript).

For the examples, you will practice the code in the browser's Developer Tools console. Read [How to Use the JavaScript Developer Console](/how-to-use-the-javascript-developer-console) if you are not familiar with running JavaScript code in the browser.

If you log the value of `this` without any other code, you will see what object `this` refers to.

```js
console.log(this)
```

```terminal
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```

You can see that `this` is `window`, which is the global object of a browser.

In [Understanding Variables, Scope, and Hoisting in JavaScript](/understanding-variables-scope-hoisting-in-javascript), you learned that functions have their own context for variables. You might be tempted to think that `this` would follow the same rules inside a function, but it does not. A top-level function will still retain the `this` reference of the global object.

You write a top-level function, or a function that is not associated with any object, like this:

```js
function printThis() {
  console.log(this)
}

printThis()
```

```terminal
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```

Even within a function, `this` still refers to the `window`, or global object.

However, when using [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), the context of `this` within a function on the global context will be `undefined`.

```js
'use strict'

function printThis() {
  console.log(this)
}

printThis()
```

```terminal
undefined
```

Generally, it is safer to use strict mode to reduce the probability of `this` having an unexpected scope. Rarely will someone want to refer to the `window` object using `this`.

> For more information about strict mode and what changes it makes regarding mistakes and security, read the [Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) documentation on MDN.

### An Object Method

A [method](/understanding-objects-in-javascript#properties-and-methods) is a function on an object, or a task that an object can perform. A method uses `this` to refer to the properties of the object.

```js
const america = {
  name: 'The United States of America',
  yearFounded: 1776,

  describe() {
    console.log(`${this.name} was founded in ${this.yearFounded}.`)
  },
}

america.describe()
```

```terminal
"The United States of America was founded in 1776."
```

In this example, `this` is the same as `america`.

In a nested object, `this` refers to the current object scope of the method. In the following example, `this.symbol` within the `details` object refers to `details.symbol`.

```js
const america = {
  name: 'The United States of America',
  yearFounded: 1776,
  details: {
    symbol: 'eagle',
    currency: 'USD',
    printDetails() {
      console.log(`The symbol is the ${this.symbol} and the currency is ${this.currency}.`)
    },
  },
}

america.details.printDetails()
```

```terminal
"The symbol is the eagle and the currency is USD."
```

Another way of thinking about it is that `this` refers to the object on the left side of the dot when calling a method.

### A Function Constructor

When you use the [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) keyword, it creates an instance of a constructor function or class. Function constructors were the standard way to initialize a user-defined object before the `class` syntax was introduced in the ECMAScript 2015 update to JavaScript. In [Understanding Classes in JavaScript](/understanding-classes-in-javascript), you will learn how to create a function constructor and an equivalent class constructor.

```js
function Country(name, yearFounded) {
  this.name = name
  this.yearFounded = yearFounded

  this.describe = function() {
    console.log(`${this.name} was founded in ${this.yearFounded}.`)
  }
}

const america = new Country('The United States of America', 1776)

america.describe()
```

```terminal
"The United States of America was founded in 1776."
```

In this context, `this` is now bound to the instance of `Country`, which is contained in the `america` constant.

### A Class Constructor

A constructor on a class acts the same as a constructor on a function. Read more about the similarities and differences between function constructors and ES6 classes in [Understanding Classes in JavaScript](/understanding-classes-in-javascript).

```js
class Country {
  constructor(name, yearFounded) {
    this.name = name
    this.yearFounded = yearFounded
  }

  describe() {
    console.log(`${this.name} was founded in ${this.yearFounded}.`)
  }
}

const america = new Country('The United States of America', 1776)

america.describe()
```

`this` in the `describe` method refers to the instance of `Country`, which is `america`.

```terminal
"The United States of America was founded in 1776."
```

### A DOM Event Handler

In the browser, there is a special `this` context for event handlers. In an event handler called by `addEventListener`, `this` will refer to `event.currentTarget`. More often than not, developers will simply use `event.target` or `event.currentTarget` as needed to access elements in the DOM, but since the `this` reference changes in this context, it is important to know.

In the following example, we'll create a button, add text to it, and append it to the [DOM](https://www.digitalocean.com/community/tutorial_series/understanding-the-dom-document-object-model). When we log the value of `this` within the event handler, it will print the target.

```js
const button = document.createElement('button')
button.textContent = 'Click me'
document.body.append(button)

button.addEventListener('click', function(event) {
  console.log(this)
})
```

```terminal
<button>Click me</button>
```

Once you paste this into your browser, you will see a button appended to the page that says "Click me". If you click the button, you will see `<button>Click me</button>` appear in your console, as clicking the button logs the element, which is the button itself. Therefore, as you can see, `this` refers to the targeted element, which is the element we added an event listener to.

## Explicit Context

In all of the previous examples, the value of `this` was determined by its context&mdash;whether it is global, in an object, in a constructed function or class, or on a DOM event handler. However, using `call`, `apply`, or `bind`, you can explicitly determine what `this` should refer to.

It is difficult to define exactly when to use `call`, `apply`, or `bind`, as it will depend on the context of your program. `bind` can be particularly helpful when you want to use events to access properties of one class within another class. For example, if you were to write a simple game, you might separate the user interface and I/O into one class, and the game logic and state into another. Since the game logic would need to access input, such as key press and click, you would want to `bind` the events to access the `this` value of the game logic class.

The important part is to know how to determine what object `this` refers to, which you can do implicitly with what you learned in the previous sections, or explicitly with the three methods you will learn next.

### Call and Apply

`call` and `apply` are very similar&mdash;they invoke a function with a specified `this` context, and optional arguments. The only difference between `call` and `apply` is that `call` requires the arguments to be passed in one-by-one, and `apply` takes the arguments as an array.

In this example, we'll create an object, and create a function that references `this` but has no `this` context.

```js
const book = {
  title: 'Brave New World',
  author: 'Aldous Huxley',
}

function summary() {
  console.log(`${this.title} was written by ${this.author}.`)
}

summary()
```

```terminal
"undefined was written by undefined"
```

Since `summary` and `book` have no connection, invoking `summary` by itself will only print `undefined`, as it's looking for those properties on the global object.

> **Note:** Attempting this in strict mode would result in `Uncaught TypeError: Cannot read property 'title' of undefined`, as `this` itself would be `undefined`.

However, you can use `call` and `apply` to invoke the `this` context of `book` on the function.

```js
summary.call(book)
// or:
summary.apply(book)
```

```terminal
"Brave New World was written by Aldous Huxley."
```

There is now a connection between `book` and `summary` when these methods are applied. Let's confirm exactly what `this` is.

```js
function printThis() {
  console.log(this)
}

printThis.call(book)
// or:
whatIsThis.apply(book)
```

```terminal
{title: "Brave New World", author: "Aldous Huxley"}
```

In this case, `this` actually becomes the object passed as an argument.

This is how `call` and `apply` are the same, but there is one small difference. In addition to being able to pass the `this` context as the first argument, you can also pass additional arguments through.

```js
function longerSummary(genre, year) {
  console.log(
    `${this.title} was written by ${this.author}. It is a ${genre} novel written in ${year}.`
  )
}
```

With `call` each additional value you want to pass is sent as an additional argument.

```js
longerSummary.call(book, 'dystopian', 1932)
```

```terminal
"Brave New World was written by Aldous Huxley. It is a dystopian novel written in 1932."
```

If you try to send the exact same arguments with `apply`, this is what happens:

```js
longerSummary.apply(book, 'dystopian', 1932)
```

```terminal
Uncaught TypeError: CreateListFromArrayLike called on non-object at <anonymous>:1:15
```

Instead, for `apply`, you have to pass all the arguments in an array.

```js
longerSummary.apply(book, ['dystopian', 1932])
```

```terminal
"Brave New World was written by Aldous Huxley. It is a dystopian novel written in 1932."
```

The difference between passing the arguments individually or in an array is subtle, but it's important to be aware of. It might be simpler and more convenient to use `apply`, as it would not require changing the function call if some parameter details changed.

### Bind

Both `call` and `apply` are one-time use methods&mdash;if you call the method with the `this` context it will have it, but the original function will remain unchanged.

Sometimes, you might need to use a method over and over with the `this` context of another object, and in that case you could use the `bind` method to create a brand new function with an explicitly bound `this`.

```js
const braveNewWorldSummary = summary.bind(book)

braveNewWorldSummary()
```

```terminal
"Brave New World was written by Aldous Huxley"
```

In this example, every time you call `braveNewWorldSummary`, it will always return the original `this` value bound to it. Attempting to bind a new `this` context to it will fail, so you can always trust a bound function to return the `this` value you expect.

```js
const braveNewWorldSummary = summary.bind(book)

braveNewWorldSummary() // Brave New World was written by Aldous Huxley.

const book2 = {
  title: '1984',
  author: 'George Orwell',
}

braveNewWorldSummary.bind(book2)

braveNewWorldSummary() // Brave New World was written by Aldous Huxley.
```

Although this example tries to bind `braveNewWorldSummary` once again, it retains the original `this` context from the first time it was bound.

## Arrow Functions

[Arrow functions](/how-to-define-functions-in-javascript#arrow-functions) do not have their own `this` binding. Instead, they go up to the next level of execution.

```js
const whoAmI = {
  name: 'Leslie Knope',
  regularFunction: function() {
    console.log(this.name)
  },
  arrowFunction: () => {
    console.log(this.name)
  },
}

whoAmI.regularFunction() // "Leslie Knope"
whoAmI.arrowFunction() // undefined
```

It can be useful to use the arrow function in cases where you really want `this` to refer to the outer context. For example, if you had an event listener inside of a class, you would probably want `this` to refer to some value in the class.

In this example, you'll create and append button to the DOM like before, but the class will have an event listener that will change the text value of the button when clicked.

```js
const button = document.createElement('button')
button.textContent = 'Click me'
document.body.append(button)

class Display {
  constructor() {
    this.buttonText = 'New text'

    button.addEventListener('click', event => {
      event.target.textContent = this.buttonText
    })
  }
}

new Display()
```

If you click the button, the text content will change to the value of `buttonText`. If you hadn't used an arrow function here, `this` would be equal to `event.currentTarget`, and you wouldn't be able to use it to access a value within the class without explicitly binding it. This tactic is often used on class methods in frameworks like React.

## Conclusion

In this article, you learned about `this` in JavaScript, and the many different values it might have based on implicit runtime binding, and explicit binding through `bind`, `call`, and `apply`. You also learned about how the lack of `this` binding in arrow functions can be used to refer to a different context. With this knowledge, you should be able to determine the value of `this` in your programs.
