---
date: 2020-02-29
title: 'Understanding Generators in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: understanding-generators-in-javascript
categories:
  - Code
tags:
  - javascript
  - fundamentals
---

_This article was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-generators-in-javascript)._

In [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/), _generators_ were introduced to the JavaScript language. A generator is a process that can be paused and resumed and can yield multiple values. A generator in JavaScript consists of a [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), which returns an iterable [`Generator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) object.

Generators are a powerful addition to JavaScript. They can maintain state, providing an efficient way to make iterators, and are capable of dealing with infinite data streams, which can be used to implement infinite scroll on the frontend of a web application, to operate on sound wave data, and more. Additionally, when used with [Promises](https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js#using-promises-for-concise-asynchronous-programming), generators can mimic the `async/await` functionality, which allows us to deal with [asynchronous code](https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js) in a more straightforward and readable manner. Although `async/await` is a more prevalent way to deal with common, simple asynchronous use cases, like fetching data from an API, generators have more advanced features that make learning how to use them worthwhile.

In this article, we'll cover how to create generator functions, how to iterate over `Generator` objects, the difference between `yield` and `return` inside a generator, and other aspects of working with generators.

## Generator Functions

A [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) is a function that returns a `Generator` object, and is defined by the `function` keyword followed by an asterisk (`*`), as shown in the following:

```js
// Generator function declaration
function* generatorFunction() {}
```

Occasionally, you will see the asterisk next to the function name, as opposed to the function keyword, such as `function *generatorFunction()`. This works the same, but `function*` is a more widely accepted syntax.

Generator functions can also be defined in an expression, like regular [functions](https://www.digitalocean.com/community/tutorials/how-to-define-functions-in-javascript):

```js
// Generator function expression
const generatorFunction = function*() {}
```

Generators can even be the methods of an [object](/understanding-objects-in-javascript) or [class](/understanding-classes-in-javascript):

```js
// Generator as the method of an object
const generatorObj = {
  *generatorMethod() {},
}

// Generator as the method of a class
class GeneratorClass {
  *generatorMethod() {}
}
```

The examples throughout this article will use the generator function declaration syntax.

> **Note**: Unlike regular functions, generators cannot be constructed with the `new` keyword, nor can they be used in conjunction with [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

Now that you know how to declare generator functions, lets look at the iterable `Generator` objects that they return.

## Generator Objects

Traditionally, functions in JavaScript run to completion, and calling a function will return a value when it arrives at the `return` keyword. If the `return` keyword is omitted, a function will implicitly return `undefined`.

In the following code, for example, we declare a `sum()` function that returns a value that is the sum of two integer arguments:

```js
// A regular function that sums two values
function sum(a, b) {
  return a + b
}
```

Calling the function returns a value that is the sum of the arguments:

```js
const value = sum(5, 6) // 11
```

A generator function, however, does not return a value immediately, and instead returns an iterable `Generator` object. In the following example, we declare a function and give it a single return value, like a standard function:

```js
// Declare a generator function with a single return value
function* generatorFunction() {
  return 'Hello, Generator!'
}
```

When we invoke the generator function, it will return the [`Generator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) object, which we can assign to a variable:

```js
// Assign the Generator object to generator
const generator = generatorFunction()
```

If this were a regular function, we would expect `generator` to give us the string returned in the function. However, what we actually get is an object in a `suspended` state. Calling `generator` will therefore give output similar to the following:

```terminal
generatorFunction {<suspended>}
  __proto__: Generator
  [[GeneratorLocation]]: VM272:1
  [[GeneratorStatus]]: "suspended"
  [[GeneratorFunction]]: ƒ* generatorFunction()
  [[GeneratorReceiver]]: Window
  [[Scopes]]: Scopes[3]
```

The `Generator` object returned by the function is an [_iterator_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol). An iterator is an object that has a `next()` method available, which is used for iterating through a sequence of values. The `next()` method returns an object with `value` and `done` properties. `value` represent the returned value, and `done` indicates whether the iterator has run through all its values or not.

Knowing this, let's call `next()` on our `generator` and get the current value and state of the iterator:

```js
// Call the next method on the Generator object
generator.next()
```

This will give the following output:

```terminal
{value: "Hello, Generator!", done: true}
```

The value returned from calling `next()` is `Hello, Generator!`, and the state of `done` is `true`, because this value came from a `return` that closed out the iterator. Since the iterator is done, the generator function's status will change from `suspended` to `closed`. Calling `generator` again will give the following:

```terminal
generatorFunction {<closed>}
```

As of right now, we've only demonstrated how a generator function can be a more complex way to get the `return` value of a function. But generator functions also have unique features that distinguish them from normal functions. In the next section, we'll learn about the `yield` operator and see how a generator can pause and resume execution.

## `yield` Operators

