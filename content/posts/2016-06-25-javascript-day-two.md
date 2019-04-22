---
date: 2016-06-25
title: 'JavaScript Comparisons, Math, and Logic'
template: post
thumbnail: '../thumbnails/js.png'
slug: javascript-day-two
categories:
  - JavaScript
tags:
  - javascript
---

In [JavaScript Day One](/javascript-day-one/), we covered some of the essential fundamentals of programming: variables, data types, comments, and how to write a simple "Hello, World!" program. In this lesson, I'll be going over comparison, arithmetic (math), and conditional statements (logic).

## Comparison Operators

> **Comparison Operators** are used to determine equality or differences between values.

In lesson one, we covered that a single equals sign (`=`) applies a value to a variable.

- `var language = "English";` applies the string `"English"` to the variable `language`.

This is not to be confused with comparison operators, which use two (`==`) or three (`===`) equals signs, among other symbols. While one equals sign applies value to a variable, the comparison operators check the equality or differences between values. Here is a list of comparison operators.

| Operator | Comparison            |
| -------- | --------------------- |
| `==`     | Equal                 |
| `===`    | Strict Equal          |
| `!=`     | Not Equal             |
| `!==`    | Strict Not Equal      |
| `<`      | Less Than             |
| `>`      | Greater Than          |
| `<=`     | Less Than or Equal    |
| `>=`     | Greater Than or Equal |

Some of these are familiar from grade school math class, and a few are new. Comparison operators return a `true` or `false` result.

> There are very few situations in which equal (`==`) and not equal (`!=`) will be necessary. It's best to stick with strict equal (`===`) and strict not equal (`!==`) in all situations unless you have a specific reason to use the other.

Assume we've defined a variable called `x` and assigned it a value of `5`. Assume that on each line, `x` is equal to `5`.

```js
var x = 5 // assigning the number 5 to x.
x == 5 // true: 5 is equal to 5.
x == '5' // true: "5" is equal to 5 in value, but not in type ("5" is a string, not a number).
x === 5 // true.
x === '5' // false: "5" is not equal in both type and value to 5.
x != 6 // true: 6 is not equal to 5.
x !== 6 // true: 6 is not equal to 5.
x != '5' // false: "5" is equal in value, but not type, to 5.
x !== '5' // true: "5" is not equal in value and type to 5.
x < 6 // true: 5 is less than 6.
x > 4 // true: 5 is greater than 4.
x <= 4 // true: 5 is less than or equal to 5
x >= 4 // false: 4 is neither greater than nor equal to 5.
```

## Arithmetic Operators

> **Arithmetic Operators** perform mathematical calculations and return a value.

You can do basic math with JavaScript just like a calculator. Most of these math functions will be very familiar to you.

| Operator | Description         |
| -------- | ------------------- |
| `+`      | Addition            |
| `-`      | Subtraction         |
| `*`      | Multiplication      |
| `/`      | Division            |
| `%`      | Modulus (Remainder) |
| `++`     | Increment           |
| `--`     | Decrement           |

**Adding, subtracting, multiplying and dividing** work exactly as you would expect. Less familiar ones are the modulus operator, incrementing and decrementing.

The **modulus operator** prints the remainder of a division operation.

- In the case of`6 / 3 = 2`, the quotient (result) is `2`, and the remainder is `0`, as it is a clean, whole number division.
- In the case of `6 / 4 = 1.5`, however, the quotient is `1`, as `4` divides into `6` cleanly once, with a remainder of `2`.
- Therefore, `6 % 3 = 0`, and `6 % 4 = 2`.

The **increment operator** increments by one, and the **decrement operator** decrements by one. These become very useful with **loops**, which we'll cover soon.

```js
var x = 5 // assigning the number 5 to x.
x + 5 // returns 10.
x - 5 // returns 0.
x / 5 // returns 1.
x * 5 // returns 25.
x % 3 // returns 2.
++x // returns 6.
--x // returns 4.
```

If you try to add a string and a number, it will convert into a string. `5 + "5"` does not return `10`, it returns `"55"`. Most other operations that shouldn't work will result in `NaN`, Not a Number.

```js
var x = 5 // assigning the number 5 to x.

x + '5' // returns the string "55".

x / 'Five' // returns NaN (Not a Number).
```

## Conditional Statements

> **Conditional statements** execute an action based on whether specified conditions are true or false.

