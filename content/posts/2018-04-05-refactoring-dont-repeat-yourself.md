---
date: 2018-04-05
title: "Basic Refactoring: Don't Repeat Yourself"
template: post
thumbnail: '../thumbnails/js.png'
slug: refactoring-dont-repeat-yourself
categories:
  - JavaScript
tags:
  - javascript
  - refactoring
---

Refactoring is the process of editing code to improve efficiency and readability without changing the output. I made a little example to demonstrate how a beginner can start refactoring their code. This mini-tutorial covers the DRY (Don’t Repeat Yourself) concept, and might come in handy in the future.

Let's say I have some data in the form of a JavaScript/JSON object or array. The data and how it's formatted doesn't matter much here, it could be much more complex, but I'm leaving it simple for example's sake. (It could come from an API, but I'm going to leave out the step of fetching data for this example as it's irrelevant.) Here’s our data:

<div class="filename">data</div>

```js
var sessions = {
  mobile: [1, 2, 3],
  tablet: [3, 4, 5],
  desktop: [6, 7, 8],
}
```

Now let's say I have a function that I need to run that data through multiple times. Maybe I'm sending it through an API to map out a chart. In this case, I'm printing the data to a website (the DOM).

<div class="filename">function</div>

```js
function printData(id, name, sessions) {
  var div = document.createElement('div')
  div.id = id
  div.textContent = name + ' : ' + sessions
  document.querySelector('body').appendChild(div)
}
```

So there's my common code: data and a function.

```js
var sessions = {
  mobile: [1, 2, 3],
  tablet: [3, 4, 5],
  desktop: [6, 7, 8],
}

function printData(id, sessions) {
  var div = document.createElement('div')
  div.id = id
  div.textContent = name + ' : ' + sessions
  document.querySelector('body').appendChild(div)
}
```

## Original code

So for my first try, I'm just going to run the data through the code manually. I create an object in a variable for the data I need to pass into the function.

```js
// collapsing for brevity
var sessions = { ... }
function printData(id, name, sessions) { ... }

// Manually create objects and assign each one to a variable
var mobileData = {
    id: 'mobile-container',
    name: 'mobile',
    sessions: sessions['mobile']
};

var tabletData = {
    id: 'tablet-container',
    name: 'tablet',
    sessions: sessions['tablet']
};

var desktopData = {
    id: 'desktop-container',
    name: 'desktop',
    sessions: sessions['desktop']
};
```

And I invoke the function using the properties of each object.

```js
// Manually invoke function
printData(mobileData.id, mobileData.name, mobileData.sessions)
printData(tabletData.id, tabletData.name, tabletData.sessions)
printData(desktopData.id, desktopData.name, desktopData.sessions)
```

Clearly, this code is very inefficient. I see a lot of repetition. I know the redundancy is bad, but I don't necessarily know how to fix it. So here's how we're going to do it.

## Refactoring

First, I'll create an array that contains all the key values with `Object.keys`.

```js
var sessions = { ... }
function printData(id, name, sessions) { ... }

var devices = Object.keys(sessions); // returns [ "mobile", "tablet" ... ]
```

Then I'll make an array of objects, containing all the properties I need. I'll do this with `map()`.

```js
var sessions = { ... }
function printData(id, name, sessions) { ... }

var devices = Object.keys(sessions);

var data = devices.map(function(device) {
    // returns [{ ... }, { ... }, { ... }], an array of objects
    return {
      id: device + '-container',
      name: device,
      sessions: sessions[device],
    }
});
```

Finally, I'll do a `forEach()` loop to run the function once for each object.

```js
data.forEach(function(device) {
  printData(device.id, device.sessions)
})
```

And that's it! Here it is below.

<div class="filename">fullCode.js</div>

```js
var sessions = {
  mobile: [1, 2, 3],
  tablet: [3, 4, 5],
  desktop: [6, 7, 8],
}

var printData = function(id, name, sessions) {
  var div = document.createElement('div')
  div.id = id
  div.textContent = name + ' : ' + sessions
  document.querySelector('body').appendChild(div)
}

var devices = Object.keys(sessions)

var data = devices.map(function(device) {
  return {
    id: device + '-container',
    name: device,
    sessions: sessions[device],
  }
})

data.forEach(function(device) {
  printData(device.id, device.name, device.sessions)
})
```

And here it is updated with some ES6 syntax.

<div class="filename">fullCodeES6.js</div>

```js
const sessions = {
  mobile: [1, 2, 3],
  tablet: [3, 4, 5],
  desktop: [6, 7, 8],
}

const printData = (id, name, sessions) => {
  var div = document.createElement('div')
  div.id = id
  div.textContent = `${name} : ${sessions}`
  document.querySelector('body').appendChild(div)
}

const devices = Object.keys(sessions)

const data = devices.map(device => {
  return {
    id: `${device}-container`,
    name: device,
    sessions: sessions[device],
  }
})

data.forEach(device => {
  printData(device.id, device.name, device.sessions)
})
```

Now, the code may not be that much shorter now, but imagine if our data had fifty entries instead of three. Then you’d really start to see the benefit.

Note that less code or shorter code is not necessarily better code. You shouldn’t sacrifice readability and clarity for brevity.

- [Here is a demo](https://codepen.io/taniarascia/pen/pLOLQX) of the code example above.
