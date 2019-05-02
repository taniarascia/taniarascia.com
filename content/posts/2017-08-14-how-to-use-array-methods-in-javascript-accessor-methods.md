---
date: 2017-08-14
title: 'How To Use Array Methods in JavaScript: Accessor Methods'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-use-array-methods-in-javascript-accessor-methods
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-mutator-methods)_.

Arrays in JavaScript consist of a list of elements. JavaScript has many useful built-in methods to work with arrays. Methods that modify the original array are known as **mutator** methods, and methods that return a new value or representation are known as **accessor** methods. In this tutorial, we will focus on accessor methods.

In order to get the most out of this tutorial, you should have some familiarity with creating, indexing, modifying, and looping through arrays, which you can review in the tutorial [Understanding Arrays in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript).

This tutorial will go over methods that will concatenate arrays, convert arrays to strings, copy portions of an array to a new array, and find the indices of arrays.

> **Note:** Array methods are properly written out as `Array.prototype.method()`, as `Array.prototype` refers to the `Array` object itself. For simplicity, we will simply list the name as `method()`.

## concat()

The `concat()` method merges two or more arrays together to form a new array.

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

## join()

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

The paramter of the `join()` function will contain the separator you would like between each array element.

```js
// Join the elements of an array into a string
let fishString = fish.join(', ')

fishString
```

```terminal
'piranha, barracuda, koi, eel'
```

In the above example, writing `', '` with whitespace separated the array items in a more readable fashion. An empty string provided as an argument will remove the default commas completely.

## slice()

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

`slice()` is not to be confused with `splice()`, which can add or delete items from the original array.

## indexOf()

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

## lastIndexOf()

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

## Conclusion

In this lesson, we reviewed the major built-in accessor array methods in JavaScript. Accessor methods create a new copy or representation of an array, as opposed to mutating or modifying the original. We learned how to concatenate arrays together, which combines them end-to-end, as well as how to convert arrays into comma-separated strings. We also learned how to copy portions of an array into a new array, and find the first and last indices of a given element in an array.

To review the basics of arrays, read [Understanding Arrays in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript). To see a complete list of all array methods, view [the Array reference on Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
