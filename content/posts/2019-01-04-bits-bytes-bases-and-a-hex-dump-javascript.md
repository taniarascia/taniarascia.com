---
date: 2019-01-04
title: 'Understanding Bits, Bytes, Bases, and Writing a Hex Dump in JavaScript (Node)'
template: post
thumbnail: '../thumbnails/binary.png'
slug: bits-bytes-bases-and-a-hex-dump-javascript
categories:
  - JavaScript
tags:
  - javascript
  - node
---

I was recently tasked with creating a simple command line program that would take an input of a file of unknown contents and print a hex dump as the output. However, I didn't really know how I could access the data of the file to begin with, and I didn't know what a hex dump was. So I'm going to share with you what I learned and what I wrote to accomplish this task.

Since I'm most familiar with JavaScript, I decided to do this in Node. The aim is to write a command like this:

```bash
node hexdump.js data
```

Which will run a `hexdump.js` program on a file (`data`) and output the hex dump.

The file can be anything - an image, a binary, a regular text file, or a file with other encoded data. In my particular case, it was a ROM.

If you've ever tried opening a non text-based file with a text editor, you'll remember seeing a jumbled mess of random characters. If you've ever wondered how a program could access that raw data and work with it, this article might be enlightening.

This article will consist of two parts: the first, background information explaining what a hex dump is, what bits and bytes are, how to calculate values in base 2, base 10, and base 16, and an explanation of printable ASCII characters. The second part will be writing the hex dump function in Node.

## What's a Hex Dump?

To understand what a hex dump is, we can create a file and view a hex dump of it. I'll make a simple text file consisting of a Bob Ross quote.

```bash
echo -en "Just make a decision and let it go." > data
```

`-en` here is preventing trailing newlines and allowing interpretation of backslash-escaped characters, which will come in handy in a bit. Also, `data` is just a filename, not any sort of command or keyword.

