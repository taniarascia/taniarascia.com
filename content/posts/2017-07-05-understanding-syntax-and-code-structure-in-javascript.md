---
date: 2017-07-05
title: 'Understanding Syntax and Code Structure'
template: post
thumbnail: '../thumbnails/js.png'
slug: understanding-syntax-and-code-structure-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-syntax-and-code-structure-in-javascript)._

### Introduction

Before learning to write in a spoken language, you must first learn the rules of grammar. Here are a few examples of rules you might find in the English language:

- A sentence starts with a capital letter
- A sentence ends in a period
- A new paragraph is indented
- Spoken dialogue is placed inside double quotation marks.

Similarly, all programming languages must adhere to specific rules in order to function. This set of rules that determine the correct structure of programming languages is known as **syntax**. Many programming languages consist largely of similar concepts with variations in syntax.

In this tutorial, we'll go over many of the rules and conventions of JavaScript syntax and code structure.

## Functionality and Readability

Functionality and readability are two important reasons to focus on syntax as you begin to work with JavaScript.

There are some syntax rules that are mandatory for JavaScript functionality. If they are not followed, the console will throw an error and the script will cease execution.

Consider a syntax error in the "Hello, World!" program:

```js
// Example of a broken JavaScript program
console.log("Hello, World!"
```

This code sample is missing the closing parenthesis, and instead of printing the expected "Hello, World!" to the console, the following error will appear:

```terminal
Uncaught SyntaxError: missing ) after argument list
```

The missing `)` must be added before the script will continue to run. This is an example of how a mistake in JavaScript syntax can break the script, as correct syntax must be followed in order for code to run.

Some aspects of JavaScript syntax and formatting are based on different schools of thought. That is, there are stylistic rules or choices that are not mandatory and will not result in errors when the code is run. However, there are many common conventions that are sensible to follow, as developers between projects and codebases will be more familiar with the style. Adhering to common conventions leads to improved readability.

Consider the following three examples of variable assignment.

```js
const greeting='Hello'; // no whitespace between variable & string
const greeting =        'Hello'; // excessive whitespace after assignment
const greeting = 'Hello'; // single whitespace between variable & string
```

Although all three of the examples above will function exactly the same in the output, the third option of `greeting = "Hello"` is by far the most commonly used, and the most readable way of writing the code, especially when considering it within the context of a larger program.

It is important to keep your entire coding project's style consistent. From one organization to another, you will encounter different guidelines to follow, so you must also be flexible.

We'll go over some code examples below for you to familiarize yourself with the syntax and structure of JavaScript code and refer back to this article when in doubt.

## Whitespace

Whitespace in JavaScript consists of spaces, tabs, and newlines (pressing `ENTER` on the keyboard). As demonstrated earlier, excessive whitespace outside of a string and the spaces between operators and other symbols are ignored by JavaScript. This means the following three examples of variable assignment will have the exact same computed output:

```js
const userLocation        =       'New York City, ' + 'NY';
const userLocation = 'New York City, ' + 'NY';
const userLocation = 'New York City, ' + 'NY';
```

`userLocation` will represent "New York City, NY" no matter which of these styles are written in the script, nor will it make a difference to JavaScript whether the whitespace is written with tabs or spaces.

A good rule of thumb to be able to follow the most common whitespace conventions is to follow the same rules as you are used to in math and language grammar.

For example, `let x = 5 * y` is more readable than `let x=5*y`.

One notable exception to this style you may see is during assignment of multiple variables. Note the position of `=` in the following example:

```js
const companyName         = 'DigitalOcean';
const companyHeadquarters = 'New York City';
const companyHandle       = 'digitalocean';
```

All the assignment operators (`=`) are lined up, with the whitespace after the variable. This type of organization structure is not used by every codebase, but can be used to improve readability.

Excess newlines are also ignored by JavaScript. Generally, an extra newline will be inserted above a comment and after a code block.

### Parentheses

For keywords such as `if`, `switch`, and `for`, spaces are usually added before and after the parentheses. Observe the following examples of comparison and loops.

```js
// An example of if statement syntax
if () { }

// Check math equation and print a string to the console
if (4 < 5) {
	console.log("4 is less than 5.");
}

// An example of for loop syntax
for () { }

// Iterate 10 times, printing out each iteration number to the console
for (let i = 0; i <= 10; i++) {
	console.log(i);
}
```

As demonstrated, the `if` statement and `for` loop have whitespace on each side of the parentheses (but not inside the parentheses).

When the code pertains to a function, method or class, the parentheses will be touching the respective name.

```js
// An example function
function functionName() {}

// Initialize a function to calculate the volume of a cube
function cube(number) {
  return Math.pow(number, 3)
}

// Invoke the function
cube(5);
```

In the above example, `cube()` is a function, and the pair of parentheses `()` will contain the parameters or arguments. In this case, the parameters are `number` or `5`, respectively. Although `cube ()` with an extra space is valid in that the code will execute as expected, it is almost never seen. Keeping them together helps easily associate the function name to the parentheses pair and any associated passed arguments.

