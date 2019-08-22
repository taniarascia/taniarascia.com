---
date: 2019-02-11
title: 'Everything I Know as a Software Developer Without a Degree'
template: post
thumbnail: '../thumbnails/floppy.png'
slug: everything-i-know-as-a-software-developer-without-a-degree
categories:
  - Personal
  - Popular
tags:
  - career
  - life
---

I'm not going to get into the details of [my story](/how-i-made-a-career-change-into-web-development/) - in short, I liked making websites as a kid, but I went to culinary school and worked in the restaurant industry for nearly a decade. Eventually I needed out, and I decided on making a career out of web development. Despite only knowing some basic outdated HTML and CSS, I wanted a new life and I wanted it without going back to school and getting a degree, or paying for a bootcamp.

I see people ask all the time what they need to know to become a web developer, how long it takes, what they'll make, and so on. It's hard to have all the answers to those questions, but I can share my own experience.

So I present to you a list of all the concepts, libraries, frameworks, and technology I've learned over the years, in the order I learned it, with links to the side quests and articles I've written about them. Although I'm trying to write it in order, there is some overlap.

I'll try not to make too many assumptions, but this list is not meant to be a deep dive on any topic - although many of the links are!

> Note: Some of the earlier articles may be amateur and have information that I wouldn't necessarily put into an article on the subject if I wrote it today.

## Pre-Knowledge (1998 - 2014)

I made my first websites in the late nineties by viewing the source of sites I landed on in Netscape Navigator (a browser), copying the HTML into Notepad (a text editor), and uploading the pages to Geocities (a web host). HTML, text editors, and hosting most likely seem like second nature to many of us, but like everything else related to computers, it's not inherent knowledge, and it's a hurdle to get through as a beginner. I just happened to do it early enough that I wasn't even aware I was learning.

Here's what I learned in that period, although since I learned by doing, I didn't know the proper terms for many things:

- An idea of what **HTML** (Hypertext Markup Language) is - the very first step to doing anything related to web development.
- How to view the HTML **source** of a **web browser** (Netscape Navigator, and later Internet Explorer).
- How to create and edit an HTML file with a **text editor** (Nodepad) and save it locally on my file system (Windows as my OS).
- Basic HTML **tags/elements** - text, headings, lists, tables, links, images, formatting (also blinking text).
- How to make colors with **hex codes**.
- How to use **FTP** (File Transfer Protocol) to upload files from my computer to a web **host** on the internet to make my website publicly accessible.

A few years later, CSS became popular, and I spent the next several years copying the CSS of sites I liked to make designs. CSS was revolutionary because you could do things like change all the colors of your links in one spot instead of all over your pages, having different sets of link colors, and so on.

- How to use **CSS** (Cascading Style Sheets) to design the layout, font, spacing, and colors of a website.
- How to bring CSS (Cascading Style Sheets) files into an HTML file.
- How to create layouts with floats instead of tables.

Although I had been making websites for years, I'd never read a tutorial, article, or watched a video about web design/development. So although I was oddly competent at making a website intuitively from all the sites I downloaded and played around with, I didn't actually know many basic concepts like how CSS selector specificity worked, or ids vs. classes, how to use pseudo selectors, and I would often end up brute forcing solutions for things like positioning and the box model.

This is generally the extent of everything I knew about web development before I decided to make a career out of it: basic HTML, basic CSS, basic managed hosting, and transferring files via FTP - everything I knew was static development, and I had absolutely no concept of programming. For anything that might be more advanced or dynamic - counters, guestbooks, blogs, forums - I used a third-party resource.

## Getting Started and Internship (2014-2015)

Somehow, it still didn't occur to me to really do much studying before diving into this new career. I bought [_HTML, XHTML & CSS for Dummies_](https://books.google.com/books?id=I8xhVj9qTUQC&printsec=frontcover&dq=html+xhtml+and+css+for+dummies&hl=en&sa=X&ved=0ahUKEwju-Zfa1ajgAhXypYMKHSEFB4EQ6AEIKjAA#v=onepage&q=html%20xhtml%20and%20css%20for%20dummies&f=false) from a used book store - which was honestly only a few years out of date at this point - and looked over it all. I was pretty overjoyed to discover that I knew basically everything in the book from my heuristic approach, but now I knew more of the technical terms.

