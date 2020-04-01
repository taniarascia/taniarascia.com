---
date: 2020-03-31
title: 'Understanding Default Parameters in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: default-parameters-javascript
categories:
  - Code
tags:
  - javascript
  - fundamentals
---

_This article was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-default-parameters-in-javascript)._

In [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/), _default function parameters_ were introduced to the [JavaScript](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript) language. These allow developers to initialize a [function](/how-to-define-functions-in-javascript) with default values if the arguments are not supplied to the function call. Initializing function parameters in this way will make your functions easier to read and less error-prone, and will provide default behavior for your functions. This will help you avoid errors that stem from passing in `undefined` arguments and destructuring objects that don't exist.

In this article, you will review the difference between parameters and arguments, learn how to use default parameters in functions, see alternate ways to support default parameters, and learn what types of values and expressions can be used as default parameters. You will also run through examples that demonstrate how default parameters work in JavaScript.

## Arguments and Parameters

Before explaining default function parameters, it is important to know what it is that parameters can default to. Because of this, we will first review the difference between _arguments_ and _parameters_ in a function. If you would like to learn more about this distinction, check out our earlier article in the [JavaScript series](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript), [How to Define Functions in JavaScript](/how-to-define-functions-in-javascript).

In the following code block, you will create a function that returns the cube of a given number, defined as `x`:

```js
// Define a function to cube a number
function cube(x) {
  return x * x * x
}
```

The `x` variable in this example is a _parameter_—a named variable passed into a function. A parameter must always be contained in a variable and must never have a direct value.

Now take a look at this next code block, which calls the `cube` function you just created:

```js
// Invoke cube function
cube(10)
```

This will give the following output:

```terminal
1000
```

In this case, `10` is an _argument_—a value passed to a function when it is invoked. Often the value will be contained in a variable as well, such as in this next example:

```js
// Assign a number to a variable
const number = 10

// Invoke cube function
cube(number)
```

This will yield the same result:

```terminal
1000
```

If you do not pass an argument to a function that expects one, the function will implicitly use `undefined` as the value:

```js
// Invoke the cube function without passing an argument
cube()
```

This will return:

```terminal
NaN
```

In this case, `cube()` is trying to calculate the value of `undefined * undefined * undefined`, which results in `NaN`, or "not a number". For more on this, take a look at the number section of [Understanding Data Types in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript#numbers).

This automatic behavior can sometimes be a problem. In some cases, you might want the parameter to have a value even if no argument was passed to the function. That's where the _default parameters_ feature comes in handy, a topic that you will cover in the next section.

## Default Parameter Syntax

With the addition of default parameters in ES2015, you can now assign a default value to any parameter, which the function will use instead of `undefined` when called without an argument. This section will first show you how to do this manually, and then will guide you through setting default parameters.

Without default parameters, you would have to explicitly check for `undefined` values in order to set defaults, as is shown in this example:

```js
// Check for undefined manually
function cube(x) {
  if (typeof x === 'undefined') {
    x = 5
  }

  return x * x * x
}

cube()
```

This uses a [conditional statement](/how-to-write-conditional-statements-in-javascript) to check if the value has been automatically provided as `undefined`, then sets the value of `x` as `5`. This will result in the following output:

```terminal
125
```

In contrast, using default parameters accomplishes the same goal in much less code. You can set a default value to the parameter in `cube` by assigning it with the equality assignment operator (`=`), as highlighted here:

```js
// Define a cube function with a default value
function cube(x = 5) {
  return x * x * x
}
```

Now when the `cube` function is invoked without an argument, it will assign `5` to `x` and return the calculation instead of `NaN`:

```js
// Invoke cube function without an argument
cube()
```

```terminal
125
```

It will still function as intended when an argument is passed, ignoring the default value:

```js
// Invoke cube function with an argument
cube(2)
```

```terminal
8
```

However, one important caveat to note is that the default parameter value will also override an explicit `undefined` passed as an argument to a function, as demonstrated here:

```js
// Invoke cube function with undefined
cube(undefined)
```

This will give the calculation with `x` equal to `5`:

```terminal
125
```

In this case, the default parameter values were calculated, and an explicit `undefined` value did not override them.

Now that you have an idea of the basic syntax of default parameters, the next section will show how default parameters work with different data types.

## Default Parameter Data Types

Any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) or [object](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript) can be used as a default parameter value. In this section, you will see how this flexibility increases the ways in which default parameters can be used.

First, set parameters using a [number](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript#numbers), [string](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript#strings), [boolean](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript#booleans), object, [array](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript), and null value as a default value. This example will use [arrow function](https://www.digitalocean.com/community/tutorials/how-to-define-functions-in-javascript#arrow-functions) syntax:

```js
// Create functions with a default value for each data type
const defaultNumber = (number = 42) => console.log(number)
const defaultString = (string = 'Shark') => console.log(string)
const defaultBoolean = (boolean = true) => console.log(boolean)
const defaultObject = (object = { id: 7 }) => console.log(object)
const defaultArray = (array = [1, 2, 3]) => console.log(array)
const defaultNull = (nullValue = null) => console.log(nullValue)
```

When these functions are invoked without parameters, they will all use the default values:

```js
// Invoke each function
defaultNumber()
defaultString()
defaultBoolean()
defaultObject()
defaultArray()
defaultNull()
```

```terminal
42
"Shark"
true
{id: 7}
(3) [1, 2, 3]
null
```

Note that any object created in a default parameter will be created every time the function is called. One of the common use cases for default parameters is to use this behavior to obtain values out of an object. If you try to destructure or access a value from an object that doesn't exist, it will throw an error. However, if the default parameter is an empty object, it will simply give you `undefined` values instead of throwing an error:

```js
// Define a settings function with a default object
function settings(options = {}) {
  const { theme, debug } = options

  // Do something with settings
}
```

This will avoid the error caused by destructuring objects that don't exist.

Now that you've seen how default parameters operate with different data types, the next section will explain how multiple default parameters can work together.

## Using Multiple Default Parameters

You can use as many default parameters as you want in a function. This section will show you how to do this, and how to use it to manipulate the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) in a real-world example.

