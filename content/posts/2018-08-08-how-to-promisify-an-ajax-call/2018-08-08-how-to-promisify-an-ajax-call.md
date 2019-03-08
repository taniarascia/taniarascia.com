---
date: 2018-08-08 21:51:34+00:00
title: "How to Promisify an Ajax Call"
template: post
slug: /how-to-promisify-an-ajax-call/
categories:
- JavaScript
- Tutorials
- UI/UX
tags:
- es6
- javascript
- jQuery
- promise
---


Let's say you have an AJAX call, and some other function that depends on the AJAX call loading before it runs. 

Here's the AJAX function.


    
    <code class="language-js">function doTheThing() {
        $.ajax({
            url: window.location.href,
            type: 'POST',
            data: {
                key: 'value'
            },
            success: function(data) {
                console.log(data);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }</code>



And you might call the two functions in succession, and find that the second function doesn't work, because it depends on the first one.


    
    <code class="language-js">doTheThing();
    doSomethingElse();</code>



We can quickly and easily rewrite this with a `Promise` 


    
    <code class="language-js">function doTheThing() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: window.location.href,
                type: 'POST',
                data: {
                    key: 'value'
                },
                success: function(data) {
                    resolve(data);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
    }</code>



Now we can do the AJAX call, run the success function, and follow it up with any subsequent code.


    
    <code class="language-js">doTheThing()
    .then(data => {
        console.log(data);
        doSomethingElse();
    })
    .catch(error => {
        console.log(error);
    });</code>



And that's it!		
