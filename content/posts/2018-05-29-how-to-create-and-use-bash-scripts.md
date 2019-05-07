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
  - scripting
  - sysadmin
---

Bash scripting is an extremely useful and powerful part of system administration and development. It might seem extremely scary the first time you do it, but hopefully this guide will help ease the fear.

Bash is a Unix shell, which is a command line interface (CLI) for interacting with an operating system (OS). **Any command that you can run from the command line can be used in a bash script.** Scripts are used to run a series of commands.

Bash is available by default on Linux and macOS operating systems.

This is not meant to be an extensive guide to bash scripting, but just a straightforward guide to getting started with making your first script, and learning some basic bash syntax.

#### Prerequisites

- A basic command line knowledge is required. Everything you need to know to get started can be found in my [How to Use the Command Line](/how-to-use-the-command-line-for-apple-macos-and-linux/) article.

This guide is for macOS. I'll be using `/Users/tania` for all examples, but it will be `/Users/your_username` for you.

#### Goals

In this tutorial, we're going to:

- Create a bash script that can be run from any directory on the computer.
- Learn about variables, conditions, looping, and user input with bash.
- Create a simple Git deployment script.

## 1. Create a bin directory

The first step is to create a `bin` directory. [`bin`](http://www.linfo.org/bin.html) is the standard naming convention of a subdirectory that contains executable programs.

You can make sure you're in the main user directory by navigating to `~` (which is a shortcut for current user home directory, or `/Users/tania`). This will also be the default directory Terminal always opens in. Typing `pwd` will confirm the location, as well.

Create `bin` in that folder, or wherever you want your bash scripts to live.

```bash
cd ~      # this takes us to /Users/tania
mkdir bin # this creates /Users/tania/bin
```

## 2. Export your bin directory to the PATH

Open `.bash_profile`, which will be located at `/Users/tania/.bash_profile`, and add this line to the file. If `.bash_profile` doesn't exist, create it.

```bash
export PATH=$PATH:/Users/tania/bin
```

If you don't see hidden files and directories, or those that begin with a `.`, press Command + SHIFT + ..
If Terminal.app is open, quit and reopen it so the PATH gets updated.

## 3. Create a script file and make it executable

Go to your `bin` folder located in `/Users/tania`.

```bash
cd bin
```

Create a file called `hello-world` (no extension) in this folder.

```bash
touch hello-world
```

Open the file in your text editor of choice and type the following.

<div class="filename">hello-world</div>

```bash
#!/bin/bash
```

A bash script must always begin with `#!/bin/bash` to signify that the script should run with bash as opposed to any other shell. This is called a "shebang". You can confirm where the bash interpreter is located with `which bash`.

```bash
which bash
/bin/bash
```

As is tradition, we'll make a "Hello, World!" example to get this working.

hello-world

```bash
#!/bin/bash

echo Hello, World!
```

Now, you can try to run the file in the terminal.

```bash
hello-world
```

But it won't work.

```terminal
-bash: hello-world: command not found
```

We have to make it an executable file by changing the permissions.

```bash
chmod u+x hello-world
```

Now when you run the command, it will output the contents of the `echo`.

```terminal
tania@computer:~$ hello-world
Hello, World!
```

Congrats, you just got your first bash script up and running. You can also run this script from anywhere on the computer, not just in the `bin` directory.

> Strings do not need to use single or double quotes by default. However, single and double quoted strings work as well. A single quoted string will not interpolate variables, but a double quoted string will.

## Variables

A variable is declared without a `$`, but has a `$` when invoked. Let's edit our `hello-world` example to use a variable for the entity being greeted, which is `World`.

hello-world

```bash
#!/bin/bash

who="World"

echo Hello, $who!
```

```terminal
tania@computer:~$ hello-world
Hello, World!
```

Note that `who = "World"` is not valid - there must not be a space between variable and value.

## Reading

We declared a variable in the last example, but we can also have the user set the value of a variable dynamically. For example, instead of just having the script say `Hello, World!`, we can make it ask for the name of the person calling the script, then output that name. We'll do this using the `read` command.

<div class="filename">hello-world</div>

```bash
#!/bin/bash

echo Who are you?

read who

echo Hello, $who!
```

```terminal
tania@computer:~$ hello-world
Who are you?
Tania
Hello, Tania!
```

## Conditionals

`if` statements use the `if`, `then`, `else`, and `fi` keywords. The condition goes in square brackets.

check-id

```bash
#!/bin/bash

echo How old are you?

read age

if [ "$age" -gt 20 ]
then
    echo You can drink.
else
    echo You are too young to drink.
fi
```

```terminal
tania@computer:~$ check-id
How old are you?
28
You can drink.
```

Operators are slightly different in bash than what you might be used to.

| Bash Operator | Operator  | Description           |
| ------------- | --------- | --------------------- |
| `-eq`         | `==`      | Equal                 |
| `-ne`         | `!=`      | Not equal             |
| `-gt`         | `>`       | Greater than          |
| `-ge`         | `>=`      | Greater than or equal |
| `-lt`         | `<`       | Less than             |
| `-le`         | `<=`      | Less than or equal    |
| `-z`          | `== null` | Is null               |

## Looping

Bash uses `for`, `while`, and `until` loops. In this example, I'll use the `for...in` loop to get all the files in a directory and list them.

```bash
#!/bin/bash

FILES=/Users/tania/dev/*

for file in $FILES
do
    echo $(basename $file)
done
```

## Git Deploy Example Script

As I mentioned previously, a bash script can use any commands you can use on the command line. An example of a script you might make for yourself is the one below, where the user is prompted for a git commit message and the process of adding, committing, and pushing to origin is all done with a single `git-deploy` command.

<div class="filename">git-deploy</div>

```bash
#!/bin/bash

read -r -p 'Commit message: ' desc  # prompt user for commit message
git add .                           # track all files
git add -u                          # track deletes
git commit -m "$desc"               # commit with message
git push origin master              # push to origin
```

> If you've never used Git, check out [Getting Started with Git](/getting-started-with-git/) for a primer.

Then just run the command.

```terminal
tania@computer:$ git-deploy
Commit message: Making some vague updates
[master 0b0caaa] Making some vague updates
    3 files changed, 44 insertions(+), 1 deletion(-)
    create mode 100644 file.js
    create mode 100644 file2.js
Counting objects: 5, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (5/5), 823 bytes | 823.00 KiB/s, done.
Total 5 (delta 2), reused 0 (delta 0)
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To https://github.com/me/repo.git
    79f061b..0b0caaa  master -> master
```

## Conclusion

I hope this article has been helpful for you to get started with bash scripting. The concept of having a script that has complete access to anything on my computer was initially a frightening thought for me, but once I got accustomed to it I learned how useful and efficient it can be.