Generators introduce a new keyword to JavaScript: [`yield`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield). `yield` can pause a generator function and return the value that follows `yield`, providing a lightweight way to iterate through values.

In this example, we'll pause the generator function three times with different values, and return a value at the end. Then we will assign our `Generator` object to the `generator` variable.

```js
// Create a generator function with multiple yields
function* generatorFunction() {
  yield 'Neo'
  yield 'Morpheus'
  yield 'Trinity'

  return 'The Oracle'
}

const generator = generatorFunction()
```

Now, when we call `next()` on the generator function, it will pause every time it encounters `yield`. `done` will be set to `false` after each `yield`, indicating that the generator has not finished. Once it encounters a `return`, or there are no more `yield`s encountered in the function, `done` will flip to `true`, and the generator will be finished.

Use the `next()` method four times in a row:

```js
// Call next four times
generator.next()
generator.next()
generator.next()
generator.next()
```

These will give the following four lines of output in order:

```terminal
{value: "Neo", done: false}
{value: "Morpheus", done: false}
{value: "Trinity", done: false}
{value: "The Oracle", done: true}
```

Note that a generator does not require a `return`; if omitted, the last iteration will return `{value: undefined, done: true}`, as will any subsequent calls to `next()` after a generator has completed.

## Iterating Over a Generator

