---
date: 2017-08-24
title: 'Understanding Objects in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: understanding-objects-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript)_.

### Introduction

An **object** in JavaScript is a [data type](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript) that is composed of a collection of **names** or **keys** and **values**, represented in **name:value pairs**. The name:value pairs can consist of **properties** that may contain any data type — including strings, numbers, and Booleans — as well as **methods**, which are functions contained within an object.

Objects in JavaScript are standalone entities that can be likened to objects in real life. For example, a book might be an object which you would describe by the title, author, number of pages, and genre. Similarly, a car might be an object that you would describe by the color, make, model, and horsepower. JavaScript [arrays](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript) are also a type of object.

Objects are an integral and foundational aspect of most JavaScript programs. For example, a user account object may contain such data as usernames, passwords, and e-mail addresses. Another common use case is a web shopping platform's shopping cart that could consist of an array of many objects containing all the pertinent information for each item, such as name, price, and weight for shipping information. A to-do list is another common application that might consist of objects.

In this tutorial, we will review how to create an object, what object properties and methods are, and how to access, add, delete, modify, and loop through object properties.

## Creating an Object

An object is a [JavaScript data type](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript), just as a number or a string is also a data type. As a data type, an object can be contained in a variable.

There are two ways to construct an object in JavaScript:

- The **object literal**, which uses curly brackets: `{}`
- The **object constructor**, which uses the `new` keyword

We can make an empty object example using both methods for demonstration purposes.

First, the object literal.

```js
// Initialize object literal with curly brackets
const objectLiteral = {}
```

The object literal initializes the object with curly brackets.

In this next example, we'll use the object constructor.

```js
// Initialize object constructor with new Object
const objectConstructor = new Object()
```

The same data was created using the object constructor method that is initialized with `new Object()`.

Both of these approaches will create an empty object. Using object literals is the more common and preferred method, as it has less potential for inconsistencies and unexpected results.

We can create an example object, contained in the variable `gimli`, to describe a character.

```js
// Initialize gimli object
const gimli = {
  name: 'Gimli',
  race: 'dwarf',
  weapon: 'axe',
  greet: function() {
    return `Hi, my name is ${this.name}!`
  },
}
```

Our new object is `gimli`, which has three properties. Each property consists of a **name:value** pair, also known as **key:value** pair. `weapon` is one of the property names, which is linked to the property value `"axe"`, a string. It has one method, with a method name of `greet` and the method value consisting of the contents of the function.

Within `greet`, you may notice the `this` keyword. When using `this` inside of an object, it refers to the current object, in this case `gimli`.

Sending `gimli` to the console will print out the entire object.

```js
gimli
```

```terminal
{name: "Gimli", race: "dwarf", weapon: "axe", greet: ƒ}
```

This output may render differently depending on what console you are using, but you should notice that all of the values passed to the object are shown in the output.

Next, we will review a JavaScript object's properties and methods.

## Properties and Methods

Objects can have **properties** and **methods**.

A property is the association between a name (key) and value within an object, and it can contain any datatype. A property generally refers to the characteristic of an object.

A method is a function that is the value of an object property, and therefore a task that an object can perform.

An easy way to remember the difference between object properties and methods is to think of a property as a noun, and a method as a verb. `name`, `race` and `weapon` are all nouns associated with an object, and are properties. `fight()` or `talk()` are verbs that might be used as a method function definition.

## Accessing Object Properties

There are two ways to access an object's properties.

- Dot notation: `.`
- Bracket notation: `[]`

Let's revisit our original example object, `gimli`.

```js
const gimli = {
  name: 'Gimli',
  race: 'dwarf',
  weapon: 'axe',
  greet: function() {
    return `Hi, my name is ${this.name}!`
  },
}
```

If we want to retrieve the property value of `weapon`, we can do so with object dot notation by typing the variable name of the object, followed by a dot (`.`) and the property or method name.

```js
// Retrieve the value of the weapon property
gimli.weapon
```

```terminal
"axe"
```

