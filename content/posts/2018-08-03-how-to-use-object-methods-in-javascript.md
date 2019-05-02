---
date: 2018-08-03
title: 'How To Use Object Methods in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: how-to-use-object-methods-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-object-methods-in-javascript)._

### Introduction

[Objects](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript) in JavaScript are collections of **key/value** pairs. The values can consist of **properties** and **methods**, and may contain all other JavaScript data types, such as strings, numbers, and Booleans.

All objects in JavaScript descend from the parent [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) constructor. `Object` has many useful built-in methods we can use and access to make working with individual objects easier. Unlike [Array prototype methods](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-mutator-methods) like `sort()` and `reverse()` that are used on the array instance, Object methods are used directly on the `Object` constructor, and use the object instance as a parameter. This is known as a static method.

In order to get the most out of this tutorial, you should be familiar with creating, modifying, and working with objects, which you can review in the [Understanding Objects in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript) article.

## Object.create()

[Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) is used to create a new object and link the prototype of an existing object. In [Understanding Prototypes and Inheritance in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript) we learn how prototypes are used to link properties and functions between objects.

We can create a `job` object instance, and extend it to a more specific object.

```js
// Initialize an object with properties and methods
const job = {
  position: 'cashier',
  type: 'hourly',
  isAvailable: true,
  showDetails() {
    const accepting = this.isAvailable
      ? 'is accepting applications'
      : 'is not currently accepting applications'

    console.log(`The ${this.position} position is ${this.type} and ${accepting}.`)
  },
}

// Use Object.create to pass properties
const barista = Object.create(job)

barista.position = 'barista'
barista.showDetails()
```

```terminal
The barista position is hourly and is accepting applications.
```

The `barista` object now has one property - `position` - but all the other properties and methods from `job` are available through the prototype. `Object.create()` is useful for keeping code DRY by minimizing duplication.

## Object.keys()

[Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) creates an array containing the keys of an object.

We can create an object and print the array of keys.

```js
// Initialize an object
const employees = {
  boss: 'Michael',
  secretary: 'Pam',
  sales: 'Jim',
  accountant: 'Oscar',
}

// Get the keys of the object
const keys = Object.keys(employees)

console.log(keys)
```

```terminal
["boss", "secretary", "sales", "accountant"]
```

`Object.keys` can be used to iterate through the keys and values of an object.

```js
// Iterate through the keys
Object.keys(employees).forEach(key => {
  let value = employees[key]

  console.log(`${key}: ${value}`)
})
```

```terminal
boss: Michael
secretary: Pam
sales: Jim
accountant: Oscar
```

`Object.keys` is also useful for checking the length of an object.

```js
// Get the length of the keys
const length = Object.keys(employees).length

console.log(length)
```

```terminal
4
```

Using the `length` property, we were able to count the `4` properties of `employees`.

## Object.values()

[Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) creates an array containing the values of an object.

```js
// Initialize an object
const session = {
  id: 1,
  time: `26-July-2018`,
  device: 'mobile',
  browser: 'Chrome',
}

// Get all values of the object
const values = Object.values(session)

console.log(values)
```

```terminal
[1, "26-July-2018", "mobile", "Chrome"]
```

`Object.keys()` and `Object.values()` are both easy and straightforward ways to return the data from an object.

## Object.entries()

[Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) creates a nested array of the key/value pairs of an object.

```js
// Initialize an object
const operatingSystem = {
  name: 'Ubuntu',
  version: 18.04,
  license: 'Open Source',
}

// Get the object key/value pairs
const entries = Object.entries(operatingSystem)

console.log(entries)
```

```terminal
[
    ["name", "Ubuntu"]
    ["version", 18.04]
    ["license", "Open Source"]
]
```

Once we have the key/value pair arrays, we can easily use the `forEach()` method to loop through and work with the results.

```js
const entries = Object.entries(operatingSystem)

// Loop through the results
entries.forEach(entry => {
  let key = entry[0]
  let value = entry[1]

  console.log(`${key}: ${value}`)
})
```

```terminal
name: Ubuntu
version: 18.04
license: Open Source
```

The `Object.entries()` method will only return the object instance's own properties, and not any properties that may be inherited through its prototype.

## Object.assign()

[Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) is used to copy values from one object to another.

We can create two objects, and merge them with 'Object.assign()`.

```js
// Initialize an object
const name = {
  firstName: 'Philip',
  lastName: 'Fry',
}

// Initialize another object
const details = {
  job: 'Delivery Boy',
  employer: 'Planet Express',
}

// Merge the objects
const character = Object.assign(name, details)

console.log(character)
```

```terminal
{firstName: "Philip", lastName: "Fry", job: "Delivery Boy", employer: "Planet Express"}
```

It is also possible to use the spread operator (`...`) to accomplish the same task.

```js
// Merge the object with the spread operator
const character = { ...name, ...details }

console.log(character)
```

```terminal
{firstName: "Philip", lastName: "Fry", job: "Delivery Boy", employer: "Planet Express"}
```

This [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals) in object literals is also known as shallow-cloning.

## Object.freeze()

[Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) prevents modification to properties and values of an object, and prevents properties from being added or removed from an object.

```js
// Initialize an object
const user = {
  username: 'AzureDiamond',
  password: 'hunter2',
}

// Freeze the object
const newUser = Object.freeze(user)

newUser.password = '*******'
newUser.active = true

console.log(newUser)
```

```terminal
{username: "AzureDiamond", password: "hunter2"}
```

In the example, we tried to override the password `hunter2` with `*******`, but the `password` property remained the same. We also tried to add a new property, `active`, but it was not added.

`Object.isFrozen()` is available to determine whether an object has been frozen or not, and returns a Boolean.

## Object.seal()

[Object.seal()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) prevents new properties from being added to an object, but allows the modification of existing properties. This method is similar to `Object.freeze()`.

```js
// Initialize an object
const user = {
  username: 'AzureDiamond',
  password: 'hunter2',
}

// Seal the object
const newUser = Object.seal(user)

newUser.password = '*******'
newUser.active = true

console.log(newUser)
```

```terminal
{username: "AzureDiamond", password: "*******"}
```

The new `active` property was not added to the sealed object, but the `password` property was successfully changed.

## Object.getPrototypeOf()

[Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) is used to get the internal hidden `[[Prototype]]` of an object, also accessible through the `__proto__` property.

In this example, we can create an array, which has access to the `Array` prototype.

```js
const employees = ['Ron', 'April', 'Andy', 'Leslie']

Object.getPrototypeOf(employees)
```

```terminal
[constructor: ƒ, concat: ƒ, find: ƒ, findIndex: ƒ, pop: ƒ, …]
```

We can see in the output that the prototype of the `employees` array has access to `pop`, `find`, and other Array prototype methods. We can confirm this by testing the `employees` prototype against `Array.prototype`.

```
Object.getPrototypeOf(employees) === Array.prototype;
```

```terminal
true
```

This method can be useful to get more information about an object or ensure it has access to the prototype of another object. There is also a related [`Object.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) method that will add one prototype to another object. You are recommended to use `Object.create()` instead as it is faster and more performant.

## Conclusion

Objects have many useful methods that help us modify, protect, and iterate through them. In this tutorial, we reviewed how to create and assign new objects, iterate through the keys and/or values of an object, and freeze or seal an object. Read [Understanding Objects in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript) to review JavaScript objects, and [Understanding Prototypes and Inheritance in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript) to familiarize yourself with the prototype chain.