Using the `next()` method, we manually iterated through the `Generator` object, receiving all the `value` and `done` properties of the full object. However, just like [`Array`](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript), [`Map`, and `Set`](https://www.digitalocean.com/community/tutorials/understanding-map-and-set-objects-in-javascript), a `Generator` follows the [iteration protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), and can be iterated through with [`for...of`](https://www.digitalocean.com/community/tutorials/how-to-construct-for-loops-in-javascript#for%E2%80%A6of-loop):

```js
// Iterate over Generator object
for (const value of generator) {
  console.log(value)
}
```

This will return the following:

```terminal
Neo
Morpheus
Trinity
```

The [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) can also be used to assign the values of a `Generator` to an array.

```js
// Create an array from the values of a Generator object
const values = [...generator]

console.log(values)
```

This will give the following array:

```terminal
(3) ["Neo", "Morpheus", "Trinity"]
```

Both spread and `for...of` will not factor the `return` into the values (in this case, it would have been `'The Oracle'`).

> **Note**: While both of these methods are effective for working with finite generators, if a generator is dealing with an infinite data stream, it won't be possible to use spread or `for...of` directly without creating an infinite loop.

## Closing a Generator

As we've seen, a generator can have its `done` property set to `true` and its status set to `closed` by iterating through all its values. There are two additional ways to immediately cancel a generator: with the `return()` method, and with the `throw()` method.

With `return()`, the generator can be terminated at any point, just as if a `return` statement had been in the function body. You can pass an argument into `return()`, or leave it blank for an undefined value.

To demonstrate `return()`, we'll create a generator with a few `yield` values but no `return` in the function definition:

```js
function* generatorFunction() {
  yield 'Neo'
  yield 'Morpheus'
  yield 'Trinity'
}

const generator = generatorFunction()
```

The first `next()` will give us `'Neo'`, with `done` set to `false`. If we invoke a `return()` method on the `Generator` object right after that, we'll now get the passed value and `done` set to `true`. Any additional call to `next()` will give the default completed generator response with an undefined value.

To demonstrate this, run the following three methods on `generator`:

```js
generator.next()
generator.return('There is no spoon!')
generator.next()
```

This will give the three following results:

```terminal
{value: "Neo", done: false}
{value: "There is no spoon!", done: true}
{value: undefined, done: true}
```

The `return()` method forced the `Generator` object to complete and to ignore any other `yield` keywords. This is particularly useful in asynchronous programming when you need to make functions cancelable, such as interrupting a web request when a user wants to perform a different action, as it is not possible to directly cancel a Promise.

If the body of a generator function has a way to catch and deal with errors, you can use the `throw()` method to throw an error into the generator. This starts up the generator, throws the error in, and terminates the generator.

To demonstrate this, we will put a [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) inside the generator function body and log an error if one is found:

```js
// Define a generator function
function* generatorFunction() {
  try {
    yield 'Neo'
    yield 'Morpheus'
  } catch (error) {
    console.log(error)
  }
}

// Invoke the generator and throw an error
const generator = generatorFunction()
```

Now, we will run the `next()` method, followed by `throw()`:

```js
generator.next()
generator.throw(new Error('Agent Smith!'))
```

This will give the following output:

```terminal
{value: "Neo", done: false}
Error: Agent Smith!
{value: undefined, done: true}
```

Using `throw()`, we injected an error into the generator, which was caught by the `try...catch` and logged to the console.

## Generator Object Methods and States

The following table shows a list of methods that can be used on `Generator` objects:

| Method                                                                                                          | Description                                               |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [`next()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next)     | Returns the next value in a generator                     |
| [`return()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return) | Returns a value in a generator and finishes the generator |
| [`throw()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/throw)   | Throws an error and finishes the generator                |

The next table lists the possible states of a `Generator` object:

| Status      | Description                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| `suspended` | Generator has halted execution but has not terminated                                                |
| `closed`    | Generator has terminated by either encountering an error, returning, or iterating through all values |

## `yield` Delegation

In addition to the regular `yield` operator, generators can also use the [`yield*`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*) expression to delegate further values to another generator. When the `yield*` is encountered within a generator, it will go inside the delegated generator and begin iterating through all the `yield`s until that generator is closed. This can be used to separate different generator functions to semantically organize your code, while still having all their `yield`s be iterable in the right order.

To demonstrate, we can create two generator functions, one of which will `yield*` operate on the other:

```js
// Generator function that will be delegated to
function* delegate() {
  yield 3
  yield 4
}

// Outer generator function
function* begin() {
  yield 1
  yield 2
  yield* delegate()
}
```

Next, let's iterate through the `begin()` generator function:

```js
// Iterate through the outer generator
const generator = begin()

for (const value of generator) {
  console.log(value)
}
```

This will give the following values in the order they are generated:

```terminal
1
2
3
4
```

The outer generator yielded the values `1` and `2`, then delegated to the other generator with `yield*`, which returned `3` and `4`.

`yield*` can also delegate to any object that is iterable, such as an Array or a Map. Yield delegation can be helpful in organizing code, since any function within a generator that wanted to use `yield` would also have to be a generator.

## Infinite Data Streams

One of the useful aspects of generators is the ability to work with infinite data streams and collections. This can be demonstrated by creating an infinite loop inside a generator function that increments a number by one.

In the following code block, we define this generator function and then initiate the generator:

```js
// Define a generator function that increments by one
function* incrementer() {
  let i = 0

  while (true) {
    yield i++
  }
}

// Initiate the generator
const counter = incrementer()
```

Now, iterate through the values using `next()`:

```js
// Iterate through the values
counter.next()
counter.next()
counter.next()
counter.next()
```

This will give the following output:

```terminal
{value: 0, done: false}
{value: 1, done: false}
{value: 2, done: false}
{value: 3, done: false}
```

The function returns successive values in the infinite loop while the `done` property remains `false`, ensuring that it will not finish.

With generators, you don't have to worry about creating an infinite loop, because you can halt and resume execution at will. However, you still have to have caution with how you invoke the generator. If you use spread or `for...of` on an infinite data stream, you will still be iterating over an infinite loop all at once, which will cause the environment to crash.

For a more complex example of an infinite data stream, we can create a Fibonacci generator function. The Fibonacci sequence, which continuously adds the two previous values together, can be written using an infinite loop within a generator as follows:

```js
// Create a fibonacci generator function
function* fibonacci() {
  let prev = 0
  let next = 1

  yield prev
  yield next

  // Add previous and next values and yield them forever
  while (true) {
    const newVal = next + prev

    yield newVal

    prev = next
    next = newVal
  }
}
```

To test this out, we can loop through a finite number and print the Fibonacci sequence to the console.

```js
// Print the first 10 values of fibonacci
const fib = fibonacci()

for (let i = 0; i < 10; i++) {
  console.log(fib.next().value)
}
```

This will give the following:

```terminal
0
1
1
2
3
5
8
13
21
34
```

The ability to work with infinite data sets is one part of what makes generators so powerful. This can be useful for examples like implementing infinite scroll on the frontend of a web application, or operating on sound wave data.

## Passing Values in Generators

Throughout this article, we've used generators as iterators, and we've yielded values in each iteration. In addition to producing values, generators can also consume values from `next()`. In this case, `yield` will contain a value.

It's important to note that the first `next()` that is called will not pass a value, but will only start the generator. To demonstrate this, we can log the value of `yield` and call `next()` a few times with some values.

```js
function* generatorFunction() {
  console.log(yield)
  console.log(yield)

  return 'The end'
}

const generator = generatorFunction()

generator.next()
generator.next(100)
generator.next(200)
```

This will give the following output:

```terminal
100
200
{value: "The end", done: true}
```

It is also possible to seed the generator with an initial value. In the following example, we'll make a `for` loop and pass each value into the `next()` method, but pass an argument to the inital function as well:

```js
function* generatorFunction(value) {
  while (true) {
    value = yield value * 10
  }
}

// Initiate a generator and seed it with an initial value
const generator = generatorFunction(0)

for (let i = 0; i < 5; i++) {
  console.log(generator.next(i).value)
}
```

We'll retrieve the value from `next()` and yield a new value to the next iteration, which is the previous value times ten. This will give the following:

```terminal
0
10
20
30
40
```

Another way to deal with starting up a generator is to wrap the generator in a function that will always call `next()` once before doing anything else.

## `async`/`await` with Generators

An [asynchronous function](https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js) is a type of function available in ES6+ JavaScript that makes working with asynchronous data simpler and easier to understand by making it appear synchronous. Generators have a more extensive array of capabilities than asynchronous functions, but are capable of replicating similar behavior. Implementing asynchronous programming in this way can increase the flexibility of your code.

In this section, we will demonstrate an example of reproducing [`async`/`await`](https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js#writing-javascript-with-asyncawait) with generators.

Let's build an asynchronous function that uses [the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to get data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) (which provides example [JSON](https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript) data for testing purposes) and logs the response to the console.

Start out by defining an asynchronous function called `getUsers` that fetches data from the API and returns an array of objects, then call `getUsers`:

```js
const getUsers = async function() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const json = await response.json()

  return json
}

// Call the getUsers function and log the response
getUsers().then(response => console.log(response))
```

This will give the following JSON data:

```terminal

[ {id: 1, name: "Leanne Graham" ...},
  {id: 2, name: "Ervin Howell" ...},
  {id: 3, name": "Clementine Bauch" ...},
  {id: 4, name: "Patricia Lebsack"...},
  {id: 5, name: "Chelsey Dietrich"...},
  {id: 6, name: "Mrs. Dennis Schulist"...},
  {id: 7, name: "Kurtis Weissnat"...},
  {id: 8, name: "Nicholas Runolfsdottir V"...},
  {id: 9, name: "Glenna Reichert"...},
  {id: 10, name: "Clementina DuBuque"...}]
```

Using generators, we can create something almost identical that does not use the `async`/`await` keywords. Instead, it will use a new function we create, and `yield` values instead of `await` promises.

In the following code block, we define a function called `getUsers` that uses our new `asyncAlt` function (which we will write later on) to mimic `async`/`await`.

```js
const getUsers = asyncAlt(function*() {
  const response = yield fetch('https://jsonplaceholder.typicode.com/users')
  const json = yield response.json()

  return json
})

// Invoking the function
getUsers().then(response => console.log(response))
```

As we can see, it looks almost identical to the `async`/`await` implementation, except that there is a generator function being passed in that yields values.

Now we can create an `asyncAlt` function that resembles an asynchronous function. `asyncAlt` has a generator function as a parameter, which is our function that yields the promises that `fetch` returns. `asyncAlt` returns a function itself, and resolves every promise it finds until the last one:

```js
// Define a function named asyncAlt that takes a generator function as an argument
function asyncAlt(generatorFunction) {
  // Return a function
  return function() {
    // Create and assign the generator object
    const generator = generatorFunction()

    // Define a function that accepts the next iteration of the generator
    function resolve(next) {
      // If the generator is closed and there are no more values to yield,
      // resolve the last value
      if (next.done) {
        return Promise.resolve(next.value)
      }

      // If there are still values to yield, they are promises and
      // must be resolved.
      return Promise.resolve(next.value).then(response => {
        return resolve(generator.next(response))
      })
    }

    // Begin resolving promises
    return resolve(generator.next())
  }
}
```

This will give the same output as the `async`/`await` version:

```terminal
[ {id: 1, name: "Leanne Graham" ...},
  {id: 2, name: "Ervin Howell" ...},
  {id: 3, name": "Clementine Bauch" ...},
  {id: 4, name: "Patricia Lebsack"...},
  {id: 5, name: "Chelsey Dietrich"...},
  {id: 6, name: "Mrs. Dennis Schulist"...},
  {id: 7, name: "Kurtis Weissnat"...},
  {id: 8, name: "Nicholas Runolfsdottir V"...},
  {id: 9, name: "Glenna Reichert"...},
  {id: 10, name: "Clementina DuBuque"...}]
```

Note that this implementation is for demonstrating how generators can be used in place of `async`/`await`, and is not a production-ready design. It does not have error handling set up, nor does it have the ability to pass parameters into the yielded values. Though this method can add flexibility to your code, often `async/await` will be a better choice, since it abstracts implementation details away and lets you focus on writing productive code.

## Conclusion

Generators are processes that can halt and resume execution. They are a powerful, versatile feature of JavaScript, although they are not commonly used. In this tutorial, we learned about generator functions and generator objects, methods available to generators, the `yield` and `yield*` operators, and using generators with finite and infinite data sets. We also explored one way to implement asynchronous code without nested callbacks or long promise chains.

If you would like to learn more about JavaScript syntax, take a look at our [Understanding This, Bind, Call, and Apply in JavaScript](/this-bind-call-apply-javascript) and [Understanding Map and Set Objects in JavaScript](/understanding-map-and-set-javascript) tutorials.