## Semicolons

JavaScript programs consist of a series of instructions known as statements, just as written paragraphs consist of a series of sentences. While a sentence will end with a period, a JavaScript statement often ends in a semicolon (`;`).

```js
// A single JavaScript statement
const now = new Date();
```

If two or more statements are next to each other, it is obligatory to separate them with a semicolon.

```js
// Get the current timestamp and print it to the console
const now = new Date(); console.log(now)
```

If statements are separated by a newline, the semicolon is optional.

```js
// Two statements separated by newlines
const now = new Date()
console.log(now)
```

A safe and common convention is to separate statements with a semicolon regardless of newlines.

```js
// Two statements separated by newlines and semicolons
const now = new Date();
console.log(now);
```

Semicolons are also required between the initialization, condition, and increment or decrement of a `for` loop.

```js
for (initialization; condition; increment) {
  // run the loop
}
```

Semicolons are _not_ included after any sort of block statement, such as `if`, `for`, `do`, `while`, `class`, `switch`, and `function`. These block statements are contained in curly brackets `{}`. Note the examples below.

```js
// Initialize a function to calculate the area of a square
function square(number) {
  return Math.pow(number, 2)
}

// Calculate the area of a number greater than 0
if (number > 0) {
  square(number)
}
```

Be careful, as not all code encased in curly brackets will end without a semicolon. Objects are encased in curly brackets, and should end in a semicolon if you're using semicolons.

```js
// An example object
const objectName = {};

// Initialize triangle object
const triangle = {
  type: 'right',
  angle: 90,
  sides: 3,
};
```

It is widely accepted practice to include semicolons after every JavaScript statement except block statements, which end in curly brackets.

## Indentation

A complete JavaScript program can technically be written on a single line. However, this would quickly become very difficult to read and maintain. Instead, we use newlines and indentation

Here's an example of a conditional `if`/`else` statement, written on either one line or with newlines and indentation.

```js
// Conditional statement written on one line
if (x === 1) {  /* execute code if true */ } else {  /* execute code if false */ }

// Conditional statement with indentation
if (x === 1) {
  // execute code if true
} else {
  // execute code if false
}
```

Notice that any code included within a block is indented. The indentation can be done with two spaces, four spaces, or by pressing the tab character. Whether tabs or spaces are used is dependent on either your personal preference (for a solo project) or your organization's guidelines (for a collaborative project).

Including the opening brace at the end of the first line, as in the above example, is the conventional way to structure JavaScript block statements and objects. Another way you may see block statements written is with the braces on their own lines.

```js
// Conditional statement with braces on newlines
if (x === 1) 
{
  // execute code if true
} 
else 
{
  // execute code if false
}
```

This style is much less common in JavaScript as it is in other languages, but not unheard of.

Any nested block statement will be indented further.

```js
// Initialize a function
function isEqualToOne(x) {
  // Check if x is equal to one
  if (x === 1) {
    // on success, return true
    return true;
  } else {
    return false;
  }
}
```

Proper indentation of your code is imperative to maintain readability and to mitigate confusion. One exception to this rule to keep in mind is that compressed libraries will have unnecessary characters removed, therefore rendering file sizes smaller to enable faster page load times (as in `[jquery.min.js](https://jquery.com/download/)` and `[d3.min.js](https://d3js.org/)`).

## Identifiers

The name of a variable, function, or property is known as an **identifier** in JavaScript. Identifiers consist of letters and numbers, but they cannot include any symbol outside of `$` and `_`, and cannot begin with a number.

### Case Sensitive

These names are case sensitive. The following two examples, `myVariable` and `myvariable` would refer to two distinct variables.

```js
var myVariable = 1;
var myvariable = 2;
```

The convention of JavaScript names is that they are written in camelCase, meaning the first word is lowercase but every following word starts with an uppercase letter. You may also see global variables or constants written in all uppercase, separated by underscores.

```js
const INSURANCE_RATE = 0.4;
```

The exception to this rule is class names, which are often written with every word starting in an uppercase letter (PascalCase).

```js
// Initialize a class
class ExampleClass {
  constructor() {}
}
```

In order to ensure that code is readable, it is best to use clearly different identifiers throughout your program files.

### Reserved Keywords

Identifiers also must not consist of any reserved keywords. Keywords are words in the JavaScript language that have a built-in functionality, such as `var`, `if`, `for`, and `this`.

You would not, for example, be able to assign a value to a variable named `var`.

```js
var var = "Some value";
```

Since JavaScript understands `var` to be a keyword, this will result in a syntax error:

```terminal
SyntaxError: Unexpected token (1:4)
```

For a complete reference, please view this [list of reserved keywords (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Reserved_keywords_as_of_ECMAScript_2015)

## Conclusion

This article provided an overview of the basic syntax and code structure of JavaScript. Syntax is important both for proper execution of the program and for readability and maintainability for both yourself and collaborator on your code.

We reviewed many common conventions of JavaScript syntax and style in this article, but at the end of the day the most important thing to remember is to be flexible and consistent with your team or organization.
