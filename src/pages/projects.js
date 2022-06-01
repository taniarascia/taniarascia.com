import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import config from '../utils/config'
import takeNote from '../../content/thumbnails/tn.png'
import laconia from '../../content/images/laconiaproject.png'
import primitive from '../../content/images/primitiveproject.png'
import chip8 from '../../content/images/chip8project.png'
import newMoon from '../../content/images/new-moon.svg'
import keyboardAccordion from '../../content/images/keyboardaccordionlogo.png'
import github from '../assets/nav-github.png'
import tr from '../assets/logo.png'

const projectsList = [
  {
    name: 'TakeNote',
    slug: 'takenote',
    tagline: 'A free, open source notes app for the web.',
    image: takeNote,
    url: 'https://takenote.dev',
    writeup: '/building-takenote',
    description: `I built this app because I wanted a simpler, IDE-like, WYSIWYG-free
    note-taking program that would be accessible from any platform via
    the web. I also wanted it to sync without creating users or
    requiring a database.

    The app allows plain text or markdown with previews, syncing,
    internal wiki style note-linking, drag-and-drop, prettier, syntax
    highlighting, light/dark mode, search, categorizing, and more!`,
  },
  {
    name: 'Keyboard Accordion',
    slug: 'accordion',
    tagline: 'Play the accordion with your computer keyboard!',
    image: keyboardAccordion,
    url: 'https://www.keyboardaccordion.com',
    writeup: '/musical-instrument-web-audio-api',
  },
  {
    name: 'New Moon',
    image: newMoon,
    slug: 'new-moon',
    tagline: 'The optimized dark theme for web development.',
    url: 'https://taniarascia.github.io/new-moon',
  },
  {
    name: 'Chip8',
    slug: 'chip8',
    tagline: 'A retro game emulator for three platforms.',
    image: chip8,
    url: 'https://taniarascia.github.io/chip8',
    writeup: '/writing-an-emulator-in-javascript-chip8',
    description: `Chip8.js includes a CPU class that handles all the internal logic of
    the emulator, and individual classes written for interfacing with a
    web, command line, or native client. The emulator plays CHIP-8 ROMs
    for simple games like Pong, Tron, and Tetris.

    While writing this project, I learned a lot of fundamentals about
    binary and hexadecimal base systems, how bits and bytes work along
    with ASCII encoding and big/little endian values. I also learned
    about CPU memory, timers, stacks, the fetch/decode/execute cycle,
    and creating clean interfaces for the logic of your code to
    communicate with.`,
  },
  {
    name: 'Laconia',
    slug: 'laconia',
    tagline: 'An MVC framework from scratch in PHP.',
    image: laconia,
    url: 'https://laconia.dev',
    description: `In my time of working with custom PHP systems, I noticed a lot of
    extremely messy, haphazardly put-together code, code that had no
    sense of design or planning, and was also outdated and insecure.
    
    I wanted to teach myself how to make a clean system using MVC design
    patterns and clear separation of concerns between the PHP
    object-oriented logic, HTML routes, JavaScript interactions, and CSS
    styles, that also utilized the latest methods for secure database
    connections.`,
  },
  {
    name: 'Primitive',
    slug: 'primitive',
    tagline: 'A front-end design toolkit for responsive web apps.',
    image: primitive,
    url: 'https://taniarascia.github.io/primitive',
    description: ` I made my first websites in the late '90s, when HTML was written in
    uppercase, tables were using for creating layouts, and CSS didn't
    exist yet. When CSS came around I learned the most basic of float
    based layouts, but then I went off and worked another career for a
    decade.
    
    When I came back, something called responsive design was all the
    rage, and Bootstrap, Semantic UI, and Foundation were popular ways
    to implement it. I wasn't happy using something I didn't understand,
    and I thought those frameworks were too bloated, so I created my own
    with Sass that I used for several design projects. Primitive was
    created to provide helpful, browser-consistent styling for default
    HTML elements, such as buttons, forms, tables, lists, and
    typography.`,
  },

  {
    name: 'tania.dev',
    slug: 'taniarascia.com',
    tagline: 'The source of this website.',
    url: 'https://tania.dev',
    image: tr,
  },
  {
    name: 'webpack Boilerplate',
    slug: 'webpack-boilerplate',
    tagline: 'A sensible webpack 5 boilerplate.',
  },

  {
    name: 'Snek',
    slug: 'snek',
    tagline: 'A terminal-based Snake implementation.',
    writeup: '/snake-game-in-javascript',
  },
  {
    name: 'Sokoban',
    slug: 'sokoban',
    tagline: 'A web-based Sokoban implementation.',
    url: 'https://taniarascia.github.io/sokoban',
    writeup: '/sokoban-game',
  },
]

export default function ProjectsIndex() {
  const [repos, setRepos] = useState([])
  const title = 'Projects'
  const description = 'Lorem'

  useEffect(() => {
    async function getStars() {
      const repos = await fetch(
        'https://api.github.com/users/taniarascia/repos?per_page=100'
      )

      return repos.json()
    }

    getStars()
      .then((data) => {
        setRepos(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO />

      <header className="hero">
        <div className="top">
          <div className="hero-padding pattern">
            <div className="container">
              <div className="hero-prelude">Open-source</div>
              <h1>Projects</h1>
            </div>
          </div>
          <div className="lines vertical">
            <div className="line red1" />
            <div className="line red2" />
            <div className="line red3" />
            <div className="line red4" />
            <div className="line red5" />
          </div>
        </div>
      </header>

      <section className="segment">
        <div className="container">
          <div className="highlight-preview">
            {projectsList.map((project) => {
              return (
                <div className="muted card">
                  <div>
                    <time>{project.date}</time>
                    <a
                      className="card-header"
                      href={`https://github.com/taniarascia/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                    <p>{project.tagline}</p>
                  </div>
                  <div className="links">
                    <Link className="button" to={project.writeup}>
                      Write-up
                    </Link>
                    <a className="button flex" href={project.url}>
                      Demo
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

ProjectsIndex.Layout = Layout
