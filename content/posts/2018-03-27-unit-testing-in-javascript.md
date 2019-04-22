---
date: 2018-03-27
title: 'Unit Testing in JavaScript with Mocha'
template: post
thumbnail: '../thumbnails/mocha.png'
slug: unit-testing-in-javascript
categories:
  - Tools
  - JavaScript
tags:
  - javascript
  - mocha
  - testing
---

**Test-driven development** (TDD) is an approach to development that consists of writing tests, followed by production code, and refactoring as needed. The tests are written to fail initially, and the developer writes code to fulfill the requirements of the test so they pass.

In this tutorial, we'll learn how to implement the TDD process by developing a simple command line calculator app from scratch with Node.js. In case you're unfamiliar, **Node.js** allows the use of JavaScript on the server side. [Read the getting started article](/how-to-install-and-use-node-js-and-npm-mac-and-windows/) to get up to speed with Node.js. We're going to set up tests with [Mocha](https://mochajs.org/), a testing framework, for this app.

You'll also learn how to use the built-in readline module in Node.js to send commands to the program via the command line.

- [View Source on GitHub](https://github.com/taniarascia/calc)

#### Goals

- The application should **add, subtract, divide, and multiply** any two numbers
- The application should **display a warning and exit** if it receives any input that does not consist of numbers
- The system will provide a **command line interface** that allows the end users to utilize program functionality

Now that we know what app should do, we can begin setting up the environment for testing and developing.

#### Prerequisites

- In order to follow along with this tutorial, you should have a Node.js server environment and npm installed on your computer. [Learn about Node.js and npm](/how-to-install-and-use-node-js-and-npm-mac-and-windows/) and how to install them on Mac/Windows.

- You will need to have a working knowledge of JavaScript [syntax and code structure](https://www.digitalocean.com/community/tutorials/understanding-syntax-and-code-structure-in-javascript), [data types](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript), [mathematical operations](https://www.digitalocean.com/community/tutorials/how-to-do-math-in-javascript-with-operators) and [conditional statements](https://www.digitalocean.com/community/tutorials/how-to-write-conditional-statements-in-javascript).

## Setting Up Our Environment

Since our application runs in Node.js, we will need to set up a local environment for our files and dependencies.

Create a new directory called **calc**. In the command prompt, navigate to the directory and initialize a new project using `npm init`, which will create a new **package.json** file for our program.

```bash
npm init
```

You will be prompted to enter the package name, version, description, and other common package details. We can enter the name **calc.js**, and continue along pressing `ENTER` for all the default items, giving a description if you'd like. When you reach `test command`, type `mocha`, which is the testing framework we will be using.

```bash
test command: mocha
```

Continue entering the defaults until the walkthrough is complete. The script will create a **package.json** file that looks like this:

<div class="filename">package.js</div>

```js
{
  "name": "calc.js",
  "version": "1.0.0",
  "description": "A simple calculator application built with Node.js",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "author": "",
  "license": "ISC"
}
```

Our final step for setting up the environment is to install Mocha, the JavaScript testing framework we will be using for our app. Input the following command to install Mocha:

```bash
npm install --save-dev mocha
```

Running this command will add a **node_modules** directory, a **package-lock.json** file, and the following code to your original **package.json**:

<div class="filename">package.json</div>

```js
"devDependencies": {
  "mocha": "^4.0.1"
}
```

We have our Node project, with the testing script and dependency loaded in. Let's make sure our testing framework is working properly.

Create a **test.js** file. We will use the built-in Node.js [assert module](https://nodejs.org/api/assert.html) to test if `true` is equal to `true`. Since it is, the test should pass.

test.js

```js
const assert = require('assert')

it('should return true', () => {
  assert.equal(true, true)
})
```

Now in the command prompt, run the test.

````bash
npm test

```terminal

> mocha

  ✓ should return true

  1 passing (8ms)
````

The test is passing as expected, so our testing environment setup is complete. Remove everything except the first line from **test.js**.

<div class="filename">test.js</div>

```js
const assert = require('assert')
```

**test.js** is the file we will use for testing throughout the creation of our app. Let's create two additional files: **operations.js** for our arithmetic and validation functions, and **calc.js** for our app itself. We want to keep our files separate so they don't get too long and complex. Below is our list of files.

- calc.js
- node_modules
- operations.js
- package-lock.json
- package.json
- test.js

From here, we will begin adding our first actual test for the application.

## Adding Mathematical Operations

The first requirement for our application is that it should add, subtract, divide, and multiply any two numbers. This means we'll have to create a function for each of those mathematical operations.

Let's start with addition. We will write a test to calculate the sum of two numbers that we know will be true. The below code is testing if `1` plus `3` equals `4` in the `add()` function.

<div class="filename">test.js</div>

```js
const assert = require('assert')

it('correctly calculates the sum of 1 and 3', () => {
  assert.equal(add(1, 3), 4)
})
```

After running our test with `npm test`, we will get the following output:

```terminal
> mocha

  0 passing (9ms)
  1 failing

  1) correctly calculates the sum of 1 and 3:
      ReferenceError: add is not defined
      at Context.it (test.js:5:16)

npm ERR! Test failed.  See above for more details.
```

The test has failed, giving us the following information: `ReferenceError: add is not defined`. We're testing the `add()` function which does not exist yet, so this error makes perfect sense.

In **operations.js**, we're going to create the `add()` function.

<div class="filename">operations.js</div>

```js
const add = (x, y) => +x + +y
```

The `add()` function takes two arguments (`x` and `y`) and returns their sum. You may notice that it is written as `(+x) + (+y)` instead of `x + y`. We are using the [unary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_plus) to coerce the parameters into numbers in case the input is a string.

> **Note:** This function is using ES6 arrow functions and implicit returns. Read more about [the different ways to write a function in JavaScript](https://www.digitalocean.com/community/tutorials/how-to-define-functions-in-javascript) for increased clarity.

Since we're using Node.js and breaking our code into multiple files, we'll need to use `module.exports` to export the code.

<div class="filename">operations.js</div>

```js
const add = (x, y) => +x + +y

module.exports = { add }
```

At the top of **test.js**, we will import our **operations.js** code with `require()`. Since we're pulling in the function through the `operations` variable, we'll change `add()` to `operations.add()`.

<div class="filename">test.js</div>

```js
const operations = require('./operations.js')
const assert = require('assert')

it('correctly calculates the sum of 1 and 3', () => {
  assert.equal(operations.add(1, 3), 4)
})
```

Run the test.

```bash
npm test
```

```terminal
> mocha

  ✓ correctly calculates the sum of 1 and 3

  1 passing (8ms)
```

Now we have a working function, and our test passes as expected. Since the other arithmetic functions all follow the same pattern, we can make tests for `subtract()`, `multiply()`, and `divide()`, as well as one to test negative integers.

<div class="filename">test.js</div>

```js
it('correctly calculates the sum of 1 and 3', () => {
  assert.equal(operations.add(1, 3), 4)
})

it('correctly calculates the sum of -1 and -1', () => {
  assert.equal(operations.add(-1, -1), -2)
})

it('correctly calculates the difference of 33 and 3', () => {
  assert.equal(operations.subtract(33, 3), 30)
})

it('correctly calculates the product of 12 and 12', () => {
  assert.equal(operations.multiply(12, 12), 144)
})

it('correctly calculates the quotient of 10 and 2', () => {
  assert.equal(operations.divide(10, 2), 5)
})
```

We will create and export all our functions in **test.js**...

<div class="filename">test.js</div>

```js
const add = (x, y) => +x + +y
const subtract = (x, y) => +x - +y
const multiply = (x, y) => +x * +y
const divide = (x, y) => +x / +y

module.exports = {
  add,
  subtract,
  multiply,
  divide,
}
```

...and run our new tests.

```bash
npm test
```

```terminal
> mocha

  ✓ correctly calculates the sum of 1 and 3
  ✓ correctly calculates the sum of -1 and -1
  ✓ correctly calculates the difference of 33 and 3
  ✓ correctly calculates the product of 12 and 12
  ✓ correctly calculates the quotient of 10 and 2

  5 passing (8ms)
```

All of our tests are passing, so now we can be sure that the main objectives of our application will function properly. Moving forward, we will add some extra validation.

## Adding Validation

Right now, if the user enters any number and selects an operation, everything works as expected. However, what would happen if they tried to find the sum of a number and a string✓ The application would attempt to do the calculation, but as it's expecting numbers, the output would be `NaN`, or Not a Number.

Instead of just returning strange output, we want to fill the second goal of our application - that it should display a warning and exit if it receives any input that is not a number.

First, we'll have to create a function that tests whether the input is a number or not. The application will take two numbers, so we'll test three things: if both inputs are a number, if only one is a number, and if neither one is a number.

<div class="filename">test.js</div>

```js
it('indicates failure when a string is used instead of a number', () => {
  assert.equal(operations.validateNumbers('sammy', 5), false)
})

it('indicates failure when two strings is used instead of numbers', () => {
  assert.equal(operations.validateNumbers('sammy', 'sammy'), false)
})

it('successfully runs when two numbers are used', () => {
  assert.equal(operations.validateNumbers(5, 5), true)
})
```

Our `validateNumbers()` function will test both parameters. The `isNaN()` function will check if the parameters are _not_ numbers, and will return `false` if so. Otherwise it will return `true`, and the validation will be successful.

<div class="filename">operations.js</div>

```js
const validateNumbers = (x, y) => {
  if (isNaN(x) && isNaN(y)) {
    return false
  }
  return true
}
```

Make sure to add `validateNumbers` to the `module.exports` at the bottom of the file. Now we can run our new tests.

```bash
npm test

```

```terminal
1) indicates failure when a string is used instead of a number
✓ indicates failure when two strings is used instead of numbers
✓ successfully runs when two numbers are used

7 passing (12ms)
1 failing


1) indicates failure when a string is used instead of a number:

    AssertionError [ERR_ASSERTION]: true == false
    + expected - actual

    -true
    +false
