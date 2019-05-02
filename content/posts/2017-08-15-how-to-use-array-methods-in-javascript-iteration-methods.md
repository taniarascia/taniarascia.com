---
date: 2017-08-15
title: 'How To Use Array Methods in JavaScript: Iteration Methods'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-use-array-methods-in-javascript-iteration-methods
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-accessor-methods)_.

### Introduction

In JavaScript, the array data type consists of a list of elements. There are many useful built-in methods available for JavaScript developers to work with arrays. Methods that modify the original array are known as [**mutator** methods](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-mutator-methods), and methods that return a new value or representation are known as [**accessor** methods](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-accessor-methods).

There is a third class of array methods, known as **iteration** methods, which are methods that operate on every item in an array, one at a time. These methods are closely associated with loops. In this tutorial, we will be focusing on iteration methods.

In order to get the most out of this tutorial, you should have some familiarity with creating, indexing, modifying, and looping through arrays, which you can review in the tutorial [Understanding Arrays in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript).

In this tutorial, we will use iteration methods to loop through arrays, perform functions on each item in an array, filter the desired results of an array, reduce array items down to a single value, and search through arrays to find values or indices.

> **Note:** Array methods are properly written out as `Array.prototype.method()`, as `Array.prototype` refers to the `Array` object itself. For simplicity, we will simply list the name as `method()`.

## Understanding Arrow Functions

Many examples throughout this tutorial will be using JavaScript [arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), which are represented by an equals sign followed by a greater than sign: `=>`.

A **function** is a block of reusable code that can be executed. Traditionally, a function can be written with the following syntax:

```js
var example = function() {
  // code to execute
}

example()
```

The latest version of JavaScript at the time of writing allows for the use of arrow functions, which can be written with the following syntax:

```js
var example = () => {
  // code to execute
}

example()
```

The parentheses in either case may contain parameters. When there is only one parameter, the parentheses can be omitted, as such:

```js
var example = parameter1 => {
  // code to execute
}
```

Throughout the examples in this tutorial, we will use the arrow function syntax. To read and understand more about functions in JavaScript, read the [Functions reference on the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions).

## forEach()

The `forEach()` method calls a function for each element in an array.

Let's start with the following array assigned to the variable `fish`:

```js
let fish = ['piranha', 'barracuda', 'cod', 'eel']
```

We can use `forEach()` to print each item in the `fish` array to the console.

```js
// Print out each item in the array
fish.forEach(individualFish => {
  console.log(individualFish)
})
```

Once we do so, we'll receive the following output:

```terminal
piranha
barracuda
cod
eel
```

Another way to do this is using the `for` loop keyword and testing it against the length property of the array.

```js
// Loop through the length of the array
for (let i = 0; i < fish.length; i++) {
  console.log(fish[i])
}
```

The above code will have the same output as using the `forEach()` method. As an iteration method specifically intended for use with arrays, `forEach()` is more concise and straightforward for this particular task.

## map()

The `map()` method creates a new array with the results of a function call on each element in the array.

For an example of how to use the iteration method `map()`, we can print each iteration of a loop to the console. `map()` does not mutate the original array, it instead returns a new array value. Unlike `forEach()`, the `map()` method must be assigned to a new variable.

```js
let fish = ['piranha', 'barracuda', 'cod', 'eel']

// Print out each item in the array
let printFish = fish.map(individualFish => {
  console.log(individualFish)
})

printFish
```

```terminal
piranha
barracuda
cod
eel
```

We can also use `map()` to change the values of each item in an array. To demonstrate this, we'll add an `s` to the end of each item in the `fish` array to pluralize each word.

```js
// Pluralize all items in the fish array
let pluralFish = fish.map(individualFish => {
  return `${individualFish}s`
})

pluralFish
```

```terminal
[ 'piranhas', 'barracudas', 'cods', 'eels' ]
```

The original `fish` variable is unchanged, but `pluralFish` now contains a modified version of the original variable.

## filter()

The `filter()` method creates a new array with the elements that pass the result of a given test.

We could use `filter()` to return a new array containing only the items in a list that start with a specific letter. To do this, we can utilize [string indexing](https://www.digitalocean.com/community/tutorials/how-to-index-split-and-manipulate-strings-in-javascript#how-strings-are-indexed) to call the first item (or letter) in each string item of the array.

```js
let seaCreatures = ['shark', 'whale', 'squid', 'starfish', 'narwhal']

// Filter all creatures that start with "s" into a new list
let filteredList = seaCreatures.filter(creature => {
  return creature[0] === 's'
})

filteredList
```

```terminal
[ 'shark', 'squid', 'starfish' ]
```

We tested which items in the array have an `s` at the `0` index, and assigned the result into a new variable.

`filter()` is an iteration method, and does not mutate the original array.

## reduce()

The `reduce()` method will reduce an array to a single value.

This is seen commonly with numbers, such as finding the sum of all the numbers in an array.

```js
let numbers = [42, 23, 16, 15, 4, 8]

// Get the sum of all numerical values
let sum = numbers.reduce((a, b) => {
  return a + b
})

sum
```

```terminal
108
```

`reduce()` can also be used with strings and other data types. The value returned by `reduce()` can be a number, string, array, or other data type. `reduce()` is an iteration method that does not mutate the original array.

## find()

The `find()` method returns the first value in an array that passes a given test.

As an example, we will create an array of sea creatures.

```js
let seaCreatures = ['whale', 'octopus', 'shark', 'cuttlefish', 'flounder']
```

Then we will use the `find()` method to test if any of the creatures in the array are cephalopods.

```js
// Check if a given value is a cephalopod
const isCephalopod = cephalopod => {
  return ['cuttlefish', 'octopus'].includes(cephalopod)
}

seaCreatures.find(isCephalopod)
```

```terminal
octopus
```

Since `octopus` was the first entry in the array to satisfy the test in the `isCephalopod()` function, it is the first value to be returned.

The `find()` method can help you work with arrays that contain many values.

## findIndex()

The `findIndex()` method returns the first index in an array that passes a given test.

We can use the same `seaCreatures` example from the `find()` method.

```js
let seaCreatures = ['whale', 'octopus', 'shark', 'cuttlefish', 'flounder']
```

Using the `isCephalopod` test, we will find the index number instead of the value of the first match.

```js
// Check if a given value is a cephalopod
const isCephalopod = cephalopod => {
  return ['cuttlefish', 'octopus'].includes(cephalopod)
}

seaCreatures.findIndex(isCephalopod)
```

```terminal
1
```

`octopus` is the first item to match the test and has an index of `1`, therefore it is the index number that is returned. If the test is not satisfied, `findIndex()` will return `-1`.

This method is particularly useful when working with arrays containing many items.

## Conclusion

In this tutorial, we reviewed the major built-in iteration array methods in JavaScript. Iteration methods operate on every item in an array, and often perform a new function. We went over how to loop through arrays, change the value of each item in an array, filter and reduce arrays, and find values and indices.

To review the basics of arrays, read [Understanding Arrays in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript). To see a complete list of all array methods, view the [Array reference on Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
