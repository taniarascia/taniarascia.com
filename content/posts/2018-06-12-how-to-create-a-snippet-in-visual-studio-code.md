---
date: 2018-06-12
title: 'How to Create a Snippet in Visual Studio Code'
template: post
thumbnail: '../thumbnail/vsc.png'
slug: how-to-create-a-snippet-in-visual-studio-code
categories:
  - Tutorials
  - UI/UX
  - Web
tags:
  - php
  - setup
---

Here's how you make a custom, global snippet in VSCode.

Press COMMAND + SHIFT + P to open the command palette.

Find "Preferences: Configure User Snippets".

Click "New Global snippets file". This will open up a file with a `.code-snippets` extension in `~/Library/Application Support/Code/User/snippets/filename.code-snippets`.

I made one that will allow me to type `perr` + TAB to print forced PHP errors.

PHPErrors.code-snippets

```js
{
    	"Show PHP Errors": {
    		"scope": "php",
    		"prefix": "perr",
    		"body": [
    			"ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);"
    		],
    		"description": "Show PHP Errors"
    	}
    }
```

And that's all.
