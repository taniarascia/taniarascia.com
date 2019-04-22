---
date: 2017-04-05
title: 'Prevent Mouse Scroll from Zooming on Embedded Google Maps'
template: post
thumbnail: '../thumbnails/gmaps.png'
slug: prevent-mouse-scroll-from-zooming-on-embedded-google-maps
categories:
  - CSS
tags:
  - css
  - google-maps
---

If you embed a Google Map into a website, they'll give you some HTML that looks like this:

```html
<iframe
  src="https://www.google.com/maps/embed?xxx"
  width="600"
  height="450"
  frameborder="0"
  style="border:0"
  allowfullscreen
>
</iframe>
```

And the embedded result will look like this.

You'll notice that when you scroll over the map, it will automatically start zooming in or out. This can be really annoying when all you want to do is scroll down the page, especially if the map takes up a lot of vertical space on the screen.

We can prevent this by creating an overlay div with `pointerEvents='none'`.

```html
<div class="overlay" onclick="style.pointerEvents='none'"></div>
<iframe
  src="https://www.google.com/maps/embed?xxx"
  width="100%"
  height="450"
  frameborder="0"
  style="border:0"
  allowfullscreen
>
</iframe>
```

And an `.overlay` class that will cover the element.

```css
.overlay {
  position: relative;
  width: 100%;
  height: 450px;
  top: 450px;
  margin-top: -450px;
  z-index: 1;
}
```

Now the map will only use the mouse to zoom after the user has clicked on the map. See example below.
