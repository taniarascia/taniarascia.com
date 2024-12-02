import React from 'react'
import { Link } from 'gatsby'

import floppy from '../assets/nav-floppy.png'

export const Sidebar = () => {
  const links = [
    {
      url: '/musical-instrument-web-audio-api',
      title: 'Keyboard accordion',
    },
    {
      url: '/how-to-create-a-memory-game-super-mario-with-plain-javascript',
      title: 'Super Mario memory game',
    },
    {
      url: '/animorphs',
      title: 'The lore of Animorphs',
    },
    {
      url: '/writing-an-emulator-in-javascript-chip8/',
      title: 'JavaScript emulator',
    },
    {
      url: '/javascript-mvc-todo-app',
      title: 'MVC basics',
    },
    {
      url: '/overview-of-css-concepts/',
      title: 'CSS guidebook',
    },
    {
      url: '/react-architecture-directory-structure',
      title: 'React architecture',
    },
    {
      url: '/building-takenote',
      title: 'TakeNote post-mortem',
    },
    {
      url: '/asynchronous-javascript-event-loop-callbacks-promises-async-await/',
      title: 'The event loop',
    },
    {
      url: '/setting-up-a-brand-new-mac-for-development',
      title: 'macOS Setup',
    },
    {
      url: '/schema-based-form-system',
      title: 'Schema-based form system',
    },
    {
      url: '/everything-i-know-as-a-software-developer-without-a-degree',
      title: 'Everything I knew (in 2019)',
    },
    {
      url: '/topics',
      title: 'All topics',
    },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-title">
          <Link to="/" className="sidebar-title-link">
            <span>
              <img
                src={floppy}
                className="sidebar-logo"
                alt="Tania Rascia"
                title="💾"
              />
            </span>
            <span>Tania Rascia</span>
          </Link>
        </div>
        <div className="sidebar-container">
          <section className="sidebar-section">
            <h2>About me</h2>
            <div className="sidebar-content">
              <p>
                I'm <Link to="/me">Tania</Link>, software engineer and
                open-source creator. This is my digital garden. 🌱
              </p>
            </div>
          </section>

          <section className="sidebar-section">
            <h2>Stay in touch</h2>
            <p>Get an update when I write something new!</p>
            <p>
              <a
                href="https://go.bsky.app/SmEWb8G"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bluesky 🦋 starter park
              </a>
              <br />
              <a href="/rss.xml">RSS feed</a>
            </p>
            <a
              href="https://taniarascia.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Email Signup
            </a>
          </section>

          <section className="sidebar-section">
            <h2>Some of my favorite posts</h2>
            <nav className="sidebar-menu">
              {links.map((link) => (
                <Link key={link.url} to={link.url}>
                  {link.title}
                </Link>
              ))}
            </nav>
          </section>
        </div>
      </div>
    </aside>
  )
}