Unix systems already have a [hexdump command](http://man7.org/linux/man-pages/man1/hexdump.1.html), and I'll use the canonical (`-C`) flag to format the output.

```bash
hexdump -C data
```

Here's what I get.

```terminal
00000000  4a 75 73 74 20 6d 61 6b  65 20 61 20 64 65 63 69  |Just make a deci|
00000010  73 69 6f 6e 20 61 6e 64  20 6c 65 74 20 69 74 20  |sion and let it |
00000020  67 6f 2e                                          |go.|
00000023
```

Okay, so it looks like I have a bunch of numbers, and on the right we can see the text characters from the string I just echoed. The man page tells us that `hexdump` "displays file contents in hexadecimal, decimal, octal, or ascii". The specific format used here (canonical) is further explained:

> -C, --canonical

Canonical hex+ASCII display. Display the input offset in hexadecimal, followed by sixteen space-separated, two-column, hexadecimal bytes, followed by the same sixteen bytes in **%\_p** format enclosed in '**|**' characters.

So now we can see that each line is a hexadecimal input offset (address) which is kind of like a line number, followed by 16 hexadecimal bytes, followed by the same bytes in ASCII format between two pipes.

| Address    | Hexadecimal bytes                                 | ASCII                |
| ---------- | ------------------------------------------------- | -------------------- |
| `00000000` | `4a 75 73 74 20 6d 61 6b 65 20 61 20 64 65 63 69` | `|Just make a deci|` |
| `00000010` | `73 69 6f 6e 20 61 6e 64 20 6c 65 74 20 69 74 20` | `|sion and let it |` |
| `00000020` | `67 6f 2e`                                        | `|go.|`              |
| `00000023` |                                                   |                      |

First, let's take a look at the input offset, also referred to as an address. We can see it has leading zeros and a number. In a text editor, for example, we have lines of code in decimal, incremented by one. Line 1, line 2, all the way down to line 382, or however many lines long the program is.

The address of a hex dump counts tracks the number of bytes in the data and offsets each line by that number. So the first line starts at offset 0, and the second line represents the number 16, which is how many bytes precede the current line. `10` is `16` in hexadecimal, which we'll go into farther along in this article.

Next we have the [ASCII](https://en.wikipedia.org/wiki/ASCII). If you're not familiar, ASCII is a character encoding standard. It matches control characters and printable characters to numbers. [Here is a full ASCII table](https://www.ascii-code.com/).

Now this hex dump kind of makes sense for viewing ASCII text, but what about data that can't be represented by ASCII? Not every byte or number has an ASCII match, so how will that look?

In another example, I'll echo 0-15 represented in base 16/hexidecimal, which will be `00` to `0f`. To escape hexadecimal numbers using `echo`, the number must be preceeded by `\x`.

```bash
echo -en "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f" > data2
```

These numbers don't correspond to any ASCII characters, and also cannot be viewed in a regular text editor. If you try opening it in VSCode, for example, you'll see "The file is not displayed in the editor because it is either binary or uses an unsupported text encoding.".

If you do decide to open it anyway, you'll probably see what appears to be a question mark. Fortunately, we can view the raw contents with hexdump.

```terminal
00000000  00 01 02 03 04 05 06 07  08 09 0a 0b 0c 0d 0e 0f  |................|
00000010
```

As you can see, unprintable ASCII characters are represented by a `.`, and the bytes are confirmed hexadecimal. The address has `10` on the second line because it's starting on the 16th byte, and 16 is `10` in hexadecimal.

## Understanding Bytes and Bases

Looking at the "hexadecimal bytes" section of the `hexdump` table, you have to know what both "hexadecimal" means, and what "bytes" are.

You probably already know that a kilobyte is roughly a thousand bytes, or `1024` bytes, and a megabyte is roughly a thousand kilobytes, or `1,024 * 1,024` bytes (`1,048,576` bytes), or maybe even that a floppy disk has `1,474,560` bytes of storage.

But what exactly is a byte?

### Bits, nibbles, and bytes

A bit is a binary digit, the smallest form of data on a computer, and can be `0` or `1`. Like a Boolean, a bit can represent on/off, true/false, etc. There are four bits in a nibble, and eight bits in a byte.

| Unit   | Storage                   |
| ------ | ------------------------- |
| Bit    | Binary digit (`0` or `1`) |
| Nibble | 4 bits                    |
| Byte   | 8 bits                    |

Computers manipulate data in bytes.

## Value of a byte

Have you ever played a video game that maxed out the quantity of an item in your inventory at `255`? Why did it stop at that point?

If each inventory storage in the game utilized one byte, then what's the highest value that would be able to be represented?

It's easiest to evaluate this using binary, which is the base 2 number system. A byte has 8 1-bit slots. Since we know the highest value of a bit is `1`, the highest binary 8-bit value must be 8 `1`s - `11111111`.

> If you open up a Node repl (by typing `node` + enter in the command line) then enter `0b11111111`, you'll see a response of `255`.

#### Binary: 111111112

How can we know `11111111` represents the number `255` (in decimal)? We're going to calculate the value manually.

In a base system, every number is weighted differently. In decimal, the seven in `7` vs `70` do not represent the same value. I'll demonstrate this first in binary, then in decimal and hexidecimal.

Starting from the least significant value (the one all the way to the right), you must multiply each digit by the result of the base raised to its position, and add them all together. The position all the way to the right is 0, then 1, then 2, and so on until the end, which in this case is 7.

Here's how that looks:

```js
  1 * 2**7
+ 1 * 2**6
+ 1 * 2**5
+ 1 * 2**4
+ 1 * 2**3
+ 1 * 2**2
+ 1 * 2**1
+ 1 * 2**0
= 255
```

And after evaluating the exponents, you can write the equation like this:

```js
  1 * 128
+ 1 * 64
+ 1 * 32
+ 1 * 16
+ 1 * 8
+ 1 * 4
+ 1 * 2
+ 1 * 1
= 255
```

Or simply:

```js
  128
+ 64
+ 32
+ 16
+ 8
+ 4
+ 2
+ 1
= 255
```

For a more simplified example, if the number was `101` it would be:

```js
  1 * 2**2
+ 0 * 2**1
+ 1 * 2**0
= 5
```

#### Decimal: 25510

If that doesn't make sense, think about it in decimal. You know `007` and `070` and `700` are all very different values (leading zeros have no effect on the value). Seven is `7 * 10^0`, seventy is `7 * 10^1`, and seven hundred is `7 * 10^2`.

| Number        | Decimal Represenation | Calculation             |
| ------------- | --------------------- | ----------------------- |
| Seven         | `007`                 | `7 * 10^0` or `7 * 1`   |
| Seventy       | `070`                 | `7 * 10^1` or `7 * 10`  |
| Seven hundred | `700`                 | `7 * 10^2` or `7 * 100` |

So as we can see, the position of the digit determines the value, and we can use the same calculation to get `255` in decimal.

```js
  2 * 10**2
+ 5 * 10**1
+ 5 * 10**0
= 255
```

Or:

```js
  2 * 100
+ 5 * 10
+ 5 * 1
= 255
```

Or:

```js
  200
+ 50
+ 5
= 255
```

#### Hexadecimal: FF16

This concept applies to any base. Hexadecimal is base 16, and `F` represents the largest value, `15`.

```js
  15 * 16**1
+ 15 * 16**0
= 255
```

Or:

```js
  15 * 16
+ 15 * 1
= 255
```

Or:

```js
  240
+ 15
= 255
```

#### It's all the same number

The important concept to consider here is that `11111111`, `255`, and `FF` all represent the same number, it's just hard for us to realize that intuitively because we're so used to base 10 numbers. This number also happens to be the largest value of a byte.

Hexadecimal is a convenient, compact way to represent the value of a byte, as it's always contained in two characters.

```js
// Binary - 11111111
1 * 2 ** 7 +
1 * 2 ** 6 +
1 * 2 ** 5 +
1 * 2 ** 4 +
1 * 2 ** 3 +
1 * 2 ** 2 +
1 * 2 ** 1 +
1 * 2 ** 0

// Decimal - 255
2 * 10 ** 2 + 5 * 10 ** 1 + 5 * 10 ** 0

// Hexadecimal - FF
15 * 16 ** 1 + 15 * 16 ** 0
```

### Representing different bases in programming

Programming languages will use a prefix to represent a value outside of base 10. Binary is `0b`, and hexadecimal is `0x`, so you can write `0b1111` or `0xff` in a Node repl, for example, and it will output the value in decimal.

| Base        | Prefix |
| ----------- | ------ |
| Binary      | `0b`   |
| Hexadecimal | `0x`   |

Octal is another base system, base 8, which is represented by just a leading `0` or `0o`.

```js
010 === 8 // true
```

We're going to mostly ignore octal in this article, though.

### Counting in different bases

The maximum value of a byte is `255`, and the maximum value of a nibble (4 bits) is `15`. Here's a chart counting to `15` in binary, decimal, and hexadecimal.

| Binary (base 2) | Decimal (base 10) | Hexadecimal (base 16) |
| --------------- | ----------------- | --------------------- |
| `0000`          | `0`               | `00`                  |
| `0001`          | `1`               | `01`                  |
| `0010`          | `2`               | `02`                  |
| `0011`          | `3`               | `03`                  |
| `0100`          | `4`               | `04`                  |
| `0101`          | `5`               | `05`                  |
| `0110`          | `6`               | `06`                  |
| `0111`          | `7`               | `07`                  |
| `1000`          | `8`               | `08`                  |
| `1001`          | `9`               | `09`                  |
| `1010`          | `10`              | `0a`                  |
| `1011`          | `11`              | `0b`                  |
| `1100`          | `12`              | `0c`                  |
| `1101`          | `13`              | `0d`                  |
| `1110`          | `14`              | `0e`                  |
| `1111`          | `15`              | `0f`                  |

Hexadecimal is often written with leading zeroes, making the representation of a byte always two characters.

So now we should have a good idea of the values represented in the address and bytes of a hex dump.

### Printable ASCII characters

Between `0x20` and `0x7e` are all the printable ASCII characters. [This chart](https://en.wikipedia.org/wiki/ASCII#Printable_characters) shows them all, along with their binary, octal, decimal, and hex counterparts. In the `hexdump` example above, I printed `0x00` to `0x0f`, and since none of those are printable ASCII characters, they appear as dots.

## Writing a Hex Dump in JavaScript

Now back to the original task of writing a hex dump program in Node. We know what it's supposed to look like, and we understand the values of the raw data, but where to start?

Well, we know how we want the program to function. It should be able to use the filename as an argument and `console.log` the hex dump.

```bash
node hexdump.js data
```

So obviously I'll make `hexdump.js` and I'll also make some new data that will contain printable and non-printable ASCII characters.

```bash
echo -en "<blink>Talent is pursued interest</blink>\x00\xff" > data
```

And the goal is to make this output:

```terminal
00000000  3c 62 6c 69 6e 6b 3e 54  61 6c 65 6e 74 20 69 73  |<blink>Talent is|
00000010  20 70 75 72 73 75 65 64  20 69 6e 74 65 72 65 73  | pursued interes|
00000020  74 3c 2f 62 6c 69 6e 6b  3e 00 ff                 |t</blink>..|
0000002b
```

### Getting a raw data buffer of a file

The first step is to obtain the data from the file somehow. I'll start by using the [file system module](https://nodejs.org/api/fs.html#fs_file_system).

```js
const fs = require('fs')
```

And to get the filename, we'll just get the 3rd command line argument (`0` being the Node binary, `1` being `hexdump.js`, and `2` being `data`).

```js
const filename = process.argv.slice(2)[0]
```

I'll use [`readFile()`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) to get the contents of the file. (`readFileSync()` is just the synchronous version.) As the API says, "If no encoding is specified, then the raw buffer is returned", so we're getting a buffer. (`utf8` is what we'd use for a string.)

```js
function hexdump(filename) {
  let buffer = fs.readFileSync(filename)

  return buffer
}

console.log(hexdump(filename))
```

This will log out a `<Buffer>` object (values removed for brevity).

```terminal
<Buffer 3c 62 6c 69 6e 6b 3e 54 ... 69 6e 6b 3e 00 ff>
```

Okay, this looks familiar. Thanks to all that background knowlege, we can see that the buffer is a bunch of bytes represented in hexadecimal. You can even see that final `00` and `ff` I echoed in there.

> **Note:** In this example, I'm doing a synchronous reading of the file, instead of using a stream. In a real hex dump, you'd want to create a stream of data so as not to overload the memory while opening a file, or a never ending data stream, such as `/dev/urandom`. However, I'll just keep it simple in this example to display a hex dump on a small amount of data.

### Working with a buffer

You can treat the buffer like an array. If you check the length with `buffer.length`, you'll get `43`, which corresponds to the number of bytes. Since we want lines of 16 bytes, we can loop through every 16 and slice them into blocks.

```js
function hexdump(filename) {
  let buffer = fs.readFileSync(filename)
  let lines = []

  for (let i = 0; i < buffer.length; i += 16) {
    let block = buffer.slice(i, i + 16) // cut buffer into blocks of 16

    lines.push(block)
  }

  return lines
}
```

Now we have an array of smaller buffers.

```terminal
[ <Buffer 3c 62 6c 69 6e 6b 3e 54 61 6c 65 6e 74 20 69 73>,
  <Buffer 20 70 75 72 73 75 65 64 20 69 6e 74 65 72 65 73>,
  <Buffer 74 3c 2f 62 6c 69 6e 6b 3e 00 ff> ]
```

### Calculating the address

We want to represent the address in hexadecimal, and you can convert a number to a hex string with `toString(16)`. Then I'll just prepend some zeroes so it's always the same length.

```js
let address = i.toString(16).padStart(8, '0')
```

So what would happen if I put the address and block in a template string?

```js
lines.push(`${address} ${block}`)
```

```terminal
[ '00000000 <blink>Talent is',
  '00000010  pursued interes',
  '00000020 t</blink>\u0000?' ]
```

The template tries to convert the buffer to a string. It doesn't interpret the non-printable ASCII characters the way we want though, so we won't be able to do that for the ASCII output. We have the correct addresses now, though.

### Creating hex and ASCII strings

When you access each value in a buffer, it interprets it as the raw number, whether you choose to represent it as binary, hex, ASCII, or anything else is up to you. I'm going to make an array for hex and an array for ASCII, then join them into strings. This way the template literal will already have a string representation to work with.

In order to get the ASCII characters, we can test the value based on the printable ASCII chart above - `>= 0x20` and `< 0x7f` - then get the character code or a dot. Getting the hex values is the same as the address - convert it to a base 16 string and pad single values with a `0`.

I'll add some space to the line and convert the lines to newline-separated strings.

```js
function hexdump(filename) {
  let buffer = fs.readFileSync(filename)
  let lines = []

  for (let i = 0; i < buffer.length; i += 16) {
    let address = i.toString(16).padStart(8, '0') // address
    let block = buffer.slice(i, i + 16) // cut buffer into blocks of 16
    let hexArray = []
    let asciiArray = []

    for (let value of block) {
      hexArray.push(value.toString(16).padStart(2, '0'))
      asciiArray.push(value >= 0x20 && value < 0x7f ? String.fromCharCode(value) : '.')
    }

    let hexString = hexArray.join(' ')
    let asciiString = asciiArray.join('')

    lines.push(`${address}  ${hexString}  |${asciiString}|`)
  }

  return lines.join('\n')
}
```

Now we're almost there.

```terminal
00000000 3c 62 6c 69 6e 6b 3e 54 61 6c 65 6e 74 20 69 73 |<blink>Talent is|
00000010 20 70 75 72 73 75 65 64 20 69 6e 74 65 72 65 73 | pursued interes|
00000020 74 3c 2f 62 6c 69 6e 6b 3e 00 ff |t</blink>..|
```

### Full hex dump program

The only thing that remains at this point is some final formatting - adding padding to the last line if has less than 16 bytes, and separating the bytes into two blocks of eight, which isn't too important for me to explain.

[Here's a gist](https://gist.github.com/taniarascia/7ff2e83577d83b85a421ab36ab2ced84) of the final version, or see below.

<div class="filename">hexdump.js</div>

```js
const fs = require('fs')
const filename = process.argv.slice(2)[0]

function hexdump(filename) {
  let buffer = fs.readFileSync(filename)
  let lines = []

  for (let i = 0; i < buffer.length; i += 16) {
    let address = i.toString(16).padStart(8, '0') // address
    let block = buffer.slice(i, i + 16) // cut buffer into blocks of 16
    let hexArray = []
    let asciiArray = []
    let padding = ''

    for (let value of block) {
      hexArray.push(value.toString(16).padStart(2, '0'))
      asciiArray.push(value >= 0x20 && value < 0x7f ? String.fromCharCode(value) : '.')
    }

    // if block is less than 16 bytes, calculate remaining space
    if (hexArray.length < 16) {
      let space = 16 - hexArray.length
      padding = ' '.repeat(space * 2 + space + (hexArray.length < 9 ? 1 : 0)) // calculate extra space if 8 or less
    }

    let hexString =
      hexArray.length > 8
        ? hexArray.slice(0, 8).join(' ') + '  ' + hexArray.slice(8).join(' ')
        : hexArray.join(' ')

    let asciiString = asciiArray.join('')
    let line = `${address}  ${hexString}  ${padding}|${asciiString}|`

    lines.push(line)
  }

  return lines.join('\n')
}

console.log(hexdump(filename))
```

As I mentioned earlier, you'd want to use a readable stream for a real hex dump program, but this is a good starting example. I might update this article with an improved version later.

## Conclusion

I covered a lot of concepts in this article.

- Bits, nibbles, and bytes
- Binary, decimal, and hexadecimal numbers
- Calculating the value of a number in any base system
- Printable ASCII characters
- Accessing file data in Node.js
- Working with buffers of raw data - Converting numbers to hex and ASCII

There is still more I want to write about on this subject, such as creating a 16-bit hex dump, bitwise operators, and endianness, as well as using [Streams](https://nodejs.org/api/stream.html#stream_stream) to improve this hex dump function, so probably more to come in a follow up article.

Everything I learned here is thanks to [Vanya Sergeev](https://sergeev.io). Any misleading data or inefficient code is my own.
