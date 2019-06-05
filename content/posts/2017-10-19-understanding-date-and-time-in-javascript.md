---
date: 2017-10-19
title: 'Understanding Date and Time in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: understanding-date-and-time-in-javascript
categories:
  - JavaScript
tags:
  - javascript
  - fundamentals
---

_This post was originally written for [DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript)._

### Introduction

Date and time are a regular part of our everyday lives and therefore feature prominently in computer programming. In JavaScript, you might have to create a website with a calendar, a train schedule, or an interface to set up appointments. These applications need to show relevant times based on the user's current timezone, or perform calculations around arrivals and departures or start and end times. Additionally, you might need to use JavaScript to generate a report at a certain time every day, or filter through currently open restaurants and establishments.

To achieve all of these objectives and more, JavaScript comes with the built in `Date` object and related methods. This tutorial will go over how to format and use date and time in JavaScript.

## The Date Object

The `Date` object is a built-in object in JavaScript that stores the date and time. It provides a number of built-in methods for formatting and managing that data.

By default, a new `Date` instance without arguments provided creates an object corresponding to the current date and time. This will be created according to the current computer's system settings.

To demonstrate JavaScript's `Date`, let's create a variable and assign the current date to it. This article is being written on Wednesday, October 18th in London (GMT), so that is the current date, time, and timezone that is represented below.

```js
// Set variable to current date and time
const now = new Date()

// View the output
now
```

```terminal
Wed Oct 18 2017 12:41:34 GMT+0000 (UTC)
```

Looking at the output, we have a date string containing the following:

| Day of the Week | Month | Day | Year | Hour | Minute | Second |    Timezone    |
| :-------------: | :---: | :-: | :--: | :--: | :----: | :----: | :------------: |
|       Wed       |  Oct  | 18  | 2017 |  12  |   41   |   34   | GMT+0000 (UTC) |

The date and time is broken up and printed in a way that we can understand as humans.

