---
date: 2016-03-30
title: 'JavaScript Comments, Variables, Data Types, and Hello, World!'
template: post
thumbnail: '../thumbnails/js.png'
slug: javascript-day-one
categories:
  - JavaScript
tags:
  - javascript
---

In order to properly learn something, you have to start at the beginning. You learn one concept at a time, process it, and move to the next. For example, when you learn Spanish, first you learn how to say "¿Cómo estás?" (how are you), but the next logical step is not to memorize every possible conjugation and irregularity of "estar" - it's probably to learn how to say "Me llamo..." (my name is).

The big problem with many programming tutorials and guides is they provide so much background information and want to cover every possible use case, but it ends up being overwhelming and uninteresting. If I see a huge block of code and I have no idea what's going on in it, I'm going to give up right away.

The goal is to constantly be learning and absorbing information, while feeling engaged and not overwhelmed.

#### Who is this guide for?

This article, and the possible series I'll create from it, is meant for those who have never used a programming language before, but have some familiarity with HTML and CSS already.

#### Prerequisites

JavaScript is a **client-side** programming language, which means it's executed in the user's web browser. This means you don't need to install anything to start writing JavaScript - just Chrome, Firefox, Safari, or whatever you usually browse in.

I would recommend going to [CodePen](http://codepen.io/) and creating new pens to practice with. There are other options as well, like [JSFiddle](https://jsfiddle.net/), but I personally like CodePen the best.

#### Goals

The goal of this lesson will be to get familiar with the syntax and some important programming concepts as they relate to JavaScript.

Make sure you type everything by hand as you practice - do not copy and paste.

So, let's begin lesson one.

## Comments

> A **comment** is a note written in the code source with the purpose of explaining the code.

- A **single line comment** is written in JavaScript as two slashes `//` followed by the comment itself.
- A **multi line comment** is written with a slash and asterisk `/*`, `*/`, as start and finish tags with the comment in between.
- Comments can also be used to prevent certain code from running, which is known as **commenting out** the code. This is useful for testing purposes.

```js
// This is a single line comment.

/* This comment
    can span multiple lines. */

// var firstName; this code has no function, because it has been "commented out".
```

## Variables

> A **variable** is a container used for storing data values.

Variables are created by typing `var` followed by your unique variable name. A variable that has been created but not assigned a value is **undefined**.

- Values that can be assigned to variables include data types such as **numbers, strings, objects, and Booleans**. \*
  Variable names can contain letters, the dollar sign character `$`, the underscore `_`, and numbers (but cannot begin with a number).

- The convention in JavaScript variable naming is **camelCase**, which means the first word is lowercase and each following word is uppercase.

> A variable cannot be any of the words already used as functions in the JS language. [List of reserved JavaScript names.](http://www.w3schools.com/js/js_reserved.asp)

```js
var firstName // Variable is declared, but not assigned a value.
var firstName = 'Tania' // Variable is declared and assigned a value.
```

> **Syntax:** A single equals sign `=` is used to assign a value. In the above example, the value `"Tania"` is assigned to the variable `firstName`. A semi-colon `;` ends a JavaScript statement, like a period ends a sentence.

## Data Types

JavaScript data types include **strings, numbers, Booleans, undefined, null, and objects**. Any data type that is not an object is known as a **primitive**.

### Strings

> A **string** is a series of characters.

Strings are encased in double quotes `"` or single quotes `'` (not to be confused with the backtick ```). Both are acceptable, but the string must begin and end with the same type of quotes.

```js
'Anything within quotes is a string.' // A string.
'It can have single or double quotes, as long as both ends match.' // Another string.

// Applying that string to a variable named explanation.
var explanation = 'Anything within quotes is a string.'
```

Since a string starts and ends with quotes, what if you want quotes within a string? There are two ways to take care of it. One is by using the opposite type of quotes.

```js
"I'm using a single quote within a double quoted string."
'I can also use "double quotes" inside a single quoted string.'
```

If you must use the same type of quote as your string, use a backslash `\` to "escape" the quote.

```js
'I\'m using a single quote within a single quoted string.'
"I can also use \"double quotes\" inside a double quoted string."
```

### Numbers

> A **number** is a numerical value up to 15 digits.

- Numbers cannot contain fractions, and must not be written with commas.
- Numbers can be written with or without decimals.
- Math functions will also result in a number.

```js
var number = 5
var bigNumber = 5555555555
var sum = 1 + 1 // The variable sum now has the number value of 2.
```

##### NaN

`NaN` is a reserved word that stands for Not a Number. Interestingly, `NaN` is a numeric data type. NaN is often the result of trying to do arithmetic with things that are not numbers.

```js
var impossibleEquation = 2 / 'string' // Two divided by "string" results in NaN.
```

### Booleans

> A **Boolean** is value that is either `true` or `false`.

```js
var happy = true
var sad = false
```

### Undefined

> An **undefined** variable has been declared but not assigned a value.

```js
var undefinedVariable // This variable has been declared but not defined.
undeclaredVariable // This variable is undeclared because the var keyword has not been used.
```

### Null

> **Null** is the intentional absence of an object value.
> Unlike undefined data types, null is a value that represents "nothing".

```js
var nonexistent = null // The variable nonexistent is defined but null.
```

## Objects

> An **object** is a collection of key/value pairs.
> Objects have **properties** and **methods**. A property is a characteristic of the object, and a method is a task that the object performs. The contents of an object are contained within curly brackets `{}`, with commas between each item (this is known as an object literal).

```js
var exampleObject = {} // An empty object is initialized with an object literal.

var person = {
  name: 'Tania',
  age: 26,
}
```

In the above example, `person` is the **object**, `name` is the **key** (property name), and `"Tania"` is the **value** (property value).
Using a dot `.`, you can get the property or method of an object. `person.age` will return the property value of `26`.

```js
var myAge = person.age // Applies the number 26 to the variable myAge.
```

### Arrays

> An **array** stores multiple values into a single variable.
> An array is an object that can contain multiple different data types in a list. The contents of an array are contained within straight brackets `[]`, with commas between each item.

```js
var exampleArray = [] // An empty array is initialized with an array literal.

var beverages = ['coffee', 'tea', 'juice']
```

Each value in an array is represented by a number, beginning with 0. In the above example, `"coffee"` is `0`, `"tea"` is `1`, etc.

> Remember - counting begins with 0 in programming.

```js
var favoriteBeverage = beverages[0] // Applies the string "coffee" to the variable favoriteBeverage.
```

## Printing the Output

Many programming languages have an option to "print" an ouput. Using print, you can traditionally see the result of a statement or function, or the contents of a variable.
JavaScript doesn't have a built in "print" or "echo" keyword like other languages, but in the very beginning, I believe the simplest way to see the result of your JavaScript statement is by using `console.log()`.
In the example below, I will declare a simple variable, assign a string to it, and write the output of the variable to the HTML document.

> **Hello, World!** is a tradition in computer programming in which the goal is to create an extremely simple program that outputs "Hello, World!". The intent is to verify that your environment is running properly and the correct syntax is being used.
> See the Pen [JS Day One: Echoing a Variable](http://codepen.io/taniarascia/pen/VazVPM/) by Tania ([@taniarascia](http://codepen.io/taniarascia)) on [CodePen](http://codepen.io).

## Practice

Here are some ideas for exercises you can do to practice what's been covered today.

- Create an object representing yourself that lists your first name, last name, age, gender, and occupation.
- Assign each object property to a variable.
- Create an array listing five types of animals.
- Assign your favorite animal to a variable.
- Divide a number by a string and print the result (which should be NaN)
- Write five true or false statements as comments, and apply them as Booleans to variables.

## Conclusion

It doesn't seem like a very long lesson, but a lot of concepts have been introduced here for those who have never studied programming before. Although there are variations between the syntax, strengths and capabilities of programming languages, most of the concepts here will apply to other languages. For example, variables exist in PHP, but always begin with a `$` and are not declared with `var`. Despite the syntactic difference, variables are still a storage container for data. This means that you can apply the concepts you've learned towards learning new languages in the future.

In the next part, I'll cover equality comparison, conditional statements, and operators/arithmetic.
[Part Two](/javascript-day-two)
