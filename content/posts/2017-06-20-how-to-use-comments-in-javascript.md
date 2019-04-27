---
date: 2017-06-20
title: 'How To Write Comments in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-write-comments-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-write-comments-in-javascript)._

### Introduction

In programming, our first consideration is usually the machine — how the computer is reading and interpreting the code we write. However, it's equally important to consider the people who will be reading and working with the code. Whether you're working with a team or on your own, you will need to learn to properly comment and structure your code for human readers.

Comments are annotations in the source code of a program that are ignored by the interpreter, and therefore have no effect on the actual output of the code. Comments can be immensely helpful in explaining the intent of what your code is or should be doing.

As a developer, it can be frustrating to delve into code written by someone else that was not properly commented, and it's remarkably easy to forget what your own code meant when you're no longer immersed in the context of a program. Commenting your code early on will reinforce good programming habits throughout your career to avoid these issues later on.

## Comment Syntax

Let's take a quick look at the two different types of JavaScript comment syntax.

**Single-line** comments are written with two forward slashes (`//`):

```js
// This is a comment
```

All characters immediately following the `//` syntax until the end of the line will be ignored by JavaScript.

**Block** comments, sometimes referred to as **mutli-line** comments, are written with opening tags (`/*`) and closing tags (`*/`). If you know CSS, then you're already familiar with block-level comments.

```js
/* This is
a comment */
```

Everything between the opening and closing tag in the code block above will be ignored.

Both single-line and multi-line comments are written above the code they are designated to explain, as demonstrated in this "Hello, World!" example:

```js
// Print "Hello, World!" to the console
console.log('Hello, World!')
```

When writing comments, indent them at the same level as the code immediately below them:

```js
// Initialize a function
function alphabetizeOceans() {
  // Define oceans variable as a list of strings
  const oceans = ['Pacific', 'Atlantic', 'Indian', 'Antarctic', 'Arctic']

  // Print alphabetized array to the console
  console.log(oceans.sort())
}
```

Note that comments are just as much a part of the code as the program itself. Outdated comments can be more of a detriment than no comment at all, so remember to maintain and update comments regularly along with everything else.

## Inline Comments

Single-line comments are referred to as **inline comments** when they appear at the end of a line of code.

```js
let x = 99 // assign numerical value to x
let y = x + 2 // assign the sum of x + 2 to y
```

Inline comments can be used for quick annotation on small, specific snippets of content. Since the comment should only relate to the exact line it's written on, it is the most obvious type of comment.

Remember that there is no way to end a single line comment on a line, so make sure not to put any code after the `//` syntax, as seen in the example below.

```js
for (let i = 0; i === 10; i++) // for loop that runs ten times {
	// Running this code results in a syntax error
}
```

Though inline comments can be useful, they should be used sparingly — code covered in an abundance of inline comments will quickly become messy and therefore difficult to read.

## Block Comments

Block-level comments, or multi-line comments, are long-form annotations used to introduce and explain a section of code. Often these types of comments are placed at the top of a file, or before a particularly complex code block.

```js
/* Initialize and invoke a the greetUser function
to assign user's name to a constant and print out
a greeting. */

function greetUser() {
  const name = prompt('What is your name?')
  console.log('Hello ,' + name + '! How are you?')
}

greetUser()
```

You may also sometimes see a slightly modified version of the block comment syntax, which starts with `/**` and includes asterisks throughout the left side of comment block.

```js
/**
 * Initialize constant with an array of strings.
 * Loop through each item in the array and print
 * it to the console.
 */

const seaCreatures = ['Shark', 'Fish', 'Octopus']

for (const seaCreature of seaCreatures) {
  console.log(seaCreature)
}
```

Sometimes this type of comment will also include details about the programming file, including the script's name, version, and author.

If you are a beginner in JavaScript, you may write as much as necessary to learn and comprehend the code you write. As you progress as a JavaScript developer, you will be looking to answer the intent, or the _why_ behind the code, as opposed to the _how_ or _what_.

## Commenting Out Code for Testing

Comments can also be used to quickly and easily prevent execution of code for testing and debugging purposes. This is referred to as "commenting out code".

If there is an error in some code you've written, commenting out sections will prevent them from running, and can be helpful in pinpointing the source of the issue. You may also use it to toggle between code to test different results.

```js
// Function to add two numbers
function addTwoNumbers(x, y) {
  let sum = x + y
  return sum
}

// Function to multiply two numbers
function multiplyTwoNumbers(x, y) {
  let product = x * y
  return product
}

/* In this example, we're commenting out the addTwoNumbers
function, therefore preventing it from executing. Only the
multiplyTwoNumbers function will run */

// addTwoNumbers(3, 5);
multiplyTwoNumbers(5, 9)
```

Both single-line comments and block comments can be used to comment out code, depending on the size of the section being toggled.

> **Note**: Commenting out code should only be done during testing purposes. Do not leave snippets of commented out code in your final script.

When working out the logic of a program, commenting out code can prove to be helpful as you determine where bugs are or assess the lines of code that offer the most utility.

## Conclusion

JavaScript code is interpreted by the computer, but will always be read by other programmers, including your future self. Taking the time to leave proper annotation on complicated sections of code will pay dividends in the future, making it easier for you and collaborators to understand the intent of the code you have written.