```

Two of them passed, but one failed. Testing for success on two numbers passed, as well as testing for failure on two strings. Our first validation test, one string and one number, failed.

Looking back at our function, it requires that _both_ parameters must be `NaN` to fail. We want it to fail even if only one parameter is `NaN`, so we will change `&&` to `||`.

<div class="filename">operations.js</div>

```js
const validateNumbers = (x, y) => {
  if (isNaN(x) || isNaN(y)) {
    return false
  }
  return true
}
```

Once we make this change and run `npm test`, all eight tests will pass.

```terminal
✓ indicates failure when a string is used instead of a number
✓ indicates failure when two strings is used instead of numbers
✓ successfully runs when two numbers are used

8 passing (9ms)
```

All of the functionality of our application has been tested. The functions have been proven to successfully do mathematical operations and validate input. The final step is creating the interface for the user.

## Creating Final Command Line Interface

We have the necessary functions to do arithmetic and validate, but there is currently no way for a user to access these functions. It will be necessary to utilize an interface. A user interface can be a **graphical user interface** (GUI) or **command line interface** (CLI). We are going to make our application using a command line interface.

Currently, our **calc.js** file is empty. This is where our application is going to live. To begin, we will pull in the functions from **operations.js**.

calc.js

```js
const operations = require('./operations.js')
```

Our interface itself will use the [Readline](https://nodejs.org/api/readline.html) module, a built-in Node.js CLI.

<div class="filename">calc.js</div>

```js
const readline = require('readline')
```

Now that we're pulling in all our requirements, we can begin building the app. We will access `readline` through the `rl` variable to create the interface.

<div class="filename">calc.js</div>

```js
// Use readline to create command line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
```

The first thing we'll want the user to see when they run the program is the initial welcome screen, which tells them what they've opened, and the instructions for usage. We will do this with a `console.log()`.

<div class="filename">calc.js</div>

```js
console.log(`
Calc.js

Welcome to the Node.js Calculator app! 
Version: 1.0.0.

Usage: The user will be prompted for two numbers, 
then asked to select their operation of choice.
`)
```

Before we get started with the actual functionality of the calculator, let's test of our `console.log()` is working properly. We'll make our app print out the message, then exit. `readline` will use the `rl.close()` method to exit.

<div class="filename">calc.js</div>

```js
rl.close()
```

To run a command line application with node, you will type `node` followed by the filename.

```bash
node calc.js
```

```terminal
Calc.js

