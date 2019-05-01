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

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-mutator-methods)_.

Arrays in JavaScript consist of a list of elements. JavaScript has many useful built-in methods to work with arrays. Methods that modify the original array are known as **mutator** methods, and methods that return a new value or representation are known as **accessor** methods. There is a third class of array methods, known as **iteration** methods, which are methods that operate on every item in an array, one at a time. These methods are closely associated with loops. In this tutorial, we will be focusing on iteration methods.

In order to get the most out of this tutorial, you should have some familiarity with creating, indexing, modifying, and looping through arrays, which you can review in the tutorial [Understanding Arrays in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript).

In this lesson, we will use iteration methods to loop through arrays, perform functions on each item in an array, filter the desired results of an array, reduce array items down to a single value, and search through arrays to find values or indices.

<$>[note]
**Note:** Array methods are properly written out as `Array.prototype.method()`, as `Array.prototype` refers to the `Array` object itself. For simplicity, we will simply list the name as `method()`. 
</$>

## forEach()

The `forEach()` method calls a function for each element in an array.

We can use `forEach()` to print each item in the `fish` array to the console.

```js
let fish = ['piranha', 'barracuda', 'koi', 'eel']

// Print out each item in the array
fish.forEach(individualFish => {
  console.log(individualFish)
})
```

```terminal
piranha
barracuda
koi
eel
```

Another way to do this is using the `for` loop keyword and testing it against the length property of the array.

```js
// Loop through the length of the array
for (let i = 0; i < fish.length; i++) {
  console.log(fish[i])
}
```

The above code will have the same output as using the `forEach()` method. `forEach()` is more concise and straightforward for this particular task. `forEach()` is an iteration method.

## map()

The `map()` method creates a new array with the results of a function call on each element in the array.

Just like `forEach()`, `map()` is an iteration method and as an example we can print each iteration of a loop to the console. `map()` does not mutate the original array, and it returns a new array value. `map()` must be placed into a new variable, unlike `forEach()`.

```js
let fish = ['piranha', 'barracuda', 'koi', 'eel']

// Print out each item in the array
let printFish = fish.map(individualFish => {
  console.log(individualFish)
})

printFish
```

```terminal
piranha
barracuda
koi
eel
```

We can use `map()` to change the values of each item in an array. For example, we will add an `s` to the end of each item in the `fish` array to pluralize them.

```js
// Pluralize all items in the fish array
let pluralFish = fish.map(individualFish => {
  return `${individualFish}s`
})

pluralFish
```

```terminal
[ 'piranhas', 'barracudas', 'kois', 'eels' ]
```

The original `fish` variable is unchanged, but `pluralFish` now contains a modified version of the original variable.

## filter()

The `filter()` method creates a new array with the elements that pass the result of a given test.

We could use `filter()` to return a new array containing only the items in a list that start with a specific letter.

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
let sum = reduce((a, b) => {
  return a + b
})

sum
```

```terminal
108
```

`reduce()` can also be used with strings and other datatypes. The value returned by `reduce()` can be a number, string, array, or other datatype. `reduce()` is an iteration method that does not mutate the original array.

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

## findIndex()

The `find()` method returns the first index in an array that passes a given test.

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

## Conclusion

In this lesson, we reviewed the major built-in iteration array methods in JavaScript. Iteration methods operate on every item in an array, and often perform a new function. We learned how to loop through arrays, change the value of each item in an array, filter and reduce arrays, and find values and indices.

To review the basics of arrays, read [Understanding Arrays in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript). To see a complete list of all array methods, view [the Array reference on Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
