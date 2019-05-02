---
date: 2018-05-04
title: 'Understanding Classes in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: understanding-classes-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-classes-in-javascript)._

### Introduction

In [Understanding Prototypes and Inheritance in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript), we learned how JavaScript is a prototype-based language, and every object in JavaScript has a hidden internal property called `[[Prototype]]` that can be used to extend object properties and methods.

Until recently, industrious developers used [constructor functions](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript#constructor-functions) to mimic an object-oriented design pattern in JavaScript. The language specification ECMAScript 2015, often referred to as ES6, introduced classes to the JavaScript language. Classes are often described as "syntactic sugar" over prototypes and inheritance, which means they offer a cleaner and easier syntax without offering new functionality.

## Classes Are Functions

A JavaScript class is a type of function. Classes are declared with the `class` keyword. We will use function expression syntax to initialize a function and class expression syntax to initialize a class.

```js
// Initializing a function with a function expression
const x = function() {}

// Initializing a class with a class expression
const y = class {}
```

Previously, we learned that we can access the `[[Prototype]]` of an object using the `Object.getPrototypeOf()` method. Now let's test that out on the empty function we created.

```js
Object.getPrototypeOf(x)
```

```terminal
ƒ () { [native code] }
```

Now we can test the same on the class we just created.

```js
Object.getPrototypeOf(y)
```

```terminal
ƒ () { [native code] }
```

We can see that the code declared with `function` and `class` both return a function `[[Prototype]]`. With prototypes, we learned that any function can become a constructor instance using the `new` keyword.

```js
const x = function() {}

// Initialize a constructor from a function
const constructorFromFunction = new x()

console.log(constructorFromFunction)
```

```terminal
x {}
constructor: ƒ ()
```

This applies to classes as well.

```js
const y = class {}

// Initialize a constructor from a class
const constructorFromClass = new y()

console.log(constructorFromClass)
```

```terminal
y {}
constructor: class
```

These prototype constructor examples are otherwise empty, but we can see how underneath the syntax, both methods are achieving the same end result.

## Defining a Class

In the prototypes and inheritance tutorial, we created an example based around character creation in a text-based role-playing game. Let's continue with that example here to update the syntax from functions to classes.

Originally, a constructor function would be initialized with a number of parameters, which would be assigned as properties of `this`, referring to the function itself. The first letter of the identifier would be capitalized by convention.

```js
// Initializing a constructor function
function Hero(name, level) {
  this.name = name
  this.level = level
}
```

The new class syntax, shown below, is structured very similarly.

<div class="filename">class.js</div>

```js
// Initializing a class definition
class Hero {
  constructor(name, level) {
    this.name = name
    this.level = level
  }
}
```

We know a constructor function is meant to be an object blueprint by the capitalization of the first letter of the initializer (which is optional) and through familiarity with the syntax. The `class` keyword communicates in a more straightforward fashion the objective of our function.

The only difference in the syntax of the initialization is using the `class` keyword instead of `function`, and assigning the properties inside a `constructor()` method.

## Defining Methods

The common practice with constructor functions is to assign methods directly to the `prototype`, instead of in the initialization, as seen in the `greet()` method below.

<div class="filename">constructor.js</div>

```js
function Hero(name, level) {
  this.name = name
  this.level = level
}

// Adding a method to the constructor
Hero.prototype.greet = function() {
  return `${this.name} says hello.`
}
```

With classes this syntax is simplified, and the method can be added directly to the class. Using the [method definiton shorthand](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) introduced in ES6, defining a method is an even more concise process.

<div class="filename">class.js</div>

```js
class Hero {
  constructor(name, level) {
    this.name = name
    this.level = level
  }

  // Adding a method to the constructor
  greet() {
    return `${this.name} says hello.`
  }
}
```

Let's take a look at these properties and methods in action. We will create a new instance of `Hero` using the `new` keyword, and assign some values.

```js
const hero1 = new Hero('Varg', 1)
```

If we print out more information about our new object with `console.log(hero1)`, we can see more details about what is happening with the class initialization.

```terminal
Hero {name: "Varg", level: 1}
__proto__:
  ▶ constructor: class Hero
  ▶ greet: ƒ greet()
```

We can see in the output that the `constructor()` and `greet()` functions were applied to the `__proto__`, or `[[Prototype]]` of `hero1`, and not directly as a method on the `hero1` object. While this is clear when making constructor functions, it is not obvious while creating classes. Classes allow for a more simple and succinct syntax, but sacrifice some clarity in the process.

## Extending a Class

An advantageous feature of constructor functions and classes is that they can be extended into new object blueprints based off the parent. This is prevents reptition of code for objects that are similar but need some additional or more specific features.

New constructor functions can be created from the parent using the [call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) method. In the example below, we will create a more specific character class called `Mage`, and assign the properties of `Hero` to it using `call()`, as well as adding an additional property.

<div class="filename">constructor.js</div>

```js
// Creating a new constructor from the parent
function Mage(name, level, spell) {
  // Chain constructor with call
  Hero.call(this, name, level)

  this.spell = spell
}
```

Now we can create a new instance of `Mage` using the same properties as `Hero` as well as a new one we added.

```js
const hero2 = new Mage('Lejon', 2, 'Magic Missile')
```

Sending `hero2` to the console, we can see we have created a new `Mage` based off the constructor.

```terminal
Mage {name: "Lejon", level: 2, spell: "Magic Missile"}
__proto__:
    ▶ constructor: ƒ Mage(name, level, spell)
```

With ES6 classes, the [`super`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) keyword is used in place of `call` to access the parent functions. We will use `extends` to refer to the parent class.

<div class="filename">class.js</div>

```js
// Creating a new class from the parent
class Mage extends Hero {
  constructor(name, level, spell) {
    // Chain constructor with super
    super(name, level)

    // Add a new property
    this.spell = spell
  }
}
```

Now we can create a new `Mage` instance in the same manner.

```js
const hero2 = new Mage('Lejon', 2, 'Magic Missile')
```

We will print `hero2` to the console and view the output.

```terminal
Mage {name: "Lejon", level: 2, spell: "Magic Missile"}
__proto__: Hero
    ▶ constructor: class Mage
```

The output is nearly exact the same, except in the case of classes the `[[Prototype]]` is linked to the parent, in this case `Hero`.

Below is a side-by-side comparison of the entire process of initialization, adding methods, and inheritance of a constructor function and a class.

<div class="filename">constructor.js</div>

```js
function Hero(name, level) {
  this.name = name
  this.level = level
}

// Adding a method to the constructor
Hero.prototype.greet = function() {
  return `${this.name} says hello.`
}

// Creating a new constructor from the parent
function Mage(name, level, spell) {
  // Chain constructor with call
  Hero.call(this, name, level)

  this.spell = spell
}
```

<div class="filename">class.js</div>

```js
// Initializing a class
class Hero {
  constructor(name, level) {
    this.name = name
    this.level = level
  }

  // Adding a method to the constructor
  greet() {
    return `${this.name} says hello.`
  }
}

// Creating a new class from the parent
class Mage extends Hero {
  constructor(name, level, spell) {
    // Chain constructor with super
    super(name, level)

    // Add a new property
    this.spell = spell
  }
}
```

Although the syntax is quite different, the underlying result is nearly the same between both methods. Classes give us an easier, more concise way of creating object blueprints, and constructor functions describe more accurately what is happening under the hood.

## Conclusion

In this article, we learned about the similarities and differences between JavaScript constructor functions and ES6 classes. Both classes and constructors imitate an object-oriented inheritance model to JavaScript, which is a prototype-based inheritance language.

Understanding prototypical inheritance is paramount to being an effective JavaScript developer. Being familiar with classes is extremely helpful, as popular JavaScript libraries such as [React](https://reactjs.org/) make frequent use of the `class` syntax.

To learn more about classes, view the [Class Reference on the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