JavaScript, however, understands the date based on a **timestamp** derived from [Unix time](https://en.wikipedia.org/wiki/Unix_time#History), which is a value consisting of the number of milliseconds that have passed since midnight on January 1st, 1970. We can get the timestamp with the `getTime()` method.

```js
// Get the current timestamp
now.getTime()
```

```terminal
1508330494000
```

The large number that appears in our output for the current timestamp represents the same value as above, October 18th, 2017.

**Epoch time**, also referred to as zero time, is represented by the date string `01 January, 1970 00:00:00 Universal Time (UTC)`, and by the `0` timestamp. We can test this in the browser by creating a new variable and assigning to it a new `Date` instance based on a timestamp of `0`.

```js
// Assign the timestamp 0 to a new variable
const epochTime = new Date(0);

epochTime;
```

```terminal
01 January, 1970 00:00:00 Universal Time (UTC)
```

Epoch time was chosen as a standard for computers to measure time by in earlier days of programming, and it is the method that JavaScript uses. It is important to understand the concept of both the timestamp and the date string, as both may be used depending on the settings and purpose of an application.

So far, we learned how to create a new `Date` instance based on the current time, and how to create one based on a timestamp. In total, there are four formats by which you can create a new `Date` in JavaScript. In addition to the current time default and timestamp, you can also use a date string, or specify particular dates and times.

| Date Creation                                                       | Output                                              |
| ------------------------------------------------------------------- | --------------------------------------------------- |
| `new Date()`                                                        | Current date and time                               |
| `new Date(timestamp)`                                               | Creates date based on milliseconds since Epoch time |
| `new Date(date string)`                                             | Creates date based on date string                   |
| `new Date(year, month, day, hours, minutes, seconds, milliseconds)` | Creates date based on specified date and time       |

To demonstrate the different ways to refer to a specific date, we'll create new `Date` objects that will represent July 4th, 1776 at 12:30pm GMT in three different ways.

```js
// Timestamp method
new Date(-6106015800000);

// Date string method
new Date("July 4 1776 12:30");

// Date and time method
new Date(1776, 6, 4, 12, 30, 0, 0);
```

The three examples above all create a date containing the same information.

You'll notice the timestamp method has a negative number; any date prior to Epoch time will be represented as a negative number.

In the date and time method, our seconds and milliseconds are set to `0`. If any number is missing from the `Date` creation, it will default to `0`. However, the order cannot be changed, so keep that in mind if you decide to leave off a number. You may also notice that the month of July is represented by `6`, not the usual `7`. This is because the date and time numbers start from `0`, as most counting in programming does. See the next section for a more detailed chart.

## Retrieving the Date with `get`

Once we have a date, we can access all the components of the date with various built-in methods. The methods will return each part of the date relative to the local timezone. Each of these methods starts with `get`, and will return the relative number. Below is a detailed table of the `get` methods of the `Date` object.

| Date/Time          | Method              | Range                         | Example              |
| ------------------ | ------------------- | ----------------------------- | -------------------- |
| Year               | `getFullYear()`     | YYYY                          | 1970                 |
| Month              | `getMonth()`        | 0-11                          | 0 = January          |
| Day (of the month) | `getDate()`         | 1-31                          | 1 = 1st of the month |
| Day (of the week)  | `getDay()`          | 0-6                           | 0 = Sunday           |
| Hour               | `getHours()`        | 0-23                          | 0 = midnight         |
| Minute             | `getMinutes()`      | 0-59                          |                      |
| Second             | `getSeconds()`      | 0-59                          |                      |
| Millisecond        | `getMilliseconds()` | 0-999                         |                      |
| Timestamp          | `getTime()`         | Milliseconds since Epoch time |                      |

Let's make a new date, based on July 31, 1980, and assign it to a variable.

```js
// Initialize a new birthday instance
const birthday = new Date(1980, 6, 31);
```

Now we can use all our methods to get each date component, from year to millisecond.

```js
birthday.getFullYear();      // 1980
birthday.getMonth();         // 6
birthday.getDate();          // 31
birthday.getDay();           // 4
birthday.getHours();         // 0
birthday.getMinutes();       // 0
birthday.getSeconds();       // 0
birthday.getMilliseconds();  // 0
birthday.getTime();          // 333849600000 (for GMT)
```

Sometimes it may be necessary to extract only part of a date, and the built-in `get` methods are the tool you will use to achieve this.

For an example of this, we can test the current date against the day and month of October 3rd to see whether it's October 3rd or not.

```js
// Get today's date
const today = new Date();

// Compare today with October 3rd
if (today.getDate() === 3 && today.getMonth() === 9) {
  console.log("It's October 3rd.");
} else {
  console.log("It's not October 3rd.");
}
```

```terminal
It's not October 3rd.
```

Since, at the time of writing, it's not October 3rd, the console reflects that.

The built-in `Date` methods that begin with `get` allow us to access date components that return the number associated with what we are retrieving from the instantiated object.

## Modifying the Date with `set`

For all the `get` methods that we learned about above, there is a corresponding `set` method. Where `get` is used to retrieve a specific component from a date, `set` is used to modify components of a date. Below is a detailed chart of the `set` methods of the `Date` object.

| Date/Time          | Method              | Range                         | Example              |
| ------------------ | ------------------- | ----------------------------- | -------------------- |
| Year               | `setFullYear()`     | YYYY                          | 1970                 |
| Month              | `setMonth()`        | 0-11                          | 0 = January          |
| Day (of the month) | `setDate()`         | 1-31                          | 1 = 1st of the month |
| Day (of the week)  | `setDay()`          | 0-6                           | 0 = Sunday           |
| Hour               | `setHours()`        | 0-23                          | 0 = midnight         |
| Minute             | `setMinutes()`      | 0-59                          |                      |
| Second             | `setSeconds()`      | 0-59                          |                      |
| Millisecond        | `setMilliseconds()` | 0-999                         |                      |
| Timestamp          | `setTime()`         | Milliseconds since Epoch time |                      |

We can use these `set` methods to modify one, more, or all of the components of a date. For example, we can change the year of our `birthday` variable from above to be `1997` instead of `1980`.

```js
// Change year of birthday date
birthday.setFullYear(1997);

birthday;
```

```terminal
Thu Jul 31 1997 00:00:00 GMT+0000 (UTC)
```

We see in the example above that when we call the `birthday` variable we receive the new year as part of the output.

The built-in methods beginning with `set` let us modify different parts of a `Date` object.

## Date Methods with UTC

The `get` methods discussed above retrieve the date components based on the user's local timezone settings. For increased control over the dates and times, you can use the `getUTC` methods, which are exactly the same as the `get` methods, except they calculate the time based on the [UTC (Coordinated Universal Time)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) standard. Below is a table of the UTC methods for the JavaScript `Date` object.

| Date/Time          | Method                 | Range | Example              |
| ------------------ | ---------------------- | ----- | -------------------- |
| Year               | `getUTCFullYear()`     | YYYY  | 1970                 |
| Month              | `getUTCMonth()`        | 0-11  | 0 = January          |
| Day (of the month) | `getUTCDate()`         | 1-31  | 1 = 1st of the month |
| Day (of the week)  | `getUTCDay()`          | 0-6   | 0 = Sunday           |
| Hour               | `getUTCHours()`        | 0-23  | 0 = midnight         |
| Minute             | `getUTCMinutes()`      | 0-59  |                      |
| Second             | `getUTCSeconds()`      | 0-59  |                      |
| Millisecond        | `getUTCMilliseconds()` | 0-999 |                      |

To test the difference between local and UTC `get` methods, we can run the following code.

```js
// Assign current time to a variable
const now = new Date();

// Print local and UTC timezones
console.log(now.getHours());
console.log(now.getUTCHours());
```

Running this code will print out the current hour, and the hour of the UTC timezone. If you are currently in the UTC timezone the numbers that are output from running the program above will be the same.

UTC is useful in that it provides an international time standard reference and can therefore keep your code consistent across timezones if that is applicable to what you are developing.

## Conclusion

In this tutorial, we learned how to create an instance of the `Date` object, and use its built-in methods to access and modify components of a specific date. For a more in-depth view of dates and times in JavaScript, you can read the [Date reference on the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

Knowing how to work with dates is essential for many common tasks in JavaScript, as this can enable you to do many things from setting up a repeating report to displaying dates and schedules in the correct time zone.
