---
date: 2017-09-27
title: 'Using While and Do While Loops in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: while-do-while-loops-javascript
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/using-while-and-do-while-loops-in-javascript)_.

Automation is the technique of making a technique or system operate automatically; in programming, we use **loops** to automate repitious tasks. [Loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) are one of the most useful features of programming languages, and in this this article we will learn about the `while` and `do...while` loops in JavaScript.

The `while` and `do...while` statements in JavaScript are similar to [conditional statements](https://www.digitalocean.com/community/tutorials/how-to-write-conditional-statements-in-javascript), which are blocks of code that will execute if a specified condition results in `true`. Unlike an `if` statement, which only evaluates once, a loop will run multiple times until the condition no longer evaluates to `true`.

Another common type of loop you will encounter is the [`for` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for), which executes a set number of times. `while` and `do...while` loops are conditionally based, and therefore it is not necessary to know beforehand how many times the loop will run.

## While

In JavaScript, a `while` statement is a loop that executes as long as the specified condition evaluates to `true`. The syntax is very similar to an `if` statement, as seen below.

```js
while (condition) {
  // execute code as long as condition is true
}
```

The `while` statement is the simplest loop to construct in JavaScript.

For an example, we will pretend we have an aquarium that has a population limit. For each iteration of the loop, we will add one fish. Once the aquarium has `10` fish, the population limit will be reached, and the program will cease to add more fish.

Without a loop, we might have to write:

<div class="filename">aquarium.js</div>

```js
// Start off with 0 fish
let fish = 0;

fish++
}
```

<div class="filename">aquarium.js</div>

```js
// Set population limit of aquarium to 10
const populationLimit = 10

// Start off with 0 fish
let fish = 0

// Initiate while loop to run until fish reaches population limit
while (fish < populationLimit) {
  // add one fish for each iteration
  fish++
  console.log('The aquarium has room for ' + (populationLimit - fish) + ' more fish.')
}
```

```terminal
The aquarium has room for 9 more fish.
The aquarium has room for 8 more fish.
The aquarium has room for 7 more fish.
The aquarium has room for 6 more fish.
The aquarium has room for 5 more fish.
The aquarium has room for 4 more fish.
The aquarium has room for 3 more fish.
The aquarium has room for 2 more fish.
The aquarium has room for 1 more fish.
The aquarium has room for 0 more fish.
```

In our example, we set out `while` loop to run as long as the number of fish was less than the population limit of the aquarium. For each iteration, one fish would be added to the aquarium until all `10` spots were filled. At that point, the loop would stop running.

## Infinite Loops

An **infinite loop**, as the name suggests, is a loop that will keep running forever. If you accidentally make an infinite loop at some point, it will likely crash your browser or computer. It is important to be aware of infinite loops so you can make sure to avoid them.

The simplest example of an infinite loop is simply setting the condition of the `while` statement to `true`. Below is an example of code that will run forever. It is not necessary to test any infinite loops.

<div class="filename">infiniteLoop.js</div>

```js
// Initiate an infinite loop
while (true) {
  // execute code forever
}
```

An infinite loop will run forever, but the program can be terminated with the `break` keyword. In the below example, we will add an `if` statement to the `while` loop, and when that condition is met, we will terminate the loop with `break`.

<div class="filename">polarBears.js</div>

```js
// Set a condition to true
const iceCapsAreMelting = true
let polarBears = 5

// Initiate infinite loop
while (iceCapsAreMelting) {
  console.log(`There are ${polarBears} polar bears.`)
  polarBears--
  // Terminate infinite loop when following condition is true
  if (polarBears === 0) {
    console.log('There are no polar bears left.')
    break
  }
}
```

```terminal
There are 5 polar bears.
There are 4 polar bears.
There are 3 polar bears.
There are 2 polar bears.
There are 1 polar bears.
There are no polar bears left.
```

Note that this is not necessarily a practical method of creating and terminating a loop, but `break` is a useful keyword to be aware of.

## Do...While

We already learned about the `while` loop, which executes a block of code for as long as a specified condition is true. Building on that is the `do...while` statement, which is very similar to `while` with the major difference being that a `do...while` loop will always execute once, even if the condition is never true.

Below we will demonstrate the syntax of the `do...while` loop.

```js
do {
  // execute code
} while (condition)
```

As you can see, the `do` portion of the loop comes first, and is followed by `while (condition)`. The code block will run, then the condition will be tested as a normal `while` loop.

To test this very quickly, we can set a variable to `0`, increment it inside the `do`, and set our condition to `false`.

```js
// Set variable to 0
let x = 0

do {
  // Increment variable by 1
  x++
  console.log(x)
} while (false)
```

```terminal
1
```

Our output came out to `1`, meaning that the code block ran once before it was stopped by an unsuccessful (`false`) `while` condition. Otherwise, the `do...while` loop can be used for the same purposes as a `while` loop.

## Conclusion

In this article, we learned about the `while` loop, the `do...while` loop, and infinite loops. Automation of repetitive tasks is an extremely important part of programming, and these loops can help make your programs more efficient and concise. To learn more, read about the [while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while) and [do...while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while) loops on the Mozilla Developer Network.
