import terminal from '../../content/thumbnails/terminal.png'
import dom from '../../content/thumbnails/dom.png'
import ghibli from '../../content/thumbnails/ghibli.png'
import react from '../../content/thumbnails/react.png'
import writing from '../../content/thumbnails/writing.png'
import css from '../../content/thumbnails/css-new.png'
import oauth from '../../content/thumbnails/oauth.png'
import json from '../../content/thumbnails/json.png'
import apache from '../../content/thumbnails/apache.png'
import blinky from '../../content/thumbnails/blinky.png'
import js from '../../content/thumbnails/js.png'
import clock from '../../content/thumbnails/clock.png'
import binary from '../../content/thumbnails/binary.png'
import takenote from '../../content/thumbnails/tn.png'
import sokoban from '../../content/images/sokoban.png'
import animorphs from '../../content/thumbnails/animorphslogo.png'
import accordion from '../../content/images/keyboardaccordionlogo.png'
import computer from '../../content/thumbnails/computer.png'

export const shelvesList = [
  {
    title: 'Learn from scratch',
    description:
      'Every time I learned something new, I tried to write the guide I wished I had. Understanding how the command line works, how the DOM works, the fundamentals of CSS, and using APIs were all game changers for me.',
    links: [
      {
        title: 'Design for Developers',
        slug: '/design-for-developers',
        icon: writing,
      },
      {
        title: 'Introduction to the Command Line',
        slug: '/how-to-use-the-command-line-for-apple-macos-and-linux',
        icon: terminal,
      },
      {
        title: 'Introduction to the DOM',
        slug: '/introduction-to-the-dom',
        icon: dom,
      },
      {
        title: 'How to Connect to an API',
        slug: '/how-to-connect-to-an-api-with-javascript',
        icon: ghibli,
      },
      {
        title: 'How to Use React',
        slug: '/getting-started-with-react',
        icon: react,
      },
    ],
  },
  {
    title: 'Deep dives',
    slug: '/topics',
    buttonText: 'All Topics',
    description:
      'As my work became more advanced, I became more interested in documenting the process, authorization and authentication, data-driven design, build tools, architecture, and more.',
    links: [
      {
        title: 'React Application Architecture',
        slug: '/react-architecture-directory-structure',
        icon: react,
      },
      {
        title: 'CSS Concepts and Fundamentals',
        slug: '/overview-of-css-concepts',
        icon: css,
      },
      {
        title: 'OAuth with PKCE',
        slug: '/oauth-pkce-authorization',
        icon: oauth,
      },
      {
        title: 'Data-Driven Forms',
        slug: '/schema-based-form-system',
        icon: json,
      },
      {
        title: 'ECharts for Data Visualization',
        slug: '/apache-echarts-react',
        icon: apache,
      },
      {
        title: 'Event Loop, Callbacks, Promises, and Async',
        slug: '/asynchronous-javascript-event-loop-callbacks-promises-async-await',
        icon: clock,
      },
      {
        title: 'Bits, Bytes, and Bases',
        slug: '/bits-bytes-bases-and-a-hex-dump-javascript',
        icon: binary,
      },
    ],
  },
  {
    title: 'Under the hood',
    description: `Although it's not always necessary to reinvent the wheel, I like taking things apart to understand how they work.`,
    links: [
      {
        title: 'Chip-8 Emulator From Scratch',
        slug: '/writing-an-emulator-in-javascript-chip8',
        icon: blinky,
      },
      {
        title: 'MVC Application From Scratch',
        slug: '/javascript-mvc-todo-app',
        icon: js,
      },
      {
        title: 'Building TakeNote',
        slug: '/building-takenote',
        icon: takenote,
      },
      {
        title: 'Sokoban Game From Scratch',
        slug: '/sokoban-game',
        icon: sokoban,
      },
    ],
  },
  {
    title: 'Off the clock',
    description:
      "On a rare occasion, things of interest make it on the site that aren't just about coding, which expresses some of my other interests: building a PC for gaming, documenting the deep lore of Animorphs, and making an online accordion. (That one might be coding-adjacent.)",
    links: [
      {
        title: 'The Lore of Animorphs',
        slug: '/animorphs',
        icon: animorphs,
      },
      {
        title: 'Online Keyboard Accordion',
        slug: '/musical-instrument-web-audio-api',
        icon: accordion,
      },
      {
        title: 'Building My First PC',
        slug: '/building-my-first-pc',
        icon: computer,
      },
    ],
  },
]
