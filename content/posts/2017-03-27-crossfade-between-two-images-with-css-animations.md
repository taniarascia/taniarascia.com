---
date: 2017-03-27
title: 'Crossfade Between Two Images with CSS Animations'
template: post
thumbnail: '../thumbnails/css.png'
slug: crossfade-between-two-images-with-css-animations
categories:
  - CSS
tags:
  - animation
  - css
---

A website I worked on wanted an animated, flashing neon sign. A gif is the first thing that comes to mind in such a situation, but unfortunately gifs do not allow partial transparency, and I needed to place this image on a textured background. The solution was to use CSS animations to alternate between two pngs.

I used a modified method from [this guide by Rick Bradshaw](http://css3.bradshawenterprises.com/cfimg/).

[View demo](http://codepen.io/taniarascia/pen/jBvKVL)

Put the two images in an outer block element.

```html
<section>
  <img class="bottom" src="img.png" />
  <img class="top" src="img-2.png" />
</section>
```

The outer will be `relative` and the inner will be `absolute`.

```css
section {
  position: relative;
}

section img {
  position: absolute;
}
```

Create the animation and apply it to the top element.

```css
.top {
  animation-name: fade;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  animation-direction: alternate;
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
```
