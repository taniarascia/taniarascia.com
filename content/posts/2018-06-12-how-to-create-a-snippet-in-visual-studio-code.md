---
date: 2018-06-12
title: 'How to Create a Snippet in Visual Studio Code'
template: post
thumbnail: '../thumbnails/vsc.png'
slug: how-to-create-a-snippet-in-visual-studio-code
categories:
  - Tools
tags:
  - php
  - setup
---

Here's how you make a custom, global snippet in VSCode.

- Press <kbd>COMMAND</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> to open the command palette.
- Find "Preferences: Configure User Snippets".
- Click "New Global snippets file". This will open up a file with a `.code-snippets` extension in `~/Library/Application Support/Code/User/snippets/filename.code-snippets`.

I made one that will allow me to type `perr` + TAB to print forced PHP errors.

<div class="filename">PHPErrors.code-snippets</div>

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