`gimli.weapon` outputs the property value, which is `"axe"`. We can also retrieve the same data with object bracket notation. Similar to how you might [index and access a string](https://www.digitalocean.com/community/tutorials/how-to-index-split-and-manipulate-strings-in-javascript), the syntax for bracket notation is two square brackets (`[]`) encasing the property name.

```js
// Retrieve the value of the weapon property
gimli['weapon']
```

```terminal
"axe"
```

Both dot notation and bracket notation are used regularly. Dot notation is faster and more readable, but has more limitations. Bracket notation allows access to property names stored in a variable, and must be used if an object's property contains any sort of special character.

In order to retrieve an object method, you would call it much in the same way you would call a regular function, just attached to the object variable.

```js
gimli.greet()
```

```terminal
"Hi, my name is Gimli!"
```

In the example above, we see that the string value for the object method `greet()` is returned.

We can now move on to modifying object properties through adding name:value pairs or modifying existing ones.

## Adding and Modifying Object Properties

In order to add a new property to an object, you would assign a new value to a property with the assignment operator (`=`).

For example, we can add a numerical data type to the `gimli` object as the new `age` property. Both the dot and bracket notation can be used to add a new object property.

```js
// Add new age property to gimli
gimli.age = 139
```

```js
// Add new age property to gimli
gimli['age'] = 139
```

We can access that value just as above, with either the dot notation or the bracket notation.

```js
gimli.age
```

```terminal
139
```

A method can also be added to the object by using the same process.

```js
// Add new fight method to gimli
gimli.fight = function() {
  return `Gimli attacks with an ${this.weapon}.`
}
```

Once we have created this new object method, we can call it as we did above.

```js
gimli.fight()
```

```terminal
"Gimli attacks with an axe."
```

Using the same method, an object's property can be modified by assigning a new value to an existing property.

```js
// Update weapon from axe to battle axe
gimli.weapon = 'battle axe'
```

At this point, if we call the object, we will see all of our additions and modifications.

```js
gimli
```

```terminal
{name: "Gimli", race: "dwarf", weapon: "battle axe", age: 139, greet: ƒ, fight: ƒ}
```

Through assignment operation, we can modify the properties and methods of a JavaScript object.

## Removing Object Properties

In order to remove a property from an object, you will utilize the `delete` keyword. `delete` is an operator that removes a property from an object.

In the below example, we will remove the `weapon` property from `gimli` using `delete`.

```js
// Remove weapon from gimli
delete gimli.weapon
```

```terminal
true
```

The `delete` operation evaluates as `true` if the property was successfully removed, or if it was used on a property that doesn't exist.

We can test the output of `gimli` to see if it succeeded.

```js
gimli
```

```terminal
{name: "Gimli", race: "dwarf", age: 139, greet: ƒ, fight: ƒ}
```

In the above output, the `weapon` name and its associated value are no longer available, showing that we have successfully deleted the property.

In the next section, we'll go over ways to iterate through objects in JavaScript.

## Looping Through Object Properties

JavaScript has a built-in type of `for` loop that is specifically meant for iterating over the properties of an object. This is known as the `for...in` loop.

Here is a simplified version of our main object example, `gimli`.

```js
const gimli = {
  name: 'Gimli',
  race: 'dwarf',
  weapon: 'battle axe',
}
```

We can use `for...in` to traverse through all the properties of `gimli` and print them to the console. Using bracket notation, we can retrieve the property value as a variable, in this case `key`.

```js
// Iterate through properties of gimli
for (let key in gimli) {
  console.log(gimli[key])
}
```

```terminal
Gimli
dwarf
battle axe
```

We can also retrieve the property name itself using just the first variable in the `for...in` loop. We have used a string method to [convert the key values to upper case](https://www.digitalocean.com/community/tutorials/how-to-index-split-and-manipulate-strings-in-javascript#converting-to-upper-or-lower-case).

```js
// Get keys and values of gimli properties
for (let key in gimli) {
  console.log(key.toUpperCase() + ':', gimli[key])
}
```

```terminal
NAME: Gimli
RACE: dwarf
WEAPON: battle axe
```

The `for...in` loop is not to be confused with the `for...of` loop, which is used exclusively on the Array object type. You can learn more about iterating through arrays in the "[Understanding Arrays in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript#looping-through-an-array)" tutorial.

Another useful enumeration method is the `Object.keys()` method, which will return an array of the object's keys.

```js
// Initialize method on gimli object to return property keys
Object.keys(gimli)
```

```terminal
["name", "race", "weapon"]
```

This method allows us to work with the keys or names of an object as an array, so you can leverage all of the methods available to JavaScript arrays.

## Conclusion

Objects are an extremely useful and versatile feature of the JavaScript programming language. They are some of the main building blocks of writing code in JavaScript, and are a practical way to organize related data and functionality. To-do lists, shopping carts, user accounts, and locations on a webmap are all a few of the many examples of real-world JavaScript objects that you might encounter.

In this tutorial, we learned the difference between properties and methods, how to create objects, and how to add, remove, modify, and loop through object properties. To learn more about JavaScript objects, read about [Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) on the Mozilla Developer Network.