Conditionals are similar to a "Choose Your Own Adventure" book - you might have choice A, B, and C, and you'll skip over the A pages if you select choice B. There are two types of conditional statements in JavaScript - the `if...else` statement, and the `switch` statement.

With conditionals, we can finally begin to start performing actions with the knowledge we've learned. At this point, **indentation** becomes very useful for readability in the code, since now our code blocks are going to be longer than a single line. You can indent by using tabs or spaces, just be consistent throughout your code.

Conditional statements are logic, and we have a few **logical operators** to help evaluate our statements.

| Operator | Description |
| -------- | ----------- |
| `&&`     | And         |
| `||`     | Or          |
| `!`      | Not         |

### If...Else

There are three keywords that you can use in an **if statement** - `if`, `else`, and `else if`. A basic statement will look like this.

```js
if (condition) {
  // do something.
} else {
  // do something else.
}
```

In English, that translates to "If this condition is met, do something. Otherwise, do something else".

There are two important bits of syntax involved - the parentheses (`()`), and the curly braces (`{}`). The condition to be met must always be contained within parentheses, and the action that will be performed will be contained in the curly braces, which is known as a **code block**.

> Do not end a code block with a semi-colon.

Using some of what we've already learned, we can execute some code. Imagine an adventure through a mysterious dungeon. You come across a door and try to open it.

```js
var doorIsLocked = true // the door is locked

if (doorIsLocked) {
  console.log('The door is locked!')
} else {
  console.log('The door is not locked. You open the door.')
}
```

Since `doorIsLocked` is a true statement, "The door is locked!" will print to the document. An if statement checks for truth by default, so I do not need to specify `if (doorIsLocked === true)`, though both will work. In this case, `if` and `else` are like true and false. What if we have more options than just two?

```js
var doorIsLocked = true // the door is locked.
var hasKey = true // you have the key.

if (doorIsLocked && hasKey) {
  // the door is locked, and you have the key
  console.log('You unlocked the door! You open the door.')
} else if (doorIsLocked && !hasKey) {
  // the door is locked, and you don't have the key (!hasKey is the same as hasKey === false)
  console.log('The door is locked.')
} else {
  console.log('The door is not locked. You open the door.')
}
```

[Demo](http://codepen.io/taniarascia/pen/dXNeBw?editors=0010)

Since the door is locked and you have the key, "You unlocked the door! You open the door." will print to the document.

Conditional statements don't just check for true and false - you can use any of the conditional operators to evaluate an expression. Let's say you're at the weapon shop and want to buy a sword.

```js
var money = 1000 // you have 1000 in your inventory
var swordCost = 1200 // the sword costs 1200

if (money < swordCost) {
  console.log("You don't have enough money to buy this sword!")
} else {
  console.log('You buy the sword!')
}
```

[Demo](http://codepen.io/taniarascia/pen/XKpqLV?editors=0010)

Since you have less in your inventory than the cost of the sword, "You don't have enough money to buy this sword!" will print to the document.

### Switch

A **switch statement** becomes useful when we have many expressions to evaluate. It's similar to using an if statement with many `else if` blocks, but it's cleaner and easier to read.

```js
switch (expression) {
  case x:
    // do something
    break
  case y:
    // do something else
    break
  case z:
    // do something else
    break
  default:
    // default code block
    break
}
```

As an example, let's print some activities you might do based on the season.

```js
var season = 'Autumn'

switch (season) {
  case 'Winter':
    console.log('Go sledding!')
    break
  case 'Autumn':
    console.log('Drink a pumpkin spice latte!')
    break
  case 'Spring':
    console.log('Fly a kite!')
    break
  case 'Summer':
    console.log('Go to the beach!')
    break
  default:
    console.log('Study JavaScript.')
    break
}
```

[Demo](http://codepen.io/taniarascia/pen/jryxpq?editors=0010)

Since the season was "Autumn", "Drink a pumpkin spice latte!" gets printed to the document. For each `case`, a different bit of executes. The `break` keyword causes the `switch` code to stop running when a match is found. If no matches are found, the `default` code will execute, just like an `else`. In this case, "Study JavaScript" is always a good activity, no matter the season (but you're less enthusiastic about it, so no exclamation point).

## Conclusion

At this point, we've covered data types, variables, comments, conditionals, math, and logic, all very important concepts in any programming language. Next, we'll cover loops and functions, and begin manipulating the DOM (Document Object Model), so we can start interacting with HTML and CSS.
