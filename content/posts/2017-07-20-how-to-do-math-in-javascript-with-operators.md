---
date: 2016-07-20
title: 'How To Do Math in JavaScript with Operators'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-do-math-in-javascript-with-operators
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

### Introduction

Mathematical operations are among the most fundamental and universal features of any programming language. In JavaScript, numbers are used frequently for common tasks such as finding browser window size dimensions, getting the final price of a monetary transaction, and calculating the distance between elements in a website document.

Although a high-level understanding of mathematics is not a prerequisite to being a capable developer, it is important to know what types of operations are available in JavaScript, and how to use math as a tool to accomplish practical tasks.

Unlike other programming languages, JavaScript only has one number data type; there is no distinction made between integers (positive or negative whole numbers) and floats (numbers with a decimal point), for example.

In this tutorial, we will go over arithmetic operators, assignment operators, and the order of operations used with JavaScript number data types.

## Arithmetic Operators

**Arithmetic operators** are symbols that indicate a mathematical operation and return a value. In the equation `3 + 7 = 10`, the `+` is syntax that stands for addition.

JavaScript has many familiar operators from basic math, as well as a few additional operators specific to programming.

Here is a reference table of JavaScript arithmetic operators.

| Operator       | Syntax | Example  | Definition                |
| -------------- | :----: | :------: | ------------------------- |
| Addition       |  `+`   | `x + y`  | Sum of `x` and `y`        |
| Subtraction    |  `-`   | `x - y`  | Difference of `x` and `y` |
| Multiplication |  `*`   | `x * y`  | Product of `x` and `y`    |
| Division       |  `/`   | `x / y`  | Quotient of `x` and `y`   |
| Modulo         |  `%`   | `x % y`  | Remainder of `x / y`      |
| Exponentiation |  `**`  | `x ** y` | `x` to the `y` power      |
| Increment      |  `++`  |  `x++`   | `x` plus one              |
| Decrement      |  `--`  |  `x--`   | `x` minus one             |

We will go into more detail on each of these operators throughout this article.

## Addition and Subtraction

**Addition** and **subtraction** operators are available in JavaScript, and can be used to find the sum and difference of numerical values. JavaScript has a built-in calculator, and mathematical operations can be done directly in the console.

We can do some simple addition with numbers, for example adding `10` and `20`, using the plus sign (`+`).

```js
10 + 20
```

```terminal
30
```

In addition to doing math with plain numbers, we can also assign numbers to variables and perform the same calculations. In this case, we will assign the numerical values to `x` and `y` and place the sum in `z`.

```js
// Assign values to x and y
let x = 10
let y = 20

// Add x and y and assign the sum to z
let z = x + y

console.log(z)
```

```terminal
30
```

Similarly, we use the minus sign (`-`) to subtract numbers or variables representing numbers.

```js
// Assign values to x and y
let x = 10
let y = 20

// Subtract x from y and assign the difference to z
let z = y - x

console.log(z)
```

```terminal
10
```

We can also add and subtract with negative numbers and floats (decimals).

```js
// Assign values to x and y
let x = -5.2
let y = 2.5

// Subtract y from x and assign the difference to z
let z = x - y

console.log(z)
```

```terminal
-7.7
```

