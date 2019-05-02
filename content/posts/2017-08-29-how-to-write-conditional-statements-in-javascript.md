---
date: 2017-10-19
title: 'How To Write Conditional Statements in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-write-conditional-statements-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-write-conditional-statements-in-javascript)._

### Introduction

In programming, there will be many occasions in which you will want different blocks of code to run depending on user input or other factors. As an example, you might want a form to submit if each field is filled out properly, but you might want to prevent that form from submitting if some required fields are missing. In order to achieve tasks like these we have **conditional statements**, which are an integral part of all programming languages. Conditional statements execute a specific action based on the results of an outcome of `true` or `false`.

A few examples of JavaScript conditional statements you might see:

- Check location of user and display correct language based on country
- Send form on submit, or display warnings next to missing required fields
- Open dropdown on click event, or close dropdown if it is already open
- Display an alcohol purveyor's website if user is over the legal drinking age
- Display booking form for a hotel unless the hotel is booked

Conditional statements are also known as logic, or decision making. You can compare a conditional statement to a "Choose Your Own Adventure" book, or a flowchart. In this article, we will go over logical operators, which are commonly used with conditional statements, and the `if`, `else`, and `else if` keywords. We will also cover the ternary operator.

## Logical Operators

Before learning about `if` and `else` statements, it is important to learn about **logical operators**. There are three logical operators that are typically used with conditional statements. These operators are AND (`&&`), OR (`||`), and NOT (`!`).

Below is a table summarizing the logical operators.

| Operator | Syntax | Description                                |
| -------- | ------ | ------------------------------------------ |
| AND      | `&&`   | Returns `true` if both operands are `true` |
| OR       | `||`   | Returns `true` if either operand is `true` |
| NOT      | `!`    | Returns `true` if operand is `false`       |

### AND

The AND operator is represented by two ampersands (`&&`) and will return `true` if the operands to the left and right are two. We can check if something is both high quality and has a low price.

```js
// High quality and low price are true
const highQuality = true
const lowPrice = true

highQuality && lowPrice
```

```terminal
true
```

Since both variables are true, the AND operation within the parentheses returns true.

### OR

The OR operator is represented by two pipes (`||`) and will return `true` if one of the operands is true. Here we will check if something is either `highQuality` or `lowPrice`.

```js
// Only low price is true
const highQuality = false
const lowPrice = true

highQuality && lowPrice
```

```terminal
true
```

Since one of the two conditions (`highQuality` or `lowPrice`) was `true`, the whole operation returns `true`.

### NOT

The NOT operator is represented by an exclamation point (`!`) and will return true if the operand is `false`.

```js
const highQuality = true

!highQuality
```

```terminal
false
```

In the above statement, `highQuality` is `true`. With the NOT operator, we are checking to see if `hiqhQuality` is `false`. If it were `false`, the output would return `true`, but since it's `true`, the output returns `false`.

The NOT operator is a bit tricky to understand at first. The important part to remember is that NOT checks if something is `false`.

## if Statement

The most fundamental of the conditional statements is the `if` statement. An `if` statement will evaluate if a statement is `true` or `false`, and only run if the statement returns `true`. The code block will be ignored in the case of a `false` result, and the program will skip to the next section.

An `if` statement is written with the `if` keyword, followed by a condition in parentheses, with the code to be executed in between curly brackets. In short, it can be written as `if () {}`.

Here is a longer examination of the basic `if` statement.

```js
if (condition) {
  // code that will execute if condition is true
}
```

The contents of an `if` statement are indented, and the curly brackets containing the block of code to run do not end in a semicolon, just like a function block.

As an example, we can pretend we have a shopping app. You have desposited a certain amount of funds into your account, and you would like to buy an item from the store.

```js
// Set balance and price of item
const balance = 500
const jeans = 40

// Check if there is enough funds to purchase item
if (jeans <= balance) {
  console.log('You have enough money to purchase the item!')
}
```

```terminal
You have enough money to purchase the item!
```

We have an account balance of `500`, and want to buy a pair of jeans for `40`. Using the less than or equal to operator, we can check if the price of jeans is less than or equal to the amount of funds we have. Since `jeans <= balance` evaluates to `true`, the condition will pass and the block of code will run.

In a new example, we will create a new shop item that costs more than the available balance.

```js
// Set balance and price of item
const balance = 500
const phone = 600

// Check if there is enough funds to purchase item
if (phone <= balance) {
  console.log('You have enough money to purchase the item!')
}
```

This example will have no output, since `phone <= balance` evaluates to false. The code block will simply be ignored, and the program will proceed to the next line.

## else Statement