First, declare a `sum()` function with multiple default parameters:

```js
// Define a function to add two values
function sum(a = 1, b = 2) {
  return a + b
}

sum()
```

This will result in the following default calculation:

```terminal
3
```

Additionally, the value used in a parameter can be used in any subsequent default parameter, from left to right. For example, this `createUser` function creates a user object `userObj` as the third parameter, and all the function itself does is return `userObj` with the first two parameters:

```js
// Define a function to create a user object using parameters
function createUser(name, rank, userObj = { name, rank }) {
  return userObj
}

// Create user
const user = createUser('Jean-Luc Picard', 'Captain')
```

If you call `user` here, you will get the following:

```terminal
{name: "Jean-Luc Picard", rank: "Captain"}
```

It is usually recommended to put all default parameters at the end of a list of parameters, so that you can easily leave off optional values. If you use a default parameter first, you will have to explicitly pass `undefined` to use the default value.

Here is an example with the default parameter at the beginning of the list:

```js
// Define a function with a default parameter at the start of the list
function defaultFirst(a = 1, b) {
  return a + b
}
```

When calling this function, you would have to call `defaultFirst()` with two arguments:

```js
defaultFirst(undefined, 2)
```

This would give the following:

```terminal
3
```

Here is an example with the default parameter at the end of the list:

```js
// Define a function with a default parameter at the end of the list
function defaultLast(a, b = 1) {
  return a + b
}

defaultLast(2)
```

This would yield the same value:

```terminal
3
```

Both functions have the same result, but the one with the default value last allows a much cleaner function call.

For a real-world example, here is a function that will create a DOM element, and add a text label and classes, if they exist.

```js
// Define function to create an element
function createNewElement(tag, text, classNames = []) {
  const el = document.createElement(tag)
  el.textContent = text

  classNames.forEach(className => {
    el.classList.add(className)
  })

  return el
}
```

You can call the function with some classes in an array:

```js
const greeting = createNewElement('p', 'Hello!', ['greeting', 'active'])
```

Calling `greeting` will give the following value:

```terminal
<p class="greeting active">Hello!</p>
```

However, if you leave the `classNames` array out of the function call, it will still work.

```js
const greeting2 = createNewElement('p', 'Hello!')
```

`greeting2` now has the following value:

```terminal
<p>Hello!</p>
```

In this example, [`forEach()`](<https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-iteration-methods#foreach()>) can be used on an empty array without an issue. If that empty array were not set in the default parameter, you would get the following error:

```terminal
VM2673:5 Uncaught TypeError: Cannot read property 'forEach' of undefined
    at createNewElement (<anonymous>:5:14)
    at <anonymous>:12:18
```

Now that you have seen how multiple default parameters can interact, you can move on to the next section to see how function calls work as default parameters.

## Function Calls as Default Parameters

In addition to primitives and objects, the result of calling a function can be used as a default parameter.

In this code block, you will create a function to return a random number, and then use the result as the default parameter value in a `cube` function:

```js
// Define a function to return a random number from 1 to 10
function getRandomNumber() {
  return Math.floor(Math.random() * 10)
}

// Use the random number function as a default parameter for the cube function
function cube(x = getRandomNumber()) {
  return x * x * x
}
```

Now invoking the `cube` function without a parameter will have potentially different results every time you call it:

```js
// Invoke cube function twice for two potentially different results
cube()
cube()
```

The output from these function calls will vary:

```terminal
512
64
```

You can even use built-in methods, like those on the `Math` object, and use the value returned in one function call as a parameter in another function.

In the following example, a random number is assigned to `x`, which is used as the parameter in the `cube` function you created. The `y` parameter will then calculate the cube root of the number and check to see if `x` and `y` are equal:

```js
// Assign a random number to x
// Assign the cube root of the result of the cube function and x to y
function doesXEqualY(x = getRandomNumber(), y = Math.cbrt(cube(x))) {
  return x === y
}

doesXEqualY()
```

This will give the following:

```terminal
true
```

A default parameter can even be a function definition, as seen in this example, which defines a parameter as the `inner` function and returns the function call of `parameter`:

```js
// Define a function with a default parameter that is an anonymous function
function outer(
  parameter = function inner() {
    return 100
  }
) {
  return parameter()
}

// Invoke outer function
outer()
```

```terminal
100
```

This `inner` function will be created from scratch every time the `outer` function is invoked.

## Conclusion

In this article, you learned what default function parameters are and how to use them. Now you can use default parameters to help keep your functions clean and easy to read. You can also assign empty objects and arrays to parameters upfront to reduce both complexity and lines of code when dealing with situations such as retrieving values from an object or looping through an array.

If you would like to learn more about JavaScript, check out the homepage for our [How To Code in JavaScript series](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript), or browse our [How to Code in Node.js series](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-node-js) for articles on back-end development.
