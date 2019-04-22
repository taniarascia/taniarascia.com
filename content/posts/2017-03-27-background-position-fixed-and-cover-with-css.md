---
date: 2017-03-27
title: 'Background Position Fixed and Cover with CSS'
template: post
thumbnail: '../thumbnails/css.png'
slug: background-position-fixed-and-cover-with-css
categories:
  - CSS
tags:
  - css
---

I wanted to make a section of a website have a div featuring a background image that had both `background-attachment: fixed` and `background-size: cover`, regardless of the image's size. [This website](http://hub51chicago.com/private-parties) is a working example of multiple fixed, full-screen background image divs.

[Demo](http://codepen.io/taniarascia/pen/VpGXJQ)

```css
div {
  width: 100%;
  height: 90vh;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
}
```

You can also write this code in the `background` shorthand:

```css
div {
  background: url(file.jpg) no-repeat 50% fixed / cover;
}
```

Then you'd simply add the background image to the div and adjust the `height` property as necessary.

```html
<div style="background-image: url(file.jpg);"></div>
<div style="background-image: url(file.jpg);"></div>
<div style="background-image: url(file.jpg);"></div>
```

I'm only loading the background image in the HTML in the case that you're pulling the image dynamically via PHP. Otherwise, you can create separate classes with background images in the CSS file.

`fixed` and `cover` didn't use to play well together, and you would have to put the `height` property in an outer container, but I tested this code on Chrome, Firefox, Safari, and Opera, and it works fine.