With `if` statements, we only execute code when a statement evaluates to true, but often we will want something else to happen if the condition fails. For example, we might want to display a message telling the user which fields were filled out correctly if a form did not submit properly. In this case, we would utilize the `else` statement, which is the code that will execute if the original condition does not succeed.

The `else` statement is written after the `if` statement, and it has no condition in parentheses. Here is the syntax for a basic `if...else` statement.

```js
if (condition) {
  // code that will execute if condition is true
} else {
  // code that will execute if condition is false
}
```

Using the same example as above, we can add a message to display if the funds in the account are too low.

```js
// Set balance and price of item
const balance = 500
const phone = 600

// Check if there is enough funds to purchase item
if (phone <= balance) {
  console.log('You have enough money to purchase the item!')
} else {
  console.log('You do not have enough money in your account to purchase this item.')
}
```

```terminal
You do not have enough money in your account to purchase this item.
```

Since the `if` condition did not succeed, the code moves on to what's in the `else` statement. This can be very useful for showing warnings, or letting the user know what actions to take to move forward. Usually an action will be required on both success and failure, so `if...else` is more common than a solo `if` statement.

## else if Statement

With `if` and `else`, we can run blocks of code depending on whether a condition is `true` or `false`. However, sometimes we might have multiple possible conditions and outputs, and need more than simply two options. One way to do this is with the `else if` statement, which can evaluate more than two possible outcomes.

Here is a basic example of block of code that contains an `if` statement, multiple `else if` statements, and an `else` statement in case none of the conditions evaluated to `true`.

```js
if (condition a) {
	// code that will execute if condition a is true
} else if (condition b) {
	// code that will execute if condition b is true
} else if (condition c) {
	// code that will execute if condition c is true
} else {
	// code that will execute if condition is false
}
```

JavaScript will attempt to run all the statements in order, and if none of them are successful, it will default to the `else` block. You can have as many `else if` statements as necessary. In the case of many `else if` statements, the `switch` statement might be preferred for readability. Read about [switch on the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch).

As an example of multiple `else if` statements, we can create a simple grading app that will output a letter grade based on a score out of `100`.

The requirements of this app are as follows:

- A score of 90 and above is an A
- A score of 80 to 89 is a B
- A score of 70 to 79 is a C
- A score of 60 to 69 is a D
- Any score of 59 or below is an F

Below we will create a simple set of `if`, `else`, and `else if` statements, and test them against a given grade.

```js
// Set the current grade of the student
let grade = 87

// Check if it is an A, B, C, D, or failing grade
if (grade >= 90) {
  console.log('A')
} else if (grade >= 80) {
  console.log('B')
} else if (grade >= 70) {
  console.log('C')
} else if (grade >= 60) {
  console.log('D')
} else {
  console.log('F')
}
```

```terminal
B
```

In our example, we first check for the highest score, which will be greater than or equal to `90`. After that, the `else if` statements will check for greater than `80`, `70`, and `60` until it reaches the default `else` of a failing grade.

Although our `grade` value of `87` is technically also true for `C`, `D` and `F`, the statements will stop at the first one that is successful. Therefore, we get an output of `B`, which is the first match.

## Ternary Operator

The **ternary operator**, also known as the conditional operator, is used as shorthand for an `if...else` statement.

A ternary operator is written with the syntax of a question mark (`?`) followed by a colon (`:`), as demonstrated below.

```js
(condition) ? expression on true : expression on false
```

In the above statement, the condition is written first, followed by a `?`. The first expression will execute on `true`, and the second expression will execute on false. It is very similar to an `if...else` statement, with more compact syntax.

In this example, we will create a program that checks if a user is `21` or older. If they are, it will print `"You may enter"` to the console. If they are not, it will print `"Sorry, you are not old enough to enter."` to the console.

```js
// Set age of user
let age = 20

// Place result of ternary operation in a variable
const oldEnough = age >= 21 ? 'You may enter.' : 'Sorry, you are not old enough to enter.'

// Print output
oldEnough
```

```terminal
'Sorry, you are not old enough to enter.'
```

Since the `age` of the user was less than `21`, the fail message was output to the console. The `if...else` equivalent to this would be `"You may enter."` in the `if` statement, and `"Sorry, you are not old enough to enter."` in the `else` statement.

To learn more, read the documentation on the [ternary operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

## Conclusion

Conditional statements give us logic we can use to control the output of our programs. They are one of the foundational building blocks of programming, and can be found in virutally all programming languages.

In this article, we learned about logical operators, which are operators frequently used with conditional statements, as well as how to use the `if`, `else`, and `else if` keywords. Finally, we covered nesting and use of the ternary operator. For a more indepth look at conditional statements, read about [if...else on the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else).