Welcome to the Node.js Calculator app!
Version: 1.0.0.

Usage: The user will be prompted for two numbers,
then asked to select their operation of choice.
```

Our welcome screen displays, then the program terminates. The next step will be to take some user input. We're going to require three in total: two numbers, and a choice of operation. We will request each input with the `rl.question()` method.

<div class="filename">calc.js</div>

```js
rl.question('Enter the first number: ', x => {
  rl.question('Enter the second number: ', y => {
    rl.question(
      `
    Please select from the following options:
    
    [1] Addition (+)
    [2] Subtraction (-)
    [3] Multiplication (*)
    [4] Division (/)
    
    Enter your choice: `,
      choice => {
        // additional code to be added here
        rl.close()
      }
    )
  })
})
```

Our first number will be entered with the parameter of `x`, the second number with `y`, and the operation selection with `choice`. At this point, running the program will request the desired input, but won't do anything with it.

After our third question, the first thing we'll want to do is validate the input to ensure only numbers are being entered. We're going to reference the `validateNumbers()` function. Using the [logical NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_NOT) operator, we will test if the parameter values are _not_ numbers, and end the program if so.

<div class="filename">calc.js</div>

```js
if (!operations.validateNumbers(x, y)) {
  console.log('Only numbers are allowed! Please restart the program.')
}
```

If all input is valid and correct, we will want to move forward with the process and run the respective mathematical operations that we created earlier. We will use a [`switch` statement](https://www.digitalocean.com/community/tutorials/how-to-use-the-switch-statement-in-javascript) to execute code based on the four possible choices, and output the result of the operation. If an invalid choice is made, the `default` code block will run, telling the user to start over.

<div class="filename">calc.js</div>

```js
if (!operations.validateNumbers(x, y)) {
  console.log('Only numbers are allowed! Please restart the program.')
} else {
  switch (choice) {
    case '1':
      console.log(`The sum of ${x} and ${y} is ${operations.add(x, y)}.`)
      break
    case '2':
      console.log(`The difference of ${x} and ${y} is ${operations.subtract(x, y)}.`)
      break
    case '3':
      console.log(`The product of ${x} and ${y} is ${operations.multiply(x, y)}.`)
      break
    case '4':
      console.log(`The quotient of ${x} and ${y} is ${operations.divide(x, y)}.`)
      break
    default:
      console.log('Please restart the program and select a number between 1 and 4.')
      break
  }
}
```

> **Note:** The `console.log()` functions are utilizing **template literals**, a type of string that allows expressions and variables to be embedded in the string. For more information, learn [how to work with strings in JavaScript](https://www.digitalocean.com/community/tutorials/how-to-work-with-strings-in-javascript).

Here's the final code.

<div class="filename">calc.js</div>

```js
/**
 * A simple Node.js calculator app that uses
 * the built-in Readline command line interface.
 */

