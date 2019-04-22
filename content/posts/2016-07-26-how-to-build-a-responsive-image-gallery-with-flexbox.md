---
date: 2016-07-26
title: 'How to Build a Responsive Image Gallery with Flexbox'
template: post
thumbnail: '../thumbnails/css.png'
slug: how-to-build-a-responsive-image-gallery-with-flexbox
categories:
  - CSS
tags:
  - css
  - flex
  - gallery
---

You may have noticed I've updated the site to include a [front page with a grid listing all the tutorials](/). As you resize the screen, it goes from three columns, to two columns, to a single column on mobile. Another great example of that is [this really weird musical side project of mine](/music/), where I arrange all the songs as if they're a Spotify album listing. The only real difference between those two is that one has margins, and the other doesn't.

In this quick article, I'm going to go over how to create a responsive grid of images like that with flexbox.

#### Prerequisites

- Basic knowledge of HTML and CSS.

#### Goals

- Create a responsive, repeating grid (image gallery) with flexbox.
- (Optional) Demonstrate how to integrate that into a custom WordPress loop.

## Grid

Make sure before starting to include some sort of reset, or at least set `box-sizing: border-box` and `margin: 0` to the body. [(More about all that, if you're not sure.)](/you-dont-need-a-framework/) Now we can get started on the grid.

### Mobile

We'll start off by making the mobile page - mobile first layout means utilizing `min-width` `@media` queries for bigger screen sizes.

I'm just going to put everything inside a generic container to start.

```css
.container {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
}
```

The `grid` class will be the flex wrapping container. For mobile, everything is one column, so it doesn't need to be defined as flex yet.

Inside that, I'm going to make a `cell` and place an image inside of that. We'll make the image responsive by putting a `max-width` on it.

```css
.responsive-image {
  max-width: 100%;
}
```

And the image should be a block level element.

```css
.cell img {
  display: block;
}
```

So here's our whole HTML code.

```html
<div class="container">
  <div class="grid">
    <div class="cell">
      <img src="http://placehold.it/800x800" class="responsive-image" />
    </div>
    <div class="cell">
      <img src="http://placehold.it/800x800" class="responsive-image" />
    </div>
    <div class="cell">
      <img src="http://placehold.it/800x800" class="responsive-image" />
    </div>
    <div class="cell">
      <img src="http://placehold.it/800x800" class="responsive-image" />
    </div>
  </div>
</div>
```

It looks like this.

![mobile](../images/mobile.png)

That's all we need for mobile. Now we'll move on to the medium screen devices.

### Tablet

I'm going to choose `600px` as the width to start showing the mid-screen view. We want the images to show up in rows of two now.

```css
@media screen and (min-width: 600px) {
  .grid {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .cell {
    width: 50%;
  }
}
```

The `grid` wrapping container is defined as a `flex` element, which will `wrap` in the direction of a `row` (horizontal). Since I now want the images to show up in rows of two columns, I'm going to set the width to `50%`.

![tablet](../images/tablet.png)

### Desktop

At `1000px`, I'm going to show the desktop view, which will display the images in rows of three.

```css
@media screen and (min-width: 1000px) {
  .cell {
    width: calc(100% / 3);
  }
}
```

I write out the width as `calc(100% / 3)` instead of `33.33333%`, because it's easier to make sure it's correct.

![desktop](../images/desktop.png)

## Margins

This gallery has no padding or spacing between the images. You have to make some slight adjustments if you want to add space between all the images.

First, add a margin around the `cell` for all screen sizes.

```css
.cell {
  margin: 1rem;
}
```

Then edit the width of the cells on their respective sizes.

```css
@media screen and (min-width: 600px) {
  .cell {
    width: calc(50% - 2rem);
  }
}

@media screen and (min-width: 1000px) {
  .cell {
    width: calc(33.3333% - 2rem);
  }
}
```

![](../images/Screen-Shot-2016-07-27-at-10.57.26-AM.png)

## WordPress Gallery

The best part about this grid is it can be easily looped. If you're not familiar with WordPress, [here's the article to get you started.](/developing-a-wordpress-theme-from-scratch/)

Instead of using a WordPress gallery plugin, you can pull images by category from the media gallery. The prerequisite to this is allowing category for attachments, which you can do by adding this code to **functions.php**.

```php
// Add Categories for Attachments
    function add_category_for_attachments() {
        register_taxonomy_for_object_type( 'category', 'attachment' );
    }
    add_action( 'init' , 'add_category_for_attachments' );
```

There is one small, useful plugin that you might want to use that allows you to bulk add and delete category from gallery images - [Media Library Categories](https://wordpress.org/plugins/wp-media-library-category/).

Here's an example using the flex grid above and pulling all images from the gallery with the category of "Gallery".

```php
<div class="container">
    	<div class="grid">
    			<?php
    			$args = array(
    'post_type' => 'attachment',
    'post_mime_type' => 'image',
    'orderby' => 'post_date',
    'order' => 'asc',
    'posts_per_page' => '30',
    'post_status'    => 'inherit',
    'category_name' => 'Gallery'
    			 );
    			$loop = new WP_Query( $args ); while ( $loop->have_posts() ) : $loop->the_post();
    			$image = wp_get_attachment_image_src( get_the_ID(), 'full' ); // Full sized image
    			$thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'thumbnail' ); // Thumbnail size
          ?>

    <div class="cell"><a href="<?php echo $image[0]; ?>"><img src="<?php echo $thumb[0]; ?>" class="responsive-image"></a>
```

    			<?php endwhile; ?>
    	</div>
    </div>
```

## Conclusion

This is a very basic, simplified version of a flex grid, but hopefully you have a good understanding of how a looping flex grid works now. [Fluidbox](http://terrymun.github.io/Fluidbox/demo/index.html) is a great jQuery library I also like to combine with front end code for a beautiful gallery. [Masonry](http://masonry.desandro.com/) is another useful library if you're dealing with all differently sized images.

[View Demo](http://codepen.io/taniarascia/pen/vKZKxP)