I was lucky enough that a [bartender](https://hijoemartin.com) at the restaurant I was working at was starting his own business and offered me an unpaid internship for a few months. So by day I did the internship and by night I cooked at the [Pac-Man restaurant](http://www.pacmanentertainment.com/). At the same time, I was scouring Craigslist for some small jobs, and I created a few static Bootstrap sites as a freelancer. A lot changed since my early days, and here's what I learned during this time.

- Upgrading Notepad to [Notepad++](https://notepad-plus-plus.org/) was a first step, which I quickly traded for Adobe [Brackets](http://brackets.io/).
- [How to use **Bootstrap**, a responsive CSS/JS framework](/what-is-bootstrap-and-how-do-i-use-it/) - I found out responsive design was a new thing I would have to know, and I learned how to integrate Bootstrap, a third party framework, into my sites. I made a site about accordions at this point, and spent a long time trying to use PHP to set up a contact form on my Bootstrap site.
- [The fundamentals of **responsive design** without a framework](/you-dont-need-a-framework/) - I didn't like how dependent I was on Bootstrap to create a responsive design, so I learned how to make a responsive site without it.
- [The basics of **jQuery**, a JavaScript library](/how-to-use-jquery-a-javascript-library/) - Although I had no knowledge of JavaScript or programming, I began to figure out the basics of jQuery by copying and pasting snippets and code and hoping for the best - which I would use to make "awesome" effects like [parallax scroll](/parallax-scroll-effect/). It was a hurdle to learn how to load a JavaScript file, load jQuery first, and other very novice mistakes. Eventually I learned how to make [tabs, accordions, dropdowns, modals](/simple-jquery-examples-with-code-and-demos/) and other common UI elements from scratch with jQuery.
- How to create several types of navigation styles without relying on Bootstrap - [dropdown navigation bar](/responsive-dropdown-navigation-bar/), [off-canvas navigation](/off-canvas-navigation/), [full-screen navigation](/full-screen-navigation-overlay/). I really wanted to be independent of relying on Bootstrap.
- [How to use **flexbox**](/easiest-flex-grid-ever/) - I can't say I understood flexbox to the full extent at this time, but I was beginning to figure out how to use it in many situations that I had previously used floats.
- [How to use and and set up a **Mac**](/setting-up-a-brand-new-mac-for-development/) - I started using a Mac for the first time, after 20 years of only using Windows.

I have to make a pause here, because the next thing I learned blew my mind and is what really enabled me to start moving to the next level beyond making simple brochure-type websites: the command line.

- [How to use the **command line** (\*nix)](/how-to-use-the-command-line-for-apple-macos-and-linux/) - understanding that I could navigate and command my computer through the command line seems obvious to me now, but was revolutionary for me. I learned about moving, copying, deleting, changing permissions, installing programs, using command line text editors, `sudo`, and more.
- How to use SSH (Secure Shell) to login to another computer through the command line. This blew my mind as well.
- [How to use **Sass**, a CSS preprocessor](/learn-sass-now/) - this enabled me to install and learn Sass, which was my initial reason for learning the command line. I learned how to structure a project, use variables and nesting, and watch changes to a file to compile Sass to CSS.
- [How to use **Grunt**, a JavaScript task runner](/getting-started-with-grunt-and-sass/) - Just compiling Sass wasn't enough - I wanted to combine it with auto-prefixing, minifying, and other tasks. Grunt was the way to do that, so I learned how to set up a Grunt process.
- [How to install and use **Node.js and npm**](/how-to-install-and-use-node-js-and-npm-mac-and-windows/) - in learning how to install Grunt to compile my Sass, I had to learn how to install Node, and importantly, the concept of local installations. This opened up a whole new world to me.
- [How to use **Gulp**, another JavaScript task runner](/getting-started-with-gulp/) - I quickly realized Grunt was convoluted and slow, so I upgraded to using Gulp.
- Programming 101 through JavaScript - [comments, varibles, data types](/javascript-day-one/), and [comparisons, math, and logic](/javascript-day-two/). I didn't know how to do anything practical with programming yet outside of my jQuery tinkering, but I started gaining a better understanding of the fundamentals.
- [How to use basic **Git** commands and make a repository](/getting-started-with-git/) - I didn't quite understand Git yet, but I knew how to use four or five commands to use Git as a glorified FTP, and that was a start to learning about version control. I knew Git was important, but without a team to work with I wasn't exposed to many of the concepts I'd learn later.

## Job 1: Junior Web Developer - WordPress (2015-2017)

_11% salary increase from experienced chef to entry level junior WordPress developer_

It's great that I learned all that, because for my first real job in the industry, I was going to use practically none of it. No Git, no Node, no Sass, no Grunt nor Gulp, no command line, no Bootstrap. Just cold, hard WordPress. Nonetheless, this was going to present a whole new group of challenges to overcome and things to learn.

A few months into my internship, I applied for a job at a different company as a junior web developer/designer. I'd spend the next two years (exactly two years, to the day!) making websites with [Teo](https://teodor.co/).

- [How to set up a **LAMP** environment](/local-environment/) - I had hosting, but I never used PHP and it never occurred to me that a host was any different than my local HTML setup. I learned how to set up a local environment for Linux (or Mac, or Windows), Apache (the server), MySQL (the database), and PHP - a full "stack".
- [How to set up **Apache and virtual hosts**](/setting-up-virtual-hosts/) - I learned how to configure the Apache server to be able to run many virtual hosts at the same time.
- [How to set up **cron jobs**](/setting-up-a-basic-cron-job-in-linux/) in Linux.
- The basics of PHP and PHP tags - "PHP: HTML Preprocessor", as is what PHP stands for, is the most popular programming language on the web and the language most web developers start off with. I learned that if I started some code with `<?php` and ended it with `?>`, everything inside would be PHP, and everything outside of that would be rendered as regular HTML.

For the longest time, I wanted to know how to make my OWN blog - not rely on Blogger, or WordPress(.com) hosting, but something I hosted _myself_ with my own design - not someone else's theme. But how? I didn't know how and it was immensely frustrating. I struggled a lot, and when I finally figured out how to use WordPress(.org)'s platform to create my own unique blog, I wrote an article to share with the world what I learned.

- [How to develop a **WordPress** theme from scratch](/developing-a-wordpress-theme-from-scratch/) - this is the article that enabled me to begin this blog, and to start my first job in web development. I began by learning how to make posts, pages, a front page, header, footer, and navigation and put it into a unique, custom layout.
- [WordPress pagination, comments, functions, & custom posts](/wordpress-from-scratch-part-two/) - I began taking my WordPress development to an intermediate level.
- [WordPress custom fields](/wordpress-part-three-custom-fields-and-metaboxes/) - The final step to learning how to turn WordPress into a true CMS (Content Management System).
- [How to use **JSON** with PHP and/or JavaScript](/how-to-use-json-data-with-php-or-javascript/) - I learned how to utilize data stored in JSON format (JavaScript Object Notation) in my PHP or JavaScript code.
- [**Ajax**](/how-to-promisify-an-ajax-call/)
- [How to use Google Maps API](/google-maps-apis-for-multiple-locations/) - my first foray into learning what an **API** (Application Program Interface) key is and how to use one.
- [How to set up a website with **TLS** (Transport Layer Security)/SSL (Secure Sockets Layer)](/https-ssl-tls-certificate-how-to/) - to get a HTTP secure (https) URL.

At some point, I was given the responsibility of learning how to use AWS (Amazon Web Services) to set up Linux servers and migrate our websites over.

- [How to use **AWS** and the AWS ecosystem](/getting-started-with-aws-setting-up-a-virtual-server/) - I learned so much about DevOps and AWS in this period - setting up a VPC (virtual private cloud), an EC2 instance (a virtual server in the cloud), S3 (object storage buckets for static files), setting up a LAMP server from scratch, migrating websites and configuring DNS (Domain Name Service), generating public/private keys, and much more.
- [How to set up **virtual machines**, using Vagrant and VirtualBox](/what-are-vagrant-and-virtualbox-and-how-do-i-use-them/)
- [How to set up an **SSG** (Static Site Generator) using Jekyll](/make-a-static-website-with-jekyll/) - I started exploring other methods of setting up things like a blog, and learned how to make a Jekyll blog and host it on GitHub.
- How to use PDO to connect to MySQL and create a **CRUD** app: [Creating, reading](/create-a-simple-database-app-connecting-to-mysql-with-php/), [updating and deleting](/create-a-simple-crud-database-app-php-update-delete/) - Soon, I got tired of relying on WordPress to do anything dynamic with a website. Since I already knew some PHP from WordPress, I looked into learning how to build my own dynamic site that could connect to a database.
- **Accessibility** - I learned much about making a website accessible for people with disabilities, from having appropriate contrast, to making websites accessible only by keyboard, to captioning audio, and much more, following [WCAG 2.0](https://www.wuhcag.com/) standards.

### Side project: Primitive CSS Framework

While working as a WordPress developer, I also made all my own custom designs for the sites I created. To speed up this process, I created [Primitive](https://taniarascia.github.io/primitive) [(source)](https://github.com/taniarascia/primitive), a minimal CSS framework and website boilerplate that made it quick and easy for me to make unique, custom designs. The framework is built in Sass. With Primitive, I could create the majority of a site's CSS in a few hours.

I built many sites with Primitive - [Cafe Ba Ba Reeba](http://cafebabareeba.com), [Shaw's Crabhouse](http://shawscrabhouse.com), [Tokio Pub](http://tokiopub.com), [Krispy Kreme Pacific Northwest](http://krispykremepacificnw.com/), this blog, and more.

### Side project: New Moon

I created [New Moon](https://taniarascia.github.io/new-moon/), the best code theme for web development, and distrubuted it to [Visual Studio Code](https://github.com/taniarascia/new-moon-vscode), [Brackets](https://github.com/taniarascia/new-moon), [Sublime Text](https://github.com/taniarascia/new-moon-sublime), [Chrome DevTools](https://chrome.google.com/webstore/detail/devtools-theme-new-moon/lndddploiofhfpdcoclegenegblkhlfk?hl=en), learning how to create extensions for each of those environments.

## Side quest: Technical Writer for DigitalOcean

I took a few month long sabbatical and traveled around Europe for a while after I left the WordPress job, but during that time I wrote the [How to Code in JavaScript](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript) and [Understanding the DOM (Document Object Model)](https://www.digitalocean.com/community/tutorial_series/understanding-the-dom-document-object-model) series, which gave me a much deeper understanding programming and JavaScript, concepts like prototypical inheritance and scope, and finally understanding how the DOM actually works and is different than a website's source, which was much less relevant to me when I was only working with PHP-based sites.

I learned about [syntax and code structure](https://www.digitalocean.com/community/tutorials/understanding-syntax-and-code-structure-in-javascript), [comments](https://www.digitalocean.com/community/tutorials/how-to-write-comments-in-javascript), [strings](https://www.digitalocean.com/community/tutorials/how-to-work-with-strings-in-javascript), [variables, scope, and hoisting](https://www.digitalocean.com/community/tutorials/understanding-variables-scope-hoisting-in-javascript), [math](https://www.digitalocean.com/community/tutorials/how-to-do-math-in-javascript-with-operators), [arrays](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript), [mutator](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript), [accessor](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-accessor-methods), and [iteration](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-iteration-methods) methods. I also learned about [objects](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript), [object methods](https://www.digitalocean.com/community/tutorials/how-to-use-object-methods-in-javascript), [conditionals](https://www.digitalocean.com/community/tutorials/how-to-write-conditional-statements-in-javascript), [functions](https://www.digitalocean.com/community/tutorials/how-to-define-functions-in-javascript), [prototypes and inheritance](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript), and [classes](https://www.digitalocean.com/community/tutorials/understanding-classes-in-javascript).

From the DOM side, I learned [what the DOM is and how it's different than HTML source code](https://www.digitalocean.com/community/tutorials/introduction-to-the-dom), about [nodes and node types](https://www.digitalocean.com/community/tutorials/understanding-the-dom-tree-and-nodes), how to [access](https://www.digitalocean.com/community/tutorials/how-to-access-elements-in-the-dom), [traverse](https://www.digitalocean.com/community/tutorials/how-to-traverse-the-dom), and [change](https://www.digitalocean.com/community/tutorials/how-to-make-changes-to-the-dom) the DOM. I also learned how to modify [styles, classes, and attributes](https://www.digitalocean.com/community/tutorials/how-to-modify-attributes-classes-and-styles-in-the-dom), and gain a better understanding of [events, event handlers, and event listeners](https://www.digitalocean.com/community/tutorials/how-to-modify-attributes-classes-and-styles-in-the-dom).

## Job 2: Back End PHP Developer (2018)

_28% salary increase from previous starting salary_

After I got back from traveling, I started looking for another job. I knew I never wanted to work in WordPress again, and I didn't necessarily want to learn another programming language and its environment to find a job right away. I also thought PHP was fun, so I wanted to find a job where I could use PHP, but not WordPress.

- [How to write a memory game in JavaScript](/how-to-create-a-memory-game-super-mario-with-plain-javascript/) - For one job interview for becoming a PHP developer, I made a memory game in JavaScript, putting together much of what I learned about the DOM and data types to actually build things without any libraries or frameworks or tutorials.
- [How to write **unit tests** and set up automated testing](/unit-testing-in-javascript/) - I had never had a job that knew the concept of testing, and my next job would be no exception, but I did learn some [concepts of testing](http://qualitytesting.tech/test-level-overview/), what unit, integration, and end-to-end tests mean and how to set them up.
- [How to connect to a **REST API** with JavaScript](/how-to-connect-to-an-api-with-javascript/) - I began to learn what REST (Representational State Transfer) was, and how REST HTTP methods could be comparable with CRUD.
- [JavaScript local storage and session storage](/how-to-use-local-storage-with-javascript/)
- [How to work with **files and file uploads**](/how-to-upload-files-to-a-server-with-plain-javascript-and-php/) - I worked a lot with modifying and saving files to a file system through JavaScript and PHP, something that was intensely mysterious to me previously.
- How to work with SVGs, polygons and paths - I worked a lot with maps of concert halls and arenas at this job, and learned how to create and work with SVGs, polygons and paths.
- [How to use **SQL** (Structured Query Language) commands](/overview-of-sql-commands-and-pdo-operations/) - my job involved a lot of raw SQL queries, and I learned all about creating, inserting, updating, deleting, altering, constraining, and joining tables with SQL. I also learned all sorts of conditionals that can be applied to queries, grouping, ordering, limiting, and offsetting.
- [How to create and use **Bash scripts**](/how-to-create-and-use-bash-scripts/)
- [CSS **shapes**](https://tympanus.net/codrops/2018/11/29/an-introduction-to-css-shapes/)

### Side project: Laconia MVC Framework

During this time, I wrote [Laconia](https://laconia.site/) [(source)](https://github.com/taniarascia/laconia), a modern MVC (Model View Controller) application written in plain PHP without libraries or frameworks. I wanted to learn how to create something with MVC architecture, and I didn't want to rely on a framework to do it. I wanted it to be secure, and I wanted it to have users. I aimed to and succeeded in learning the basics of:

- **Authentication** - logging in, logging out, resetting a password, having private content/dashboard hidden from anonymous users
- **Security and validation** - encrypted passwords and hashing, parameter binding with SQL, making sure users cannot be overridden, making sure no spam or empty content can go through, making sure passwords and usernames have the proper characters
- **Routing** - Redirecting to URLs based on incoming request method and URI path, creating public user profiles in the root directory, creating dynamic pages based on GET requests
- **Object oriented programming** - I had never used a class in a working application before writing this app, so I learned a lot about constructors, inheritance, and abstract classes
- **Composer** - I had no prior experience using Composer, so I wanted to find out why it was the standard in modern PHP development. I used it for autoloading classes and configuration.
- **Database schema** - how to structure a database to relate information easily between the tables, i.e. linking lists and list items, users and user comments, etc.
- **Sessions and Users** - how to easily deal with sessions, users, and authentication.

## Job 3: Front End Software Engineer (2018-2019)

_17% salary increase_

Eventually, I wanted to do anything else besides PHP or jQuery. JavaScript seemed like a good choice due to all the JavaScript I had been teaching myself on my own, so I ended up getting a position as a front end software engineer writing applications in React. I also didn't know React when I got the position, but I learned quickly.

- [**ES6+**](/es6-syntax-and-feature-overview/) - The syntax of ECMAScript 2015/ES6+, the new additions to JavaScript made over the last few years.
- [How to use **React**](/getting-started-with-react/) - I was very opposed to learning React, Vue, Angular, or any other JavaScript framework/library until I felt like I could do what those things accomplish in vanilla JavaScript first. (The same policy is why I created Laconia instead of learning Laravel.) I struggled to understand React for quite a bit, and once I got it I wrote this article, which is awesomely included in the official docs!
- [How to use React Hooks](/crud-app-in-react-with-hooks/), and other [React components](/content-editable-elements-in-javascript-react/), and React Router.
- How to use the Semantic UI React library to quickly and efficiently make prototype applications.
- [A deeper understanding of REST and REST APIs](https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-understanding-rest-apis--cms-31697) - I really began to understand how resources should be structured.
- [How to make a **server in Node.js**, using the HTTP module or **Express**](https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-set-up-the-server--cms-31698).
- [How to connect to a MySQL database from Node.js](https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-connect-a-database--cms-31699) and make API calls.
- [How to use **PostgreSQL**](/publications/setting-up-a-restful-api-with-node-js-and-postgresql/).
- The concept of **asynchronous programming**, and how to use callbacks, **promises**, and async/await.
- How to write scripts in Node.js - I wrote a script that would generate JSON from a Google Sheets/Excel CSV that could be utilized throughout an application.
- How to set up a project with **Webpack** with hot reloading
- How to use Git to work with a team - **merging, rebasing, fixing merge conflicts, stashing, and working with feature branches**.
- **Error handling**.

### Side project: Chip-8 Emulator

My project of 2019 has been creating a [Chip-8 emulator](https://github.com/taniarascia/chip8) in Node.js from scratch, thanks to Vanya Sergeev. I've learned many lower-level programming concepts, such as:

- [The concept of binary, decimal, and hexadecimal base systems](/bits-bytes-bases-and-a-hex-dump-javascript/) how they interact with each other and the concept of abstract numbers in programming.
- **Bits, nibbles, bytes, ASCII encoding**, and big and little endian values.
- **Bitwise operators** - AND (`&`), OR (`|`), XOR (`^`), left shift (`<<`), right shift (`>>`) and how to use them for masking, setting, and testing values.
- Using the Node built-in **file system**(`fs`).
- The concept of a **raw data buffer** and how to work with it, how to convert an 8-bit buffer to a 16-bit big endian array.
- How to write and understand an 8-bit and 16-bit hex dump.
- How to **disassemble and decode** an opcode into instructions a CPU can use.
- How a CPU can utilize **memory, stack, program counters, stack pointers, memory addresses, and registers**.
- How a CPU implements*- fetch, decode, and execute*\*.
- The importance of **unit testing**.

## Things I Don't Know, Abridged

In true [Dan Abramov](https://overreacted.io/things-i-dont-know-as-of-2018/) fashion, I'm happy to admit the plethora of concepts, technologies, libraries, frameworks, etc. that I don't know. What I don't know I don't know is much more extensive, however. This is a list of things I don't know that I think I probably should.

- GraphQL
- Redux/MobX
- Docker
- Electron
- React Native
- Vim
- Algorithms
- Data structures
- Calculating time complexity
- Algebra, honestly
- Sockets
- Networking
- CI/CD
- Types

## Jargon Glossary

A small subset of the jargon acronyms that are familiar to me now.

- **API** - Application Program Interface
- **Back end/server-side** - the data access layer
- **CMS** - Content Management System
- **CRUD** - Create, Read, Update, Delete
- **CSS** - Cascading Style Sheets
- **DNS** - Domain Name Service
- **DOM** - Document Object Model
- **ES(6)** - ECMAScript
- **(S)FTP** - (Secure) File Transfer Protocol
- **Front end/client-side** - the presentation layer
- **HTML** - Hypertext Markup Language
- **HTTP(S)** - HyperText Transfer Protocol (Secure)
- **JSON** - JavaScript Object Notation
- **MVC** - Model View Controller
- **REST** - Representational State Transfer
- **SPA** - Single Page Application
- **SQL** - Structured Query Language
- **SSG** - Static Site Generator
- **SSH** - Secure Shell
- **SSL** - Secure Sockets Layer
- **TLS** - Transport Layer Security
- **VCS** - Version Control Systems (Git)
- **VM** - Virtual Machine

## Conclusion

Carl Sagan once said, _"if you wish to make an apple pie from scratch, you must first invent the universe"_. That is how I felt writing this article. I tried to compile everything I know, but each new thing involved some previous knowledge, and that required previous knowledge, and at what point do I stop?

I'm missing plenty, I glossed over more, but in the past five years or so, I've tried to compile and write about everything that has tripped me up along the way. I hope something I've written has helped you in your own journey, and will continue to do so in the future.

I've written 123 articles about web development between my own website, DigitalOcean, SitePoint, Codrops, Envato Tuts+, and Progress.
