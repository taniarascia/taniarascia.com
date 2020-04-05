---
date: 2018-05-29
title: 'How to Create and Use Bash Scripts'
template: post
thumbnail: '../thumbnails/bash.png'
slug: how-to-create-and-use-bash-scripts
categories:
  - Tools
  - Popular
tags:
  - bash
  - command line
  - devops
  - reference
  - tutorial
---

Bash scripting is an extremely useful and powerful part of system administration and development. It might seem extremely scary the first time you do it, but hopefully this guide will help ease the fear.

Bash is a Unix shell, which is a command line interface (CLI) for interacting with an operating system (OS). Any command that you can run from the command line can be used in a bash script. Scripts are used to run a series of commands.

Bash is available by default on Linux and macOS operating systems.

This is not meant to be an extensive guide to bash scripting, but just a straightforward guide to getting started with making your first script, and learning some basic bash syntax.

> **Note**: Newer macOS installations (from Catalina) come installed with zsh (Z shell) as the new default, but everything in this article will still be applicable.

#### Prerequisites

- A basic command line knowledge is required. Everything you need to know to get started can be found in my [How to Use the Command Line](/how-to-use-the-command-line-for-apple-macos-and-linux/) article.

This guide was created on macOS, and will be using `/Users/you` as the default user directory for all examples. However, the concepts here will apply to any Unix-like operating system, including macOS and various Linux distributions.

#### Goals

In this tutorial, we're going to:

- Create a bash script
- Learn about:
  - [Strings](#strings)
  - [Variables](#variables)
  - [Shell execution](#shell-execution)
  - [User input](#user-input)
  - [Comparison](#comparison)
  - [Conditions](#conditions)
  - [Loops](#loops)
  - [Arrays](#arrays)

## Create Your First Script

Making a bash script is a lot simpler than you might think.

Create a file called `hello-world`.

```bash
# Use the touch command to create a file
touch hello-world
```

Within the file, print a string that says "Hello, world!' using `echo`.

<div class="filename">hello-world</div>

```bash
echo "Hello, world!"
```

Now from the command line, run the script using the `bash` interpreter:

```bash
bash hello-world
```

You'll see the script has run successfully from the output.

```terminal
Hello, world!
```

That's it, you've created your first script!

## Executable Scripts

So far, you've learned how to run a script from the command line prefixed with the `bash` interpreter. However, if you want to run the script by name alone, it won't work. Try to run the file simply by typing the name of the file and pressing enter. Note that we're prefixing the file with `./`, which means a file in the current directory.

```bash
./hello-world
```

```terminal
bash: ./hello-world: Permission denied
```

In order to run a file directly, we'll need to change the permissions to allow the script to be executable for the user. `chmod` is a command that changes permissions on a file, and `+x` will add execute rights to the script.

```bash
chmod +x hello-world
```

In order to interpret the file as an executable, you'll also have to add the [shebang (`#!`)](https://en.wikipedia.org/wiki/Shebang_%28Unix%29) at the top of the script. In Unix-like systems, a text file with a shebang is interpreted as an executable file. You can confirm where the bash interpreter is located with which bash.

```bash
which bash
```

```terminal
/bin/bash
```

We'll add `#!/bin/bash` to the top of the script.

```bash
#!/bin/bash

echo "Hello, world!"
```

> Note: You may also see `#!/usr/bin/env bash` instead, which can be used if you don't know the exact path for bash.

Now you can run `hello-world` directly.

```bash
./hello-world
```

```terminal
Hello, world!
```

> **Note**: In order to run a bash script without specifying the directory (using `./`, for example) you would have to add the directory of the script to the [PATH](https://www.cs.purdue.edu/homes/bb/cs348/www-S08/unix_path.html) by running `export PATH=$PATH:/path/to/script/directory`. However, this is generally not necessary for personal scripts.

## Strings

A simple **string** in Bash does not require double quotes - you can write it directly.

```bash
echo Just a regular string
```

```terminal
Just a regular string
```

A single or double quote will expect a closing match, so in order to use one in such a string, you would need to escape the quote.

```bash
echo I\'m a string
```

```terminal
I'm a string
```

However, if you want to use a single or double quote in a string without escaping characters, you can do so by wrapping your string in quotes.

```bash
echo 'A single quoted "string"'
echo "A double quoted 'string'"
```

```terminal
A single quoted "string"
A double quoted 'string'
```

With the `-e` flag, bash will interpret strings with backslash-escaped characters, such as `\n` for newline. This also requires a quoted string.

```bash
echo -e "This string has a \nnew line"
```

```terminal
This string has a
new line
```

Double quoted strings are also important for use with variables, as we'll see in the next section.

## Variables

A **variable** is declared without a dollar sign (`$`), but has one when invoked. Let's edit our `hello-world` example to use a variable for the entity being greeted, which is `World`.

<div class="filename">hello-world</div>

```bash
#!/bin/bash

who="World"

echo "Hello, $who!"
```

```terminal
Hello, World!
```

> Note that `who = "World"` with a space between the assignment is not valid - there must _not_ be a space between variable and value.

Double quoted strings are required for interpolating variables. Within a single quoted string, the dollar sign would be interpreted literally

```bash
echo 'Hello, $who!'
```

```terminal
Hello, $who!
```

Another way you might see variables written is surrounded by curly brackets along with the dollar sign, which is known as parameter expansion.

```bash
echo "Hello, ${who}!"
```

This syntax is necessary for anything more complex you might do with a variable, such as getting one item from an array.

## Shell Execution

If you would like to use the output of a shell execution within a string, you can do so with a dollar sign followed by parentheses. (`$()`). For example the `whoami` command will print out your current user. To use it within a string, wrap `whoami` in the shell execution syntax.

```bash
echo "Hello, $(whoami)!"
```

```terminal
Hello, taniarascia!
```

## User Input

We declared a variable in the last example, but we can also have the user set the value of a variable dynamically. For example, instead of just having the script say `Hello, World!`, we can make it ask for the name of the person calling the script, then output that name. We'll do this using the `read` command.

<div class="filename">hello-world</div>

```bash
#!/bin/bash

echo 'Who are you?'

read who

echo "Hello, $who!"
```

```terminal
Who are you?
> Tania
Hello, Tania!
```

## Comparison

Operators are slightly different in bash than what you might be used to.

In order to compare **numbers**, you will use the operators in the number comparison column, such as `-lt` for less than.

In order to compare **strings**, you will use the operators in the string comparison column, such as `<` for less than.

This is the opposite of what you might expect, but it's the way it works in bash.

| Number Comparison | String Comparison | Description           |
| ----------------- | ----------------- | --------------------- |
| `-eq`             | `==`              | Equal                 |
| `-ne`             | `!=`              | Not equal             |
| `-gt`             | `>`               | Greater than          |
| `-ge`             | `>=`              | Greater than or equal |
| `-lt`             | `<`               | Less than             |
| `-le`             | `<=`              | Less than or equal    |

You can also use `-z` to test for emptiness on a string.

## Conditions

`if` statements use the `if`, `then`, `else`, and `fi` keywords. The condition goes in square brackets.

<div class="filename">check-id</div>

```bash
#!/bin/bash

echo 'How old are you?'

read age

if [ $age -gt 20 ]
then
    echo 'You can drink.'
else
    echo 'You are too young to drink.'
fi
```

```terminal
How old are you?
> 30
You can drink.
```

## Loops

Bash uses `for`, `while`, and `until` **loops**. In this example, I'll use the `for...in` loop to get all the files in a directory and list them.

<div class="filename">list-files</div>

```bash
#!/bin/bash

files=/Users/you/dev/*

for file in $files
do
  echo $(basename $file)
done
```

```terminal
hello-world check-id list-files
```

## Arrays

An **array** in bash is defined inside parentheses. There are no commas between the items of the array.

```bash
beatles=('John' 'Paul' 'George' 'Ringo')
```

To access an item from an array, you'll use square brackets (`[]`). Arrays are 0-indexed in bash. It is also necessary to use the paramter expansion syntax.

```bash
echo ${beatles[3]}
```

```terminal
Ringo
```

## Conclusion

I hope this article has been helpful for you to get started with bash scripting. The concept of having a script that has complete access to anything on my computer was initially a frightening thought for me, but once I got accustomed to it I learned how useful and efficient it can be.