const operations = require('./operations.js')
const readline = require('readline')

// Use readline to create command line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log(`
    Calc.js
    Welcome to the Node.js Calculator app! 
    Version: 1.0.0.
    Usage: The user will be prompted for two numbers, 
    then asked to select their operation of choice.
    `)

rl.question('Enter the first number: ', x => {
  rl.question('Enter the second number: ', y => {
    rl.question(
      `
    Please select from the following options:
    [1] Addition (+)
    [2] Subtraction (-)
    [3] Multiplication (*)
    [4] Division (/)
    Enter your choice: `,
      choice => {
        if (!operations.validateNumbers(x, y)) {
          console.log('Only numbers are allowed! Please restart the program.')
        } else {
          switch (choice) {
            case '1':
              console.log(`The sum of ${x} and ${y} is ${operations.add(x, y)}.`)
              break
            case '2':
              console.log(`The difference of ${x} and ${y} is ${operations.subtract(x, y)}.`)
              break
            case '3':
              console.log(`The product of ${x} and ${y} is ${operations.multiply(x, y)}.`)
              break
            case '4':
              console.log(`The quotient of ${x} and ${y} is ${operations.divide(x, y)}.`)
              break
            default:
              console.log('Please restart the program and select a number between 1 and 4.')
              break
          }
        }
        rl.close()
      }
    )
  })
})
```

Our application is now complete. Let's test the final output. We will input `999` and `1`, and request a subtraction operation.

```bash
node calc.js

Enter the first number: 999
Enter the second number: 1
Enter your choice: 2
```

```terminal
The difference of 999 and 1 is 998.
```

Everything went through successfully and our output was as expected. Congratulations! You have successfully created a simple calculator application with Node.js, and learned the basics of the test-driven development methodology along the way.

## Conclusion

If you missed anything or got stuck along the way, you can find the source code on GitHub.

- [View Source on GitHub](https://github.com/taniarascia/calc)

We just covered the basics of test-driven development through the creation of a command line calculator app in Node.js. We used the Mocha framework for testing, and the built-in Node.js Readline module for creating a command line interface.

One option moving forward would be to test and implement new features of the calculator, such as adding the ability to square a number or find the remainder, or you could implement a looping method for the calculator to ask if the user would like to do another calculation after completing one.
