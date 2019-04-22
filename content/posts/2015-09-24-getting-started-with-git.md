---
date: 2015-09-24
title: 'Getting Started with Git'
template: post
thumbnail: '../thumbnails/git.png'
slug: getting-started-with-git
categories:
  - Tools
tags:
  - git
  - setup
  - version control
---

Git is a difficult subject to tackle for self-taught web developers who didn't learn to code with a team. If you've always worked alone and want an explanation of how to get started with Git, this tutorial is for you.

> I'm an egotistical bastard, and I name all my projects after myself. First Linux, now Git.
> <cite>- Linus Torvalds, author of Git</cite>

#### Prerequisites

- Ability to create and upload a website.

#### Goals

- Learn what Git is and how it can be useful.
- Create a local project and launch it to a live server with Git using the command line.

## What is Git?

[Git](<https://en.wikipedia.org/wiki/Git_(software)>) is a version control system (VCS) for code. It is used to keep track of revisions and allow a developer or dev team to work together on a project through branches.

> _Git is not GitHub._ Git is the system, and GitHub is a repository hosting service (the most popular of many).

## Git vs. FTP

You may be used to the [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) (File Transfer Protocol) process of file upload.

##### FTP

Local Environment ⇋ FTP Program ⇋ Live Server

_file:///Users/you/project_ ⇋ **Transmit/WinFTP** ⇋ _https://example.com_

The way we will use Git today is very similar.

##### Git

Local Environment ⇋ Git Repository ⇋ Live Server

_file:///Users/you/project_ ⇋ **GitHub.com** ⇋ _https://example.com_

Of course, the arrows can go in any direction for both methods - upload (push) and download (pull).

> Tower, SourceTree, Github for Mac/Windows - these are all GUIs, or Graphical User Interfaces. A GUI is a program that utilizes graphics to create a user-friendly experience, such as Windows to MS-DOS. These programs are useful to learn, especially in a team environment, but in this article, we're going to do everything through the command line. Don't worry, it'll be great.

## Step 1: Installation

### Mac

Open the Terminal program. Type `git --version` and press enter. If a version number is returned, Git is already installed. If something along the lines of `-bash: git: command not found` pops up, install [Xcode](https://developer.apple.com/xcode/) from the App Store.

In XCode, install Command Line Tools: `> Preferences > Downloads > Command Line Tools`. You can now use Git through Terminal.

Although it's not necessary for the rest of this article, now would be a good time to install [Homebrew](http://brew.sh/) - a tool for simplifying the installation and management of dev tools.

### Windows

Download [Git for Windows](https://git-scm.com/download/win). You will be using the Git Bash program. It will utilize all the same commands as Terminal.

## Step 2: Create an Online Git Repository

[GitHub](http://www.github.com) is the most popular location to host repositories, so go ahead and make an account there if you haven't.

I'll assume your username is **you**. This would make your new GitHub account `github.com/you`.

Once you've made your account, create a repository by clicking **Add New Repo**. Do not initialize with a README.md or .gitignore at this point. We can call the repository **project**. Your repository has been created at `github.com/you/project`. It should be completely empty.

## Step 3: Create a Local Project

If you're not at all familiar with the command prompt, please read the first chapter or two of the [command line tutorial](/how-to-use-the-command-line-for-apple-macos-and-linux/).

Here are the most important commands, and all you need to know to get started.

### Basic command line reference

- `pwd` **Print Working Directory** – shows the exact directory you're working in.
- `ls` **List Directories** – lists all the files and folders in your current directory.
- `cd` **Change Directory** – change to another directory.
- `mkdir` **Make Directory** - create a new directory.

> Remember, Terminal (Mac) and Git Bash (Windows) are both command line shells. Any Git related Shell commands can be done the same through both.

When you open Terminal, you will start off in your main directory. I will assume your computer has the same username as your GitHub account.

Confirm your location

```bash
pwd
```

```terminal
/Users/you
```

Create a new folder called project-local

```bash
mkdir project-local
```

List your directories

```bash
ls
```

You should see **project-local** in the list of directories. Of course, you could have created the directory through Finder or Explorer, but it's a useful command to know.

Move into the newly created directory

```
cd project-local
```

Now you're in the folder where your local project and Git repository will live. From here, we will begin using git commands. There is a [massive amount](http://gitref.org/) of commands for Git, but we only need a few to get started.

### Basic Git command reference

- `git config` - Configure Git
- `git init` - Initialize Git repository
- `git status` - Check the status of a Git repository
- `git add` - Track files
- `git commit` - Commit tracked files
- `git push` - Upload files
- `git pull` - Download files

All of the future commands we do today will only apply to your local Git environment. However, there is one important global step to take before doing anything else - configure your Git account.

Configure your global Git account.

```bash
git config --global user.name "Firstname Lastname"
git config --global user.email username@email.com
```

Make sure you're still in the **project-local** folder, then move on.

Initialize Git repository.

```
git init
```

Initialized empty Git repository in /Users/you/project-local/.git/

Great! Now you have an empty Git repo on your local computer.

Hook up local directory with the repo we made at github.com.

```bash
git remote add origin https://github.com/you/project
```

Terminal won't respond, but it was successful. Go ahead and add a file to the **project-local** directory. You can add as many files as you want, but I will assume you added two files - **index.html** and **style.css**.

Check the status of your local repository.

```bash
git status
```

```terminal
On branch master
Initial commit

Untracked files:
(use "git add ..." to include in what will be committed)

  index.html
  style.css

nothing added to commit but untracked files present (use "git add" to track)
```

Okay, so now it knows that there are two files in the directory, but they're not a part of the Git repo. At this point we have to **track** the files with the `add` command.

Add ALL the files to the repo.

(case sensitive command!)

```bash
git add .
```

Let's check the status again with `git status`.

```terminal
On branch master
Initial commit

Changes to be committed:
(use "git rm --cached ..." to unstage)

  new file: index.html
  new file: style.css
```

So, what did that do? The files are green now instead of red. Are we ready? Not quite yet.

Commit tracked files to the master branch

```bash
git commit -am "Initial Commit"
```

```terminal
[master (root-commit)] Initial
  2 files changed, 34 insertions(+)

  create mode index.html
  create mode style.css
```

With this command, I commit all the files (-a), include a message (-m), listed here ("Initial Commit"). Everything in this line is mandatory.

> Do not forget to add a comment when you commit your files. Strategic commenting in Git is as important as commenting code. If you accidentally forget to add a comment and end up in a strange screen where you can no longer enter any commands, press ESC and type `:q!` followed by ENTER.

Push the files to the Git repo at github.com.

```bash
git push origin master
```

Terminal will prompt you to enter your GitHub username and password. When you type in your password, it might not show that you've typed anything, but it's being entered.

Now refresh your GitHub page. Success! All your files are now hosted at Github.com!

> Just as a GUI like Tower is not necessary for Git to function, neither is an online repository host like GitHub.com! Try creating a Git connection between two local directories.

## Step 4: Push to a Live Server

I will now assume that you have a host somewhere to upload your files to. GeoCities, maybe?

When you upload to a server via FTP, you'll have some settings like this:

**Host:** ftp.domain.com
**Username:** you
**Password:** hunter2

You enter those credentials into the FTP GUI, and you're in. [SSH](https://en.wikipedia.org/wiki/Secure_Shell) (Secure Shell) is very much the same - in the command prompt, you'll use the ssh command to enter the host. Your host should show you your SSH settings by your FTP settings.

You can do everything through the same Terminal window, but for the sake of clarity let's open a new Terminal window (Command + N).

SSH into your host.

```bash
ssh username@ssh.domain.com
```

You will be prompted to enter your password.

Now you're in!

> Remember that when you SSH into your host, you are now connected to that host! Your local environment no longer exists in that Terminal. To escape SSH and return to the local Terminal, type `exit` followed by enter.

It would be smart to have an FTP program open so you can see the file structure of the host and the changes you're making. Every host is different. Find the wwwroot or public folder and `cd` into the proper location in your remote Terminal window.

Now make a new folder somewhere in your host's directory. You can call it whatever you want - it can match the name of the GitHub repo or not. In this case, we will call it **project-remote** and assume it's a folder in the root directory.

Once you're in, you will follow many of the same steps as before, except this time we will be **pulling** (downloading) from GitHub.com, instead of **pushing** (uploading) from local to Github.com.

I'm ignoring branches for now, since we're only working with one branch - the **master** branch.

List your Git settings.

```bash
git --list
```

You should configure your e-mail and username as you did on your home computer.

Print your working directory to make sure you're in the right location.

```bash
pwd
```

Use `cd` and `mkdir` to navigate to the location you want your new Git repo to live. Then...

Initialize Git repo.

```bash
git init
```

Add remote Git repo to origin master (branch).

```bash
git remote add origin https://github.com/you/project.git
```

Pull (download) from origin master (branch).

```bash
git pull origin master
```

Now, when you go to http://domain.com/project-remote, all the files are there, and the site is live!

I wanted to write the article I wish I had in front of me when I tried to teach myself everything at once (Git, command line, and SSH) and ran into pitfalls.
