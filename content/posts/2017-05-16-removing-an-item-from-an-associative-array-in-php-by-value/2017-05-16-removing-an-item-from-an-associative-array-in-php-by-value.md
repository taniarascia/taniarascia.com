---
date: 2017-05-16 19:10:43+00:00
title: "Removing an item from an associative array in PHP by value"
template: post
slug: /removing-an-item-from-an-associative-array-in-php-by-value/
categories:
- Programming
- Tutorials
- Web
tags:
- array
- php
---


Recently, I was working with some JSON decoded into a PHP array, and I needed to remove an item from the associative array. With only the value, I wasn't sure how to remove it, and here was the code I used.


    
```php
foreach($arr['category'] as $key => $value) {
    	if (in_array('item_to_remove', $value)) {
    		unset($arr['category'][$key]);
    	}
    }
```



		
