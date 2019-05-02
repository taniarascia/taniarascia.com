---
date: 2017-09-11
title: 'How To Use the Switch Statement in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-use-the-switch-statement-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-the-switch-statement-in-javascript)._

### Introduction

Conditional statements are among the most useful and common features of all programming lanugages. In the [How to Write Conditional Statements in JavaScript](https://www.digitalocean.com/community/tutorials/how-to-write-conditional-statements-in-javascript) article, we learned about using the `if`, `else`, and `else if` keywords to control the flow of a program based on different conditions, which in JavaScript are often the result of user input.

In additon to `if...else`, JavaScript has a feature known as a `switch` statement. `switch` is a type of conditional statement that will evaluate an expression against multiple possible cases and execute one or more blocks of code based on matching cases. The `switch` statement is closely related to a conditional statement containing many `else if` blocks, and they can often be used interchangeably.

In this article, we will learn how to use the `switch` statement, as well as how to use the related keywords `case`, `break`, and `default`, and how to use multiple cases in a `switch` statement.

## Switch

The `switch` statement evaluates an expression and executes code as a result of a matching case. At first it can look a bit intimidating, but the basic syntax is similar to that of an `if` statement. It will always be written with `switch () {}`, with parentheses containing the expression to test, and curly brackets containing the potential code to execute.

Below is an example of a `switch` statement with two `case`s, and a fallback known as `default`.

```js
switch (expression) {
  case x:
    // execute case x code block
    break
  case y:
    // execute case y code block
    break
  default:
  // execute default code block
}
```

This is the sequence of events that will take place.

- The expression is evaluated
- The first `case`, `x`, will be tested against the expression. If it matches, the code will execute, and the `break` keyword will end the `switch` block.
- If it does not match, `x` will be skipped and the `y` case will be tested against the expression.
- If none of the cases match, the `default` code block will run.

Let's make a working example to test it. In our example, we will find the current day of the week with the `new Date()` method, and `getDay()` to print a number corresponding to the current day. `1` stands for Monday, all the way through `7` which stands for Sunday.

```js
const day = new Date().getDay()
```

We will send a message to the console each day of the week. The program will run in order from top to bottom looking for a match, and once one is found, the `break` command will halt the `switch` block from continuing to evaluate statements.

```js
// Set the current day of the week to a variable, with 1 being Monday and 7 being Sunday
const day = new Date().getDay()

switch (day) {
  case 1:
    console.log('Happy Monday!')
    break
  case 2:
    console.log("It's Tuesday. You got this!")
    break
  case 3:
    console.log('Hump day already!')
    break
  case 4:
    console.log("Just one more day 'til the weekend!")
    break
  case 5:
    console.log('Happy Friday!')
    break
  case 6:
    console.log('Have a wonderful Saturday!')
    break
  case 7:
    console.log("It's Sunday, time to relax!")
    break
  default:
    console.log('Something went horribly wrong...')
}
```

```terminal
'Just one more day 'til the weekend!'
```

This code was tested on a Thursday, which corresponds to `4`, therefore the console output was `Just one more day 'til the weekend!`. Depending on what day of the week you are testing the code, your output will be different. We have included a `default` block at the end to run in case of an error, which in this case should not happen as there is only 7 days of the week. We also could have, for example, only printed results for Monday to Friday, and the `default` block could have had the same message for the weekend.

If we had omitted the `break` keyword in each statement, none of the other `case`s would have evaluated to true, but the program would have continued to check until it reached the end. In order to make our programs faster and more efficient, we include the `break`.

## Switch Ranges

There might be an occasion in which you will need to evaluate a range of values in a `switch` block, as opposed to a single value as in our example above. We can do this by setting our expression to `true` and doing an operation in each `case`.

To make this easier to understand, we will use a familiar example. In the [conditional statements](https://www.digitalocean.com/community/tutorials/how-to-write-conditional-statements-in-javascript) article, we made a simple grading app which would take a number score and convert it to a letter grade, with the following requirements.

- Grade of 90 and above is an A
- Grade of 80 to 89 is a B
- Grade of 70 to 79 is a C
- Grade of 60 to 69 is a D
- Grade of 59 or below is an F

Now we can write that as a `switch` statement. Since we're checking a range, we will to the operation in each `case`, and check if each expression is evaluating to `true`.

```js
// Set the student's grade
const grade = 87

switch (true) {
  // If score is 90 or greater
  case grade >= 90:
    console.log('A')
    break
  // If score is 80 or greater
  case grade >= 80:
    console.log('B')
    break
  // If score is 70 or greater
  case grade >= 70:
    console.log('C')
    break
  // If score is 60 or greater
  case grade >= 60:
    console.log('D')
    break
  // Anything 59 or below is failing
  default:
    console.log('F')
}
```

```terminal
'B'
```

The expression in parentheses to be evaluated is `true` in this example, meaning any `case` that evaluates to `true` will be a match. Just like with `else if`, `switch` is evaluated from top to bottom, and the first true match will be accepted. Therefore, even though our `grade` variable is `87` and therefore evaluates to `true` for C and D as well, the first match is B, which will be the output.

## Multiple Cases

You may encounter code in which multiple `case`s should have the same output. In order to accomplish this, you can use more than one `case` for each block of code.

In order to test this, we are going to make a simple application matching the current month to the appropriate season. First, we will use the `new Date()` method to find a number corresponding to the current month, and apply that to the `month` variable.

```js
const month = new Date().getMonth()
```

The `new Date().getMonth()` method will output a number from `0` to `11`, with `0` being January and `11` being December. At the time of this publication, the month is September, which will correspond to `8`.

Our application will output the four seasons with the following specifications for simplicity:

- **Winter**: January, February, and March
- **Spring**: April, May, and June
- **Summer**: July, August, and September
- **Autumn**: October, November, and December

Below is our code.

```js
// Get number corresponding to the current month, with 0 being January and 11 being December
const month = new Date().getMonth()

switch (month) {
  // January, February, March
  case 0:
  case 1:
  case 2:
    console.log('Winter')
    break
  // April, May, June
  case 3:
  case 4:
  case 5:
    console.log('Spring')
    break
  // July, August, September
  case 6:
  case 7:
  case 8:
    console.log('Summer')
    break
  // October, November, December
  case 9:
  case 10:
  case 11:
    console.log('Autumn')
    break
  default:
    console.log('Something went wrong.')
}
```

Here is the output.

```terminal
Summer
```

The current month at the time of publication was `8`, which corresponded to one of the `case`s with the `"Summer"` season output.

## Conclusion

In this article, we reviewed the `switch` statement, a type of [conditonal statement](https://www.digitalocean.com/community/tutorials/how-to-write-conditional-statements-in-javascript) which evaluates and expression and outputs different values based on matching results. We reviewed `switch` statements using a range and multuple `case`s. To learn more, review [`switch` on the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch).
