import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import config from '../utils/config'
import takeNote from '../../content/images/takenoteproject.png'
import laconia from '../../content/images/laconiaproject.png'
import primitive from '../../content/images/primitiveproject.png'
import chip8 from '../../content/images/chip8project.png'

export default function ProjectsIndex() {
  return (
    <Layout>
      <Helmet title={`Projects | ${config.siteTitle}`} />
      <SEO />
      <div className="container">
        <header>
          <h1>Projects.</h1>
          <p className="subtitle">
            A few highlights of my open-source projects. View them all{' '}
            <a href="https://github.com/taniarascia">on GitHub</a>.
          </p>
          <h2>TakeNote</h2>
          <h4 className="no-underline">
            A free, open source notes app for the web.
          </h4>
          <p>
            <small>
              <i>
                2020 &mdash; TypeScript, React/Redux, Node/Express, GitHub OAuth
              </i>
            </small>
          </p>
          <a href="https://takenote.dev" className="link-image" target="_blank">
            <img src={takeNote} />
          </a>
          <p>
            I built this app because I wanted a simpler, IDE-like, WYSIWYG-free
            note-taking program that would be accessible from any platform via
            the web. I also wanted it to sync without creating users or
            requiring a database.
          </p>
          <p>
            The app allows plain text or markdown with previews, syncing,
            internal wiki style note-linking, drag-and-drop, prettier, syntax
            highlighting, light/dark mode, search, categorizing, and more!
          </p>

          <Link to="/building-takenote" className="button">
            Write-up
          </Link>
          <a href="https://github.com/taniarascia/takenote" className="button">
            Source
          </a>
          <a href="https://takenote.dev/app" className="button">
            Demo
          </a>

          <h2>Chip8.js</h2>
          <h4 className="no-underline">
            A retro game emulator for three platforms.
          </h4>
          <p>
            <small>
              <i>2019 &mdash; JavaScript, Node, Blessed</i>
            </small>
          </p>
          <a
            href="https://taniarascia.github.io/chip8"
            className="link-image"
            target="_blank"
          >
            <img src={chip8} />
          </a>
          <p>
            Chip8.js includes a CPU class that handles all the internal logic of
            the emulator, and individual classes written for interfacing with a
            web, command line, or native client. The emulator plays CHIP-8 ROMs
            for simple games like Pong, Tron, and Tetris.
          </p>
          <p>
            While writing this project, I learned a lot of fundamentals about
            binary and hexadecimal base systems, how bits and bytes work along
            with ASCII encoding and big/little endian values. I also learned
            about CPU memory, timers, stacks, the fetch/decode/execute cycle,
            and creating clean interfaces for the logic of your code to
            communicate with.
          </p>
          <Link
            to="/writing-an-emulator-in-javascript-chip8/"
            className="button"
          >
            Write-up
          </Link>
          <a href="https://github.com/taniarascia/chip8" className="button">
            Source
          </a>
          <a href="https://taniarascia.github.io/chip8" className="button">
            Demo
          </a>

          <h2>Laconia</h2>
          <h4 className="no-underline">
            An MVC framework from scratch in PHP.
          </h4>
          <p>
            <small>
              <i>2018 &mdash; PHP, MySQL</i>
            </small>
          </p>
          <a href="https://laconia.dev" className="link-image" target="_blank">
            <img src={laconia} />
          </a>
          <p>
            In my time of working with custom PHP systems, I noticed a lot of
            extremely messy, haphazardly put-together code, code that had no
            sense of design or planning, and was also outdated and insecure.
          </p>
          <p>
            I wanted to teach myself how to make a clean system using MVC design
            patterns and clear separation of concerns between the PHP
            object-oriented logic, HTML routes, JavaScript interactions, and CSS
            styles, that also utilized the latest methods for secure database
            connections.
          </p>
          <a href="https://github.com/taniarascia/laconia" className="button">
            Source
          </a>
          <a href="https://laconia.dev" className="button">
            Demo
          </a>

          <h2>Primitive</h2>
          <h4 className="no-underline">
            A front-end design toolkit for developing responsive web apps.
          </h4>
          <p>
            <i>2016 &mdash; Sass, CSS</i>
          </p>
          <a
            href="https://taniarascia.github.io/primitive"
            className="link-image"
            target="_blank"
          >
            <img src={primitive} />
          </a>
          <p>
            I made my first websites in the late '90s, when HTML was written in
            uppercase, tables were using for creating layouts, and CSS didn't
            exist yet. When CSS came around I learned the most basic of float
            based layouts, but then I went off and worked another career for a
            decade.
          </p>
          <p>
            When I came back, something called responsive design was all the
            rage, and Bootstrap, Semantic UI, and Foundation were popular ways
            to implement it. I wasn't happy using something I didn't understand,
            and I thought those frameworks were too bloated, so I created my own
            with Sass that I used for several design projects. Primitive was
            created to provide helpful, browser-consistent styling for default
            HTML elements, such as buttons, forms, tables, lists, and
            typography.
          </p>
          <a href="https://github.com/taniarascia/primitive" className="button">
            Source
          </a>
          <a href="https://taniarascia.github.io/primitive" className="button">
            Demo
          </a>
        </header>
      </div>
    </Layout>
  )
}
