---
date: 2015-09-30
title: 'Basic HTML5 Skeleton File'
template: post
thumbnail: '../thumbnails/html.png'
slug: basic-html5-file
categories:
  - CSS
tags:
  - html
---

I often like to start my projects from scratch and stray away from using frameworks. [HTML5 Boilerplate](https://html5boilerplate.com/) is a really great resource for creating a style-agnostic web project foundation; all your bases will be covered. However, it's much more than I need for a standard project, and I'd waste more time deleting what I don't need than I'd save for the convenience.

A minimal index.html file should always contain a few things, though.

### Declare the document type

- `<!doctype html>` - [HTML5](https://en.wikipedia.org/wiki/HTML5).

### Define the character coding

- `<meta charset="utf-8">` - [ UTF8](https://en.wikipedia.org/wiki/UTF-8).

### Define the width of the viewport

- `<meta name="viewport" content="width=device-width, initial-scale=1">`
  [Optimize for mobile](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag) and prevent zoom/horizontal scroll.

### Make browsers render elements consistently with a CSS reset.

- [Normalize.css](https://necolas.github.io/normalize.css/) is a good option.

### Include links to Custom CSS and JavaScript

- `css/style.css` and `js/scripts.js` are acceptable paths.

### Use the latest Internet Explorer rendering mode (optional)

- `<meta http-equiv="x-ua-compatible" content="ie=edge">` - [Not mandatory, but might be helpful.](<https://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx>)

### Basic index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title></title>

    <link rel="stylesheet" href="css/main.css" />
    <link rel="icon" href="images/favicon.png" />
  </head>

  <body>
    <script src="js/scripts.js"></script>
  </body>
</html>
```
