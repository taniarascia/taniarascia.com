---
date: 2018-02-20
title: 'Understanding Variables, Scope and Hoisting in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: understanding-variables-scope-hoisting-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-variables-scope-hoisting-in-javascript)._

### Introduction

**Variables** are a fundamental programming concept, and one of the first and most important things to learn. In JavaScript, there are three ways to declare a variable - with the keywords `var`, `let`, and `const`.

In this article, we will learn what variables are, how to declare and name them, the difference between `var`, `let`, and `const`, and the significance of global and local scope.

## Understanding Variables

A [variable](https://developer.mozilla.org/en-US/docs/Glossary/Variable) is a named container used for storing values. A piece of information that we might reference multiple times can be stored in a variable for later use or modification.

Variables in algebra, frequently represented by `x`, are used to hold the value of an unknown number. In JavaScript, the value contained inside a variable can be more than just a number; it can be any [JavaScript data type](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript), such as a string or an object.

Prior to the [ECMAScript 2015 (ES6)](http://www.ecma-international.org/ecma-262/6.0/) language specification that JavaScript is based on, there was only one way to declare a variable - using the `var` keyword. As a result, most older code and learning resources will only use `var` for variables, making it an important keyword to learn even as the new keywords `let` and `const` are introduced to the language.

We can use `var` to demonstrate the concept of a variable itself. In the below example, we will **declare** a variable, and **assign** a value to it.

```js
// Assign the string value Sammy to the username identifier
var username = 'sammy_shark'
```

This statement consists of a few parts:

- The declaration of a variable using the `var` keyword
- The variable name (or identifier), `username`
- The assignment operation, represented by the `=` syntax
- The value being assigned, `"sammy_shark"`

Now we can use `username` in code, and JavaScript will remember that `username` represents the string value `sammy_shark`.

```js
// Check if variable is equal to value
if (username === 'sammy_shark') {
  console.log(true)
}
```

```terminal
true
```

Variables can be used to represent all the data types in JavaScript. In this example, we'll string, number, object, Boolean, and null values to variables.

```js
// Assignment of various variables
var name = 'Sammy'
var spartans = 300
var kingdoms = ['mammals', 'birds', 'fish']
var poem = { roses: 'red', violets: 'blue' }
var success = true
var nothing = null
```

Using `console.log`, we can see the value contained in a specific variable.

```js
// Send spartans variable to the console
console.log(spartans)
```

```terminal
300
```

Variables store data in memory which can later be accessed and modified. Variables can also be reassigned and given a new value. In the simplified example below, we can demonstrate how a password might be stored to a variable, and updated.

```js
// Assign value to password variable
var password = 'hunter2'

// Reassign variable value with a new value
password = 'hunter3'

console.log(password)
```

```terminal
'hunter3'
```

In a real program, a password would most likely be stored securely and in a database, but this example can demonstrate a situation in which we might need to update the value of a variable. The value of `password` was `hunter2`, but we reassigned it to `hunter3` and that is the value JavaScript recognizes from that point on.

## Naming Variables

Variable names are known as **identifiers** in JavaScript. We discussed some of the rules of naming identifiers in [Understanding Syntax and Code Structure in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-syntax-and-code-structure-in-javascript). Below are some of the rules that must be followed.

- Variable names can consist of letters (`a-z`), numbers (`0-9`), a dollar sign symbol (`$`), and an underscore (`_`)
- Variable names must contain no white space (tabs or spaces)
- Variable names cannot begin with a number
- Variable named cannot consist of any [reserved keywords](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Reserved_keywords_as_of_ECMAScript_2015)
- Variable names are case sensitive

JavaScript also has the convention of using camel case (sometimes referred to as camelCase) which is the practice of writing the first word lowercase, and all following words capitalized. Most identifiers will follow this convention, with some exceptions.

This may seem like a lot of rules to learn, but it will very quickly become second nature to write valid and conventional variable names.

## Scope

**Scope** in JavaScript refers to the current context of code, which determines the accessibility of variables to JavaScript. The two types of scope are **local** and **global**.

Global variables are those declared outside of a block. Local variables are those declared inside of a block. In the example below, we will create a global variable.

```js
// Initialize a global variable
var creature = 'wolf'
```

We learned that variables can be reassigned. Using local scope, we can actually create new variables with the same name as a variable in an outer scope without changing or reassigning the original value.

In the example below, we will create a global `species` variable. Inside the function is a local variable with the same name. By sending them to the console, we can see how the variable's value is different depending on the scope, and the original value is not changed.

```js
// Initialize a global variable
var species = 'human'

function transform() {
  // Initialize a local, function-scoped variable
  var species = 'werewolf'
  console.log(species)
}

// Log the global and local variable
console.log(species)
transform()
console.log(species)
```

```terminal
human
werewolf
human
```

In this example, the local variable is **function-scoped**. Variables declared with the `var` keyword are function-scoped, meaning they only recognize functions as being a separate scope. The locally-scoped variable will not be accessible from the global scope.

The new keywords `let` and `const` are **block-scoped**, which means that a new, local scope is not only created from function blocks, but from any other block as well. Other types of block in JavaScript consist of keywords such as `if`, `for`, and `while`.

To demonstrate the difference between function and block scoped variables, we will assign a new variable in an `if` block using `let`.

```js
var fullMoon = true

// Initialize a global variable
let species = 'human'

if (fullMoon) {
  // Initialize a block scoped variable
  let species = 'werewolf'
  console.log(`It is a full moon. Lupin is currently a ${species}.`)
}

console.log(`It is not a full moon. Lupin is currently a ${species}.`)
```

```terminal
It is a full moon. Lupin is currently a werewolf.
It is not a full moon. Lupin is currently a human.
```

In this example, the `species` variable had one value globally (`human`), and another value locally (`werewolf`). If we were to use `var`, however, there would be a different result.

```js
// Use var to initialize a variable
var species = 'human'

if (fullMoon) {
  // Attempt to create a new variable in a block
  var species = 'werewolf'
  console.log(`It is a full moon. Lupin is currently a ${species}.`)
}

console.log(`It is not a full moon. Lupin is currently a ${species}.`)
```

```terminal
It is a full moon. Lupin is currently a werewolf.
It is not a full moon. Lupin is currently a werewolf.
```

In the result of this example, both the global variable and the block scoped variable end up with the same value, `werewolf`. This is because instead of creating a new local variable with `var`, you are reassigning the same variable in the same scope. `var` does not understand `if` to be part of a different, new scope.

To summarize, scope is the visibility of variables to JavaScript. Global scope is the outermost context of scope, and local scope is a more specific scope. There are two types of local scope - function scope, and block scope. `var` is limited to function scope, meaning that new scope can only be created inside functions. `let` and `const` have block scope, meaning that any block will create a new, local scope, such as `if`, `for`, and `while`. Block scope is safer, as it produces code that is less likely to unintentionally override variable values.

## Hoisting

In most of the examples so far, we've used `var` to **declare** a variable, and we have **initialized** it with a value. After declaring and initializing, we can access or reassign the variable.

If we attempt to use a variable before it has been declared and initialized, will return `undefined`.

```js
// Attempt to use a variable before declaring it
console.log(x)

// Variable assignment
var x = 100
```

```terminal
undefined
```

However, if we omit the `var` keyword, we are no longer declaring the variable, only intializing it. It will return a `ReferenceError` and halt the execution of the script.

```js
// Attempt to use a variable before declaring it
console.log(x)

// Variable assignment without var
x = 100
```

```terminal
ReferenceError: x is not defined
```

The reason for this is due to **hoisting**, a JavaScript action in which variable and function declarations are moved to the top of their scope. Since only the actual declaration is hoisted, and not the initialization, the value in the first example returns `undefined`.

To demonstrate more clearly, below is the code we wrote, and how JavaScript actually interpreted it.

```js
// The code we wrote
console.log(x)
var x = 100

// How JavaScript interpreted it
var x
console.log(x)
x = 100
```

JavaScript saved `x` to memory as a variable before the execution of the script. Since it was still called before it was defined, the result is `undefined` and not `100`, but it does not cause a `ReferenceError` and halt the script. Although the `var` keyword did not actually change location of the `var`, this demonstrates is a representation of how hoisting works.

This is an issue because the programmer most likely expects the output of `x` to be `true`, but it is `undefined`. We can also see how hoisting gives us unpredictable results in the example below.

```js
// Initialize x in the global scope
var x = 100

function hoist() {
  // A condition that should not affect the outcome of the code
  if (false) {
    var x = 200
  }
  console.log(x)
}

hoist()
```

```terminal
undefined
```

In this example, we declared `x` to be `100` globally. Depending on an `if` statement, `x` could change to `200`, but since the condition was `false`, it should not have affected the value of `x`. Instead, `x` was hoisted to the top of the `hoist()` function, and the value became `undefined`.

This type of unpredictable behavior can potentially cause bugs in a program. Since `let` and `const` are block-scoped, they will not hoist in this manner, as seen below.

```js
// Initialize x in the global scope
let x = true

function hoist() {
  // Initialize x in the function scope
  if (3 === 4) {
    let x = false
  }
  console.log(x)
}

hoist()
```

```terminal
true
```

Duplicate declaration of variables, which is possible with `var`, will throw an error with `let` and `const`.

```js
// Attempt to overwrite a variable declared with var
var x = 1
var x = 2

console.log(x)
```

```terminal
2
```

```js
// Attempt to overwrite a variable declared with let
let y = 1
let y = 2

console.log(y)
```

```terminal
Uncaught SyntaxError: Identifier 'y' has already been declared
```

To summarize, `var` allows the possibility of hoisting, which is variable declarations being saved to memory. This allows for the unintended consequence of undefined variables in your code. The introduction of `let` and `const` resolves this issue, by throwing an error when attempting to use a variable before declaring it or attempting to declare a variable more than once.

## Constants

We've learned about creating variables with `var`, and we learned how `let` and `const` solve potential issues related to scope and hoisting. Therefore, it is advisable to halt the use of `var` in favor of the newer `let` and `const`. While `let` can do everything `var` can do, `const` has a few additional rules to follow.

Many programming languages have **constants**, which are values that cannot be modified or changed. `const` is modelled after constants, and the values assigned to a `const` cannot be reassigned.

```js
// Assign value to const
const SPECIES = 'human'

// Attempt to reassign value
SPECIES = 'werewolf'

console.log(SPECIES)
```

```terminal
Uncaught TypeError: Assignment to constant variable.
```

Attempting to reassign `SPECIES` will result in an error.

Since `const` values cannot be reassigned, they need to be declared and initalized at the same time, or will also throw an error.

```js
// Declare but do not intialize a const
const TODO;

console.log(TODO);
```

```terminal
Uncaught SyntaxError: Missing initializer in const declaration
```

It is common convention to write all `const` identifiers in all uppercase. This marks them as readily distinguishable from other variable values.

Values that cannot change in programming are known as **immutable**, and values of the reverse are **mutable**. While `const` cannot be reassigned, they are not immutable as object properties can be modified.

```js
// Create a CAR object with two properties
const CAR = {
  color: 'blue',
  price: 15000,
}

// Modify a property of CAR
CAR.price = 20000

console.log(CAR)
```

```terminal
{ color: 'blue', price: 20000 }
```

To summarize, `const` values cannot be reassigned and must be initialized along with their declaration.

## Difference Between Var, Let, and Const

JavaScript has three different keywords to declare a variable, which adds an extra layer of intricacy to the language. The differences between the three are based on scope, hoisting, and reassignment.

| Keyword                                                                                       | Scope          | Hoisting | Can Be Reassigned | Can Be Redeclared |
| --------------------------------------------------------------------------------------------- | -------------- | -------- | ----------------- | ----------------- |
| [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)     | Function scope | Yes      | Yes               | Yes               |
| [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)     | Block scope    | No       | Yes               | No                |
| [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) | Block scope    | No       | No                | No                |

You may be wondering which of the three you should use in your own programs. A common accepted practice is to use `const` as much as possible, and `let` in the case of loops and reassignment. Generally, `var` can be avoided outside of working on legacy code.

## Conclusion

In this article, we learned what a variable is, the rules of naming a variable, and how to reassign variable values. We also learned about scope and hoisting, some of the limitations of the original `var` keyword, and how `let` and `const` rectify those issues.
