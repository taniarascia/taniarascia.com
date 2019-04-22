---
date: 2015-10-31
title: "You Don't Need a Framework: Understanding the Fundamentals of Responsive Design"
template: post
thumbnail: '../thumbnails/css.png'
slug: you-dont-need-a-framework
categories:
  - CSS
tags:
  - css
  - fundamentals
---

[Responsive web design](https://en.wikipedia.org/wiki/Responsive_web_design) is an approach to creating websites in which the layout adapts to fit the device's screen - whether it's a phone, tablet, laptop, desktop, TV, or hologram.

That sounds like a daunting task. Good thing we have CSS and JavaScript frameworks like [Bootstrap](http://getbootstrap.com/) and [Foundation](http://foundation.zurb.com/) to figure all that out for us, right?

Well, perhaps. Now, don't get me wrong - I think frameworks are fantastic tools that can drastically increase the speed of development while solving common problems, and all at the cost of a little creativity. If you use them, there's absolutely nothing wrong with that.

However, if you can't confidently put together a responsive site without the aid of a framework, you should definitely consider learning. It's important to know what's going on under the hood.

At the end of the day, it's really not as scary as it seems. Consider the most important aspects:

- **Foundation** - load-bearing code
- **Breakpoints** - at what point content will collapse
- **Structure** - a grid system
- **Navigation** - collapsible navigation

The likely reality is that you don't need even a fraction of what the frameworks come with. [The documentation](http://foundation.zurb.com/docs/) [for these frameworks](http://semantic-ui.com/introduction/getting-started.html) [is massive](http://getbootstrap.com/css/). If you're a more experienced developer, you might know how to grab the parts you want and integrate with LESS or Sass, but the average person is simply including the vanilla CSS and JS files, and overriding them in separate files.

There is satisfaction that comes with truly creating something from scratch, and having a deep understanding of how your code works and how to manipulate it.

## Foundation

### Define Viewport

Before you do anything else, you have to define the width of the viewport in your HTML. This will ensure that your site has no horizontal scroll - the full site will be visible, and users will not have to zoom on mobile to see the content.

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### Include a Browser Reset

Every browser renders content a little differently. Also, some people use out of date browsers. Some developers have created stylesheets to combat these issues. The two most widely used are [Reset](http://meyerweb.com/eric/tools/css/reset/) and [Normalize](http://necolas.github.io/normalize.css/). The difference between the two is that Reset completely eradicates all styles, while Normalize attempts to add consistency to the browser styling. I prefer Normalize, because you don't have to go back and re-style every element.

- [Normalize CDN](https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css)

```html
<link rel="stylesheet" href="css/normalize.min.css" />
```

### Reset Border Box

This is something that's left out of the reset that I would strongly recommend including in any project. [Read more about it](http://www.paulirish.com/2012/box-sizing-border-box-ftw/) if you'd like. It will make your padding consistent and prevent frustration.

```css
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
```

### Include jQuery (optional)

Writing vanilla JavaScript can be tedious. Include jQuery if you'd like.

[jQuery CDN](https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js)

```html
<script src="js/jquery.min.js"></script>
```

> A CDN is a link to a stylesheet or script generously provided by a large company that will access the file on a server close to the location of the client.

## Breakpoints

We use `@media` queries to define breakpoints. A breakpoint sets the pixel width at which the content will collapse - when your navigation bar will transform in some way, and your grid will break into individual elements. [Google Developers](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/how-to-choose-breakpoints?hl=en) suggests basing breakpoints on content, not specific devices, and I agree.

You may have heard the phrase **mobile first** flying around a lot. The concept is that you build your content to look great for mobile, and scale up from there. This is a good philosophy to work with.

The main effect this will have on our code is that we'll be using `min-width` queries, not `max-width`. Whatever your mobile device styles are will be on the main stylesheet, and any styles for a larger device will be added on.

I like to keep things simple, and have only one breakpoint. All of my phone, phablet, and tablet devices will be created first, and laptop, desktop, and large screens will be in the `@media` query. Your design might need to be more specific, in which case you'd add another breakpoint as necessary.

```css
/* Mobile first styles go here */

@media screen and (min-width: 800px) {
  /* Desktop styles go here */
}
```

The best way to lay this out is to include all of your `@media` queries next to their equivalent code.

```css
h1 {
  font-size: 1.5rem;
}

@media screen and (min-width: 800px) {
  h1 {
    font-size: 2rem;
  }
}
```

> `px`, `em`, or `rem`? [Here's a great article](http://webdesign.tutsplus.com/tutorials/comprehensive-guide-when-to-use-em-vs-rem--cms-23984) about it. Generally, I would suggest using fixed pixels only for styling elements, and `em` or `rem` for font sizing.

## Structure

In 2006, we were all in search of [the Holy Grail](http://alistapart.com/article/holygrail) - the ubiquitous three column layout. A decade later, that has changed a lot. Instead of two sidebars full of links with content in the middle, we expect an adaptable grid system. That grid system can easily take care of the "Holy Grail", but it's also optimal for the current trends of less text, less links, less pages, more images, more scroll, and big, bold statements.

### Grid System

You may be familiar with [Bootstrap's grid](http://getbootstrap.com/css/#grid), based on 12 columns.

```html
<div class="container">
  <div class="row">
    <div class="col-md-8">.col-md-8</div>
    <div class="col-md-4">.col-md-4</div>
  </div>
</div>
```

[Foundation](http://foundation.zurb.com/docs/components/grid.html) also runs on the 12 column system.

```html
<div class="row">
  <div class="medium-2 columns">2 columns</div>
  <div class="medium-10 columns">10 columns</div>
</div>
```

There is some controversy surrounding grids, in that they're usually not [semantic](https://en.wikipedia.org/wiki/Semantic_HTML), and their names don't make sense based on content. However, they're great for prototyping, and it's very easy to convert them into semantic HTML5 tags if you wish. But first, I'm going to set it up the traditional way so you can see how it works.

> Want to use the Flexbox layout model instead of a CSS float grid? [Here is a tutorial](http://www.taniarascia.com/easiest-flex-grid-ever/) on how to make the same grid in Flexbox.

See the Pen [CSS Float Grid](http://codepen.io/taniarascia/pen/GpGdyy/)

I prefer not to use a fixed column amount for my grids. Foundation, Bootstrap, and [Skeleton](http://getskeleton.com) all run on 12 column grids. If you only plan to use 5, or need 15, these systems would be hard to modify.

A better way to think of it would be to see each row as a progress bar of 100%. If you're only going to need a three column row, you can create a 33% width class. If you decide later that you want to make a 10 column row, you'll make a 10% width class. If you need 100 columns, you make a 1% width class. If you want a 75% width content area and a 25% width sidebar, you create those classes as well.

We want background colors and styles to span the width of the entire viewport, but not content. Content generally needs to be contained to a fixed width for legibility. (Imagine reading an article where the text was full width on an iMac, for example.)

```css
.container {
  margin: 0 auto;
  padding: 0 10px;
  max-width: 1000px;
}
```

The `.row` class is created. The row is basically a [clearfix hack](https://css-tricks.com/snippets/css/clear-fix/); no styling gets applied to this element. It simply exists for you to contain your columns.

```css
.row::before,
.row::after {
  display: table;
  content: ' ';
  clear: both;
}
```

All the columns are full width on mobile.

```css
.one,
.one-third,
.two-thirds,
.one-fourth,
.half {
  width: 100%;
}
```

No crazy calculations or margins here. Thanks to our `border-box` property from before, the width of the class will be exactly what you think it should be. You can choose to do a `calc` function, or simply write the percents. Finally, all the columns get floated to the left on desktop.

```css
@media only screen and (min-width: 800px) {
  .one {
    width: 100%;
  }
  .half {
    width: calc(100% / 2);
  }
  .one-third {
    width: calc(100% / 3);
  }
  .one-fourth {
    width: calc(100% / 4);
  }
  .two-thirds {
    width: calc(100% / 3 * 2);
  }
  .column {
    float: left;
  }
}
```

And that's the entirety of the grid.

```html
<div class="container">
  <div class="row">
    <div class="one column">Column</div>
  </div>
  <div class="row">
    <div class="half column">Half column</div>
    <div class="half column">Half column</div>
  </div>
</div>
```

> Want to make it semantic? Replace `.container` with `main`, `row` with `section`, and `column` with `article` and `aside`. Your individual sizes can be to represent the content.

```html
<main>
  <section>
    <article class="content column"></article>
    <aside class="sidebar column"></aside>
  </section>
</main>
```

## Navigation

Navigation is definitely the most tricky part about the whole proces. There are quite a few common patterns for responsive design navigation - [off-canvas](http://responsivenavigation.net/examples/off-canvas-slide/), [full screen overlay](http://tympanus.net/Development/FullscreenOverlayStyles/), or [toggle](http://www.hongkiat.com/blog/responsive-web-nav/), to name a few. One thing most of these style and more have in common is the three-line hamburger menu icon. [Not everyone thinks the three-line hamburger menu is a great thing](https://lmjabreu.com/post/why-and-how-to-avoid-hamburger-menus/), though.

It's important to think about your content when designing your layout. Just because something is trendy, doesn't always mean is provides a good user experience. I would suggest highlighting the main callouts of your site on mobile outside of the hamburger menu, if you use it.

Earlier, I wrote an article [on how to make a responsive dropdown navigation bar](http://www.taniarascia.com/responsive-dropdown-navigation-bar/) from scratch. If you want a complete understanding of how it works from start to finish, I would recommend reading that article.

See the Pen [Responsive Dropdown Navigation Bar](http://codepen.io/taniarascia/pen/dYvvYv/)

I have also created a simplified version without dropdowns and written in vanilla CSS. [Click here to view the simplified pen](http://codepen.io/taniarascia/pen/epKrPm).

## Conclusion

There might be a few more elements you'll have to style from here - namely, `input` types, tables and buttons. The first time around, it can seem a bit overwhelming to create a layout from scratch if you're used to working with a framework.

The biggest draw for custom designs for me is ease of creativity. If I wanted to change up Bootstrap's navbar to work completely differently, I would spend more time overriding styles than if I created my own navigation from scratch. Understanding your code gives you full power over the design.
