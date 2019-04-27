---
date: 2017-07-11
title: 'How to Work with Strings in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-work-with-strings-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-work-with-strings-in-javascript)._

### Introduction

A **string** is a sequence of one or more characters that may consist of letters, numbers, or symbols. Strings in JavaScript are primitive data types and immutable, which means they are unchanging.

As strings are the way we display and work with text, and text is our main way of communicating and understanding through computers, strings are one of the most fundamental concepts of programming to be familiar with.

In this article, we're going to learn how to create and view the output of strings, how to concatenate strings, how to store strings in variables, and the rules of using quotes, apostrophes, and newlines within strings in JavaScript.

## Creating and Viewing the Output of Strings

In JavaScript, there are three ways to write a string — they can be written inside single quotes (`' '`), double quotes (`" "`), or backticks (`` ` ` ``). The type of quote used must match on both sides, however it is possible that all three styles can be used throughout the same script.

Strings using double quotes and single quotes are effectively the same. As there is no convention or official preference for single- or double-quoted strings, all that matters is keeping consistent within project program files.

```js
'This string uses single quotes.'
```

```js
'This string uses double quotes.'
```

The third and newest way to create a string is called a **template literal**. Template literals use the backtick (also known as a grave accent) and work the same way as regular strings with a few additional bonuses, which we will cover in this article.

```js
;`This string uses backticks.`
```

The easiest way to view the output of a string is to print it to the console, with `console.log()`:

```js
console.log('This is a string in the console.')
```

```terminal
This is a string in the console.
```

Another simple way to output a value is to send an alert popup to the browser with `alert()`:

```js
alert('This is a string in an alert.')
```

Running the line above will produce the following output in the browser’s user interface:

