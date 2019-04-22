---
date: 2018-03-29
title: 'Object Oriented Pattern: JavaScript Constructor Functions, ES6 Classes, and PHP Classes'
template: post
thumbnail: '../thumbnails/js.png'
slug: object-oriented-pattern-javascript-php-classes
categories:
  - PHP
  - JavaScript
tags:
  - class
  - javascript
  - oop
  - php
---

I wrote an article on [Understanding Prototypes and Inheritance in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript) for DigitalOcean, in which I explained how to use constructor functions and create new objects that inherit from them. I thought it would be interesting to rewrite the exact same code as a JavaScript ES6 class and a PHP class, and get the same output. So here is a side-by-side comparison of the same pattern and output in ES5, ES6, and PHP.

Using the ES6 classes, I'll explain what the pattern is doing.

We'll create a class (an object blueprint) and extend the class (inheritance). I'm using the RPG character classes for the example.

```js
// Creating a class
class Hero {}

// Extending a class
class Warrior extends Hero {}
```

I'll add a `constructor()` function to assign two parameters to the class.

```js
class Hero {
  // Assigning parameters with constructor
  constructor(name, level) {
    this.name = name
    this.level = level
  }
}

// Extending a class
class Warrior extends Hero {}
```

I'll add a method as well.

```js
class Hero {
  constructor(name, level) {
    this.name = name
    this.level = level
  }

  // Adding a method
  greet() {
    return `${this.name} says hello.`
  }
}

class Warrior extends Hero {}
```

We'll edit the inherited class now, adding a new parameter. We use `super()` to access the parameters from the parent - otherwise the inherited class would not be able to access and work with them.

```js
class Hero { ... }

class Warrior extends Hero {
    // Adding a constructor
    constructor(name, level, weapon) {
        // Access and call function from parent
        super(name, level);

        this.weapon = weapon;
    }
}
```

Finally, we'll add a method to the extended class.

```js
class Hero {}

class Warrior extends Hero {
  constructor(name, level, weapon) {
    super(name, level)

    this.weapon = weapon
  }

  // Adding a method
  attack() {
    return `${this.name} attacks with the ${this.weapon}.`
  }
}
```

Now that the class and extended class blueprints are ready, we can create a new character that has acesss to the parameters and methods of the original class and the extended class.

```js
// Initialize individual character instance
const hero1 = new Warrior('Bjorn', 1, 'axe')

console.log(hero1.attack())
console.log(hero1.greet())
```

The full code and output for JS constructor functions and classes, and PHP classes is below.

## JavaScript ES6 Class

The `class` keyword was introduced with ES6. [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) are built on prototypes in JavaScript.

<div class="filename">classes-es6.js</div>

```js
class Hero {
  constructor(name, level) {
    this.name = name
    this.level = level
  }

  greet() {
    return `${this.name} says hello.`
  }
}

class Warrior extends Hero {
  constructor(name, level, weapon) {
    // Access and call function from parent
    super(name, level)

    this.weapon = weapon
  }

  attack() {
    return `${this.name} attacks with the ${this.weapon}.`
  }
}

// Initialize individual character instance
const hero1 = new Warrior('Bjorn', 1, 'axe')

console.log(hero1.attack())
console.log(hero1.greet())
```

##### Output

```terminal
Bjorn attacks with the axe.
Bjorn says hello.
```

## JavaScript ES5 Constructor Function

JavaScript constructor functions were created as an attempt to bring the functionality of traditional object-oriented class design to the JavaScript language.

<div class="filename">constructor-functions-es5.js</div>

```js
function Hero(name, level) {
  this.name = name
  this.level = level
}

function Warrior(name, level, weapon) {
  // Access and call function from parent
  Hero.call(this, name, level)

  this.weapon = weapon
}

// Link prototypes and add prototype methods
Warrior.prototype = Object.create(Hero.prototype)

Hero.prototype.greet = function() {
  return this.name + ' says hello.'
}

Warrior.prototype.attack = function() {
  return this.name + ' attacks with the ' + this.weapon + '.'
}

// Initialize individual character instance
const hero1 = new Warrior('Bjorn', 1, 'axe')

console.log(hero1.attack())
console.log(hero1.greet())
```

##### Output

```terminal
Bjorn attacks with the axe.
Bjorn says hello.
```

## PHP Class

Here is a simple example of a [PHP class constructor](http://php.net/manual/en/language.oop5.decon.php).

<div class="filename">class-php.php</div>

```php

<?php

class Hero {
    public function __construct($name, $level) {
        $this->name = $name;
        $this->level = $level;
    }
    public function greet() {
        return "{$this->name} says hello.";
    }
}

class Warrior extends Hero {
    public function __construct($name, $level, $weapon) {
        // Access and call function from parent
        parent::__construct($name, $level, $weapon);

        $this->weapon = $weapon;
    }

    public function attack() {
        return "{$this->name} attacks with the {$this->weapon}.";
    }
}

// Initialize individual character instances
$hero1 = new Warrior('Bjorn', 1, 'axe');

echo $hero1->attack();
echo $hero1->greet();
```

##### Output

```terminal
Bjorn attacks with the axe.
Bjorn says hello.
```

Of course, [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) are "syntactic sugar" (ugh) over prototypes, which means under the hood, ES6 classes are not actually running on an object-oriented inheritance model. However, popular libraries like [React](https://reactjs.org) tend to make a lot of use of classes, so they're good to know. The PHP example shows an actual class from a traditional object-oriented system, but with this simple example, we can get the same output either way.

Personally, I prefer syntactic salt.
