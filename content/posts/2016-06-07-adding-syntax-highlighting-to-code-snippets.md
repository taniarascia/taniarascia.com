---
date: 2016-06-07
title: "Adding Syntax Highlighting to Code Snippets in a Blog or Website"
template: post
thumbnail: '../thumbnails/newmoon.png'
slug: adding-syntax-highlighting-to-code-snippets
categories:
  - CSS
tags:
  - code
  - syntax highlighting
---

I've received a few requests on how to highlight the syntax of snippets of in a blog like I have. Here is an example snippet of SCSS code, so you can see exactly what I'm referring to.

```scss
// Variables
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}

body {
  font: 100% $font-stack;
  color: $primary-color;
}

.box {
  @include border-radius(10px);
}
```

Many people initially think you have to manually color the elements, or manually escape the characters, but it's much more simple than that, so I'll cover everything necessary to embed snippets in your own blog or website in this article.

#### Prerequisites

- Basic knowledge of HTML and CSS.

#### Goals

- Highlight code syntax in a website or blog.
- Automatically escape HTML and PHP code in WordPress.

There are two main options to displaying code on your site - embedding the code or using JavaScript to highlight the syntax of `pre` and `code` tags.

## Embedding

The faster, easier option for syntax highlighting is embedding the code in the form of a [GitHub gist](https://gist.github.com/) or [Codepen pen](http://codepen.io/pen). Both of these can be done with an account or anonymously.

#### Gist

Here is an example of the above code embedded as a GitHub gist:

#### Pen

And here is the above code embedded as a CodePen pen.

See the Pen [mEerjX](http://codepen.io/taniarascia/pen/mEerjX/)

The advantage to embedding is that it's quick and easy. CodePen in specific is excellent for demos because you can show the code and the result.

However, loading multiple embed scrips throughout your blog can slow it down significantly, and additionally you don't have much control as to how the code snippet looks and what colors it uses. CodePen is only for front end web development, and you wouldn't be able to embed code in PHP, Ruby, Python, and so on. For many, that might not matter, and for others it does. For both of these options, all you do is paste your code and find the "embed" button.

## JavaScript Highlighting

The alternative option is using a JavaScript library to automatically highlight your code. There are two main options here - [Highlight.js](https://highlightjs.org/) and [Prism.js](http://prismjs.com/). [Google Prettify](https://github.com/google/code-prettify) is a third option.

I'll focus on Prism.js here, as it's what I use for this site, but I've used all the above at some point and they're all very similar.

On the Prism website, you can [download](http://prismjs.com/download.html) the CSS and JS for Prism. They give you options on what languages and theme you plan to use, so you'll just check the relevant ones and get the download.

All the Prism files are also available as a [CDN](https://cdnjs.com/libraries/prism), so if you don't wish to download anything, you can do it that way.

For the sake of simplicity, I'm going to assume you don't need anything special, and will use the most basic CDN. Link to the CSS in your `<head>`:

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.0/themes/prism.min.css"
/>
```

And link to the JS before the closing `<body>` tag.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.0/prism.min.js"></script>
```

Finally, wrap your desired code in `<pre><code class="language-whatever">`. You're defining the language, and the `<pre>` ensures that all your indentation will be properly preserved.

```html
<pre><code class="language-css">body {
      font: 100% Helvetica, sans-serif;
      color: #333;
    }

    .box {
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      -ms-border-radius: 10px;
      border-radius: 10px;
    }
```

</pre>
```

Now here's what that ends up looking like.

See the Pen [Prism Syntax Highlighting](http://codepen.io/taniarascia/pen/wWKzQQ/)

Now you override the styles with whatever you want in the CSS file. On this blog, I use [New Moon](http://taniarascia.github.io/new-moon/), my own personal coding theme that I made available as an open-source package on Brackets, Atom, and Sublime because I'm that much of a dork. I encourage you to make your own as well.

## Escaping HTML and PHP

In order to display HTML or PHP code, some of the symbols must be escaped so the browser doesn't try to parse the code. You can use an online converter like [Free Online HTML Escape Tool](http://www.freeformatter.com/html-escape.html) to do this if your website is plain HTML.

If you're writing on a WordPress blog, there is a [WordPress plugin](https://wordpress.org/plugins/escape-html/) to do this, but it doesn't work properly with Prism.js.

[Here is some modified code that you can place in your **functions.php** to automatically escape HTML in your posts.](https://github.com/taniarascia/wp-functions#escape-html-in-posts)

## Conclusion

Well, this was probably the most meta post I've ever made. Now you should know how to display beautiful code on your site in the way that works best for you. Each way has a limitation and advantage. I personally don't like relying on a third party service for anything, which is why I don't use gists or Disqus for comments. If you want to see some other helpful WordPress functions, [this is the resource for you.](https://github.com/taniarascia/wp-functions)