![JavaScript Alert String Output](https://assets.digitalocean.com/articles/eng_javascript/js-strings/js-alert-string-output.png)

`alert()` is a less common method of testing and viewing output, as it can quickly become tedious to close the alerts.

## Storing a String in a Variable

Variables in JavaScript are named containers that store a value, using the keywords `var`, `const` or `let`. We can assign the value of a string to a named variable.

```js
const newString = 'This is a string assigned to a variable.'
```

Now that the `newString` variable contains our string, we can reference it and print it to the console.

```js
console.log(newString)
```

This will output the string value.

```terminal
This is a string assigned to a variable.
```

By using variables to stand in for strings, we do not have to retype a string each time we want to use it, making it simpler for us to work with and manipulate strings within our programs.

## String Concatenation

**Concatenation** means joining two or more strings together to create a new string. In order to concatenate, we use the concatenation operator, represented by a `+` symbol. The `+` symbol is also the addition operator when used with arithmetic operations.

Let's create a simple instance of concatenation, between `"Sea"` and `"horse"`.

```js
'Sea' + 'horse'
```

```terminal
Seahorse
```

Concatenation joins the strings end to end, combining them and outputting a brand new string value. If we would like to have a space between the words `Sea` and `horse`, we would need to include a whitespace character in one of the strings:

```js
'Sea ' + 'horse'
```

```terminal
Sea horse
```

We join strings and variables containing string values with concatenation.

```js
const poem = "The Wide Ocean";
const author = "Pablo Neruda";

const favePoem = "My favorite poem is " + poem + " by " + author ".";
```

```terminal
My favorite poem is The Wide Ocean by Pablo Neruda.
```

When we combine two or more strings through concatenation we are creating a new string that we can use throughout our program.

### Variables in Strings with Template Literals

One special feature of the template literal feature is the ability to include expressions and variables within a string. Instead of having to use concatenation, we can use the `${}` syntax to insert a variable.

```js
const poem = 'The Wide Ocean'
const author = 'Pablo Neruda'

const favePoem = `My favorite poem is ${poem} by ${author}.`
```

```terminal
My favorite poem is The Wide Ocean by Pablo Neruda.
```

As we can see, including expressions in template literals is another way to accomplish the same result. In this case, using template literals might be easier to write and more convenient.

## String Literals and String Values

You might notice that the strings we write in the source code are encased in quotes or backticks, but the actual printed output does not include any quotations.

```js
'Beyond the Sea'
```

```terminal
Beyond the Sea
```

There is a distinction when referring to each of these. A **string literal** is the string as it is written in the source code, including quotations. A **string value** is what we see in the output, and does not include quotations.

In the above example, `"Beyond the Sea"` is a string literal, and `Beyond the Sea` is a string value.

## Escaping Quotes and Apostrophes in Strings

Due to the fact that quotation marks are used to denote strings, special considerations must be made when using apostrophes and quotes in strings. Attempting to use an apostrophe in the middle of a single-quoted string, for example, will end the string, and JavaScript will attempt to parse the rest of the intended string as code.

We can see this by attempting to use an apostrophe in the `I'm` contraction below:

```js
const brokenString = 'I'm a broken string';

console.log(brokenString);
```

```terminal
unknown: Unexpected token (1:24)
```

The same would apply to attempting to use quotes in a double-quoted string.

In order to avoid an error being thrown in these situations, we have a few options that we can use:

- Opposite string syntax
- Escape characters
- Template literals

We will explore these options below.

### Using the Alternate String Syntax

An easy way to get around isolated cases of potentially broken strings is to use the opposite string syntax of the one you're currently using.

For example, apostrophes in strings built with `"`.

```js
"We're safely using an apostrophe in double quotes."
```

Quotation marks in strings built with `'`.

```js
'Then he said, "Hello, World!"'
```

In the way we combine single and double quotes, we can control the display of quotation marks and apostrophes within our strings. However, when we are working to use consistent syntax within project programming files, this can be difficult to maintain throughout a codebase.

### Using the Escape Character (`\`)

We can use the backslash (`\`) escape character to prevent JavaScript from interpreting a quote as the end of the string.

The syntax of `\'` will always be a single quote, and the syntax of `\"` will always be a double quote, without any fear of breaking the string.

Using this method, we can use apostrophes in strings built with `"`.

```js
'We\'re safely using an apostrophe in single quotes.'
```

We can also use quotation marks in strings built with `"`.

```js
"Then he said, \"Hello, World!\""
```

This method is a bit messier looking, but you may need to use both an apostrophe and a quotation mark within the same string, which will make escaping necessary.

### Using Template Literals

Template literals are defined with backticks, and therefore both quotes and apostrophes can be used safely without any sort of extra escaping or consideration.

```
`We're safely using apostrophes and "quotes" in a template literal.`;
```

In addition to preventing the need for character escaping and allowing embedded expressions, template literals provide multi-line support as well, which we will discuss in the [next section](/how-to-work-with-strings-in-javascript#long-strings-and-newlines).

With alternating string syntax, using escape characters, and using template literals, there are several ways to safely create a string.

## Long Strings and Newlines

There are times you may want to insert a newline character, or carriage return in your string. The `\n` or `\r` escape characters can be used to insert a newline in the output of code.

```js
const threeLines = 'This is a string\nthat spans across\nthree lines.'
```

```terminal
This is a string
that spans across
three lines.
```

This technically works to get our output on multiple lines. However, writing a very long string on a single line will quickly become very hard to read and work with. We can use the concatenation operator to show the string on multiple lines.

```js
const threeLines = 'This is a string\n' + 'that spans across\n' + 'three lines.'
```

Instead of concatenating multiple strings, we can use the `\` escape character to escape the newline.

```js
const threeLines =
  'This is a string\n\
that spans across\n\
three lines.'
```

> **Note**: This method is not preferred, as it may cause issues with some browsers and minifiers.

In order to make code more readable, we can instead use template literal strings. These eliminate the need for concatenation or escaping on long strings containing newlines. The string as well as newlines will be preserved.

```js
const threeLines = `This is a string
that spans across
three lines.`
```

```terminal
This is a string
that spans across
three lines.
```

It's important to be aware of all the ways of creating newlines and strings that span across multiple lines, as different code bases may be using various standards.

## Conclusion

In this article, we went over the basics of working with strings in JavaScript, from creating and displaying string literals using single and double quotes, creating template literals, concatenation, escaping, and assigning string values to variables.