One interesting thing to note and be aware of in JavaScript is the result of adding a number and a [string](https://www.digitalocean.com/community/tutorials/how-to-work-with-strings-in-javascript). `1 + 1` should equal `2`, but this equation will have unexpected results.

```js
let x = 1 + '1'

console.log(x)
typeof x
```

```terminal
11
'string'
```

Instead of adding the two numbers, JavaScript will convert the entire statement into a string and [concatenate](https://www.digitalocean.com/community/tutorials/how-to-work-with-strings-in-javascript#string-concatenation) them together. It's important to be careful with JavaScript's dynamically-typed nature, as it can have undesired outcomes.

A common reason to use addition or subtraction in JavaScript would be to scroll to an id minus the height in pixels of a fixed navigation bar.

```js
function scrollToId() {
  const navHeight = 60
  window.scrollTo(0, window.pageYOffset - navHeight)
}

window.addEventListener('hashchange', scrollToId)
```

In the above example, clicking on an id will scroll to 60 pixels above the id.

Addition and subtraction are two of the most common mathematical equations you will use in JavaScript.

## Multiplication and Division

**Multiplication** and **division** operators are also available in JavaScript, and are used to find the product and quotient of numerical values.

An asterisk (`*`) is used to represent the multiplication operator.

```js
// Assign values to x and y
let x = 20
let y = 5

// Multiply x by y to get the product
let z = x * y

console.log(z)
```

```terminal
100
```

Multiplication might be used to calculate the price of an item after applying sales tax.

```js
const price = 26.5 // Price of item before tax
const taxRate = 0.082 // 8.2% tax rate

// Calculate total after tax to two decimal places
let totalPrice = price + price * taxRate
totalPrice.toFixed(2)

console.log('Total:', totalPrice)
```

```terminal
Total: 28.67
```

A slash (`/`) is used to represent the division operator.

```js
// Assign values to x and y
let x = 20
let y = 5

// Divide y into x to get the quotient
let z = x / y

console.log(z)
```

```terminal
4
```

Division is particularly useful when calculating time, such as finding the number of hours in a quantity of minutes, or when calculating the percent of correct answers completed in a test.

## Modulo

One arithmetic operator that is slightly less familiar is the modulo (sometimes known as modulus) operator, which calculates the remainder of a quotient after division. Modulo is represented by a percentage sign (`%`).

As an example, we know that `3` goes into `9` exactly three times, and there is no remainder.

```js
9 % 3
```

```terminal
0
```

We can use the modulo operator to determine whether a number is even or odd, as seen with this function:

```js
// Initialize function to test if a number is even
const isEven = x => {
  // If the remainder after dividing by two is 0, return true
  if (x % 2 === 0) {
    return true
  }
  // If the number is odd, return false
  return false
}

// Test the number
isEven(12)
```

```terminal
true
```

In the above example, `12` divides evenly into `2`, therefore it is an even number.

Often in programming, modulo is used in conjunction with conditional statements for flow control.

## Exponentiation

**Exponentiation** is one of the newer operators in JavaScript, and it allows us to calculate the power of a number by its exponent. The syntax for exponentiation is two asterisks in a row (`**`).

10 to the fifth power, or 10^5, is written like this:

```js
10 ** 5
```

```terminal
100000
```

`10 ** 5` represents the same as `10` multiplied by `10` five times:

```js
10 * 10 * 10 * 10 * 10
```

Another way of writing this is with the `Math.pow()` method.

```js
Math.pow(10, 5)
```

```terminal
100000
```

Using the exponentiation operator is a concise way of finding the power of a given number, but as usual, it is important to keep consistent with the style of your code base when choosing between a method and an operator.

## Increment and Decrement

**Increment** and **decrement** operators increase or reduce the numerical value of a variable by one. They are represented by two plus signs (`++`) or two minus signs (`--`), and are often used with loops.

Note that increment and decrement operators can only be used on variables; attempting to use them on a raw number will result in an error.

```js
7++
```

```terminal
Uncaught ReferenceError: Invalid left-hand side expression in postfix operation
```

Increment and decrement operators can be classified as a prefix or postfix operation, depending on whether or not the operator is placed before or after the variable.

First, we can text the prefix incrementation, with `++x`.

```js
// Set a variable
let x = 7

// Use the prefix increment operation
let prefix = ++x

console.log(prefix)
```

```terminal
8
```

The value of `x` was increased by one. To see the difference, we will test the postfix incrementation, with `y++`.

```js
// Set a variable
let y = 7

// Use the prefix increment operation
let postfix = y++

console.log(postfix)
```

```terminal
7
```

The value of `y` was not increased in the postfix operation. This is because the value will not be incremented until after the expression has been evaluated. Running the operation twice will then increment the value.

```js
let y = 7

y++
y++

console.log(y)
```

```terminal
8
```

The increment or decrement operator will be seen most often in a loop. In this `for` loop example, we will run the operation ten times, starting with `0`, and increasing the value by `1` with each iteration.

```js
// Run a loop ten times
for (let i = 0; i < 10; i++) {
  console.log(i)
}
```

```terminal
0
1
2
3
4
5
6
7
8
9
```

The code above shows an iteration through a loop that is achieved through using the increment operator.

We can think of `x++` as shorthand for `x = x + 1`, and `x--` as shorthand for `x = x - 1`.

## Assignment Operators

One of the most commonly used operators is the **assignment** operator, which we have seen already and is represented by an equals sign (`=`). We use `=` to assign a value on the right to a variable on the left.

```js
// Assign 27 to age variable
let age = 27
```

In addition to the standard assignment operator, JavaScript has **compound assignment operators**, which combine an arithmetic operator with `=`.

For example, the addition operator will start with the original value, and add a new value.

```js
// Assign 27 to age variable
let age = 27

age += 3

console.log(age)
```

```terminal
30
```

In this case, `age += 3` is the same as writing `age = age + 3`.

All the arithmetic operators can be combined with assignment to create compound assignment operators. Below is a reference table of assignment operators in JavaScript.

| Operator                  | Syntax |
| ------------------------- | :----: |
| Assignment                |  `=`   |
| Addition assignment       |  `+=`  |
| Subtraction assignment    |  `-=`  |
| Multiplication assignment |  `*=`  |
| Division assignment       |  `/=`  |
| Remainder assignment      |  `%=`  |
| Exponentiation assignment | `**=`  |

Compound assignment operators are often used with loops, similar to incrementation and decrementation, and are utilized when equations need to be repeated or automated.

## Operator Precedence

Although we read from left to right, operators will be evaluated in order of precedence, just as in regular mathematics.

In the following example, multiplication has a higher precedence than addition, which determines the outcome of the equation.

```js
// First multiply 3 by 5, then add 10
10 + 3 * 5
```

```terminal
25
```

If instead we would like to run the addition operation first, we should group it in parentheses, which always has the highest precedence.

```js
// First add 10 and 3, then multiply by 5
;(10 + 3) * 5
```

```terminal
65
```

Below is a reference table of operator precedence of arithmetic operators in JavaScript, from highest to lowest. For incrementation and decrementation, postfix has a higher precedence than prefix.

Incrementation/decrementation, multiplication/division, and addition/subtraction have the same level of precedence.

| Operator       | Syntax |
| -------------- | :----: |
| Parentheses    |  `()`  |
| Incrementation |  `++`  |
| Decrementation |  `--`  |
| Exponentiation |  `**`  |
| Multiplication |  `*`   |
| Division       |  `/`   |
| Addition       |  `+`   |
| Subtraction    |  `-`   |

Operator precedence includes not only arithmetic operators, but also assignment operators, logical operators, conditional operators, and more. For a full list, view [operator precedence on Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence).

## Conclusion

In this article, we covered arithmetic operators and syntax, including many familiar mathematical operators and a few that are specific to programming.

Additionally, we learned how to combine arithmetic and assignment to create compound assignment operators, and the order of operations in JavaScript.
