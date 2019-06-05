---
date: 2017-08-10
title: 'How To Use Array Methods in JavaScript: Mutator Methods'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-use-array-methods-in-javascript-mutator-methods
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-mutator-methods)_.

Arrays in JavaScript consist of a list of elements. JavaScript has many useful built-in methods, which we will review in this article.

In order to get the most out of this tutorial, you should have some familiarity with creating, indexing, modifying, and looping through arrays, which you can review in the tutorial [Understanding Arrays in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript).

Arrays are similar to [strings](https://www.digitalocean.com/community/tutorials/how-to-index-split-and-manipulate-strings-in-javascript), in that they both consist of a sequence of elements that can be accessed via index number. However, it is important to remember that strings are an immutable datatype, meaning they cannot be changed. Arrays, on the other hand, are mutable, which means that many array methods will affect the original array, not a copy of the array.

Methods that modify the original array are known as **mutator** methods, and methods that return a new value or representation are known as **accessor** methods.

In this article, we will learn about adding and removing elements, reversing, replacing, merging and otherwise modifying elements in an array.

> **Note:** Array methods are properly written out as `Array.prototype.method()`, as `Array.prototype` refers to the `Array` object itself. For simplicity, we will simply list the name as `method()`.

## Accessor Methods

### `concat()`

The `concat()` method merges two or more arrays together to form a new array. It does not mutate or affect any of the original arrays.

In the below example, we will create two arrays of types of shellfish and combine them into one new array.

```js
// Create arrays of monovalves and bivalves
let monovalves = ['abalone', 'conch']
let bivalves = ['oyster', 'mussel', 'clam']

// Concatenate them together into shellfish variable
let shellfish = monovalves.concat(bivalves)

shellfish
```

```terminal
[ 'abalone', 'conch', 'oyster', 'mussel', 'clam' ]
```

The `concat()` method can take multiple arguments, effectively allowing you to concatenate many arrays together with a single method.

### `join()`

The `join()` method converts all the elements of an array into a new string.

```js
let fish = ['piranha', 'barracuda', 'koi', 'eel']
```

If no argument is given, the output of `join()` will be a comma separated string with no extra whitespace.

```js
// Join the elements of an array into a string
let fishString = fish.join()

fishString
```

```terminal
'piranha,barracuda,koi,eel'
```

The parameter of the `join()` function will contain the separator you would like between each array element.

```js
// Join the elements of an array into a string
let fishString = fish.join(', ')

fishString
```

```terminal
'piranha, barracuda, koi, eel'
```

In the above example, writing `', '` with whitespace separated the array items in a more readable fashion. An empty string provided as an argument will remove the default commas completely.

## `slice()`

The `slice()` method copies a portion of an array to a new array.

```js
let fish = ['piranha', 'barracuda', 'koi', 'eel']
```

Supposed we wanted to copy the last two items in the array to a new array. We would start with the index number of the first element we want, which is `2` for `koi`. We would end with the index number _following_ the last element we want. `eel` is `4`, so we would put `5`.

```js
// Slice a new array from 2 to 5
let fishWithShortNames = fish.slice(2, 5)

fishWithShortNames
```

```terminal
[ 'koi', 'eel' ]
```

In this particular case, since `eel` is the last item in the array, the second argument is actually unnecessary. `slice()` will start at the first index and stop at the end of the array if no second argument is provided.

```js
// Slice a new array from 2 to the end of the array
let fishWithShortNames = fish.slice(2)

fishWithShortNames
```

```terminal
[ 'koi', 'eel' ]
```

`slice()` is an accessor method, and will not modify the original array. `slice()` is not to be confused with `splice()`, which can add or delete items from the original array.

### `indexOf()`

The `indexOf()` method returns the index number of the first instance of an element.

In the below example, we have a string in which `barracuda` is listed twice.

```js
let fish = ['piranha', 'barracuda', 'koi', 'barracuda']
```

We will use `indexOf()` to find the first instance.

```js
// Find the first instance of an element
fish.indexOf('barracuda')
```

```terminal
1
```

If the given argument is a value that does not exist in the array, the console will return `-1`.

### `lastIndexOf()`

The `lastIndexOf()` method returns the index number of the last instance of an element.

We can test on the same example from `indexOf()`, which includes `barracuda` twice.

```js
let fish = ['piranha', 'barracuda', 'koi', 'barracuda']

// Find the last instance of an element
fish.lastIndexOf('barracuda')
```

```terminal
3
```

`lastIndexOf()` will search the array starting from the end and return the first index number it finds.

## Iteration Methods

### `forEach()`

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

### `map()`

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

### `filter()`

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

### `reduce()`

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

### `find()`

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

### `findIndex()`

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

In this lesson, we reviewed the major built-in accessor and iteration array methods in JavaScript. Array methods are extremely diverse and useful, allowing you to add, remove, insert, mutate, modify, and loop through arrays.

To review the basics of arrays, read [Understanding Arrays in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript). To see a complete list of all array methods, view [the Array reference on Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
