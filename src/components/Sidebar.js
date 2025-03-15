import React from 'react'
import { Link } from 'gatsby'

import floppy from '../assets/nav-floppy.png'

export const Sidebar = () => {
  const links = [
    {
      url: '/musical-instrument-web-audio-api',
      title: 'Keyboard Accordion',
    },
    {
      url: '/how-to-create-a-memory-game-super-mario-with-plain-javascript',
      title: 'Super Mario Memory Game',
    },
    {
      url: '/animorphs',
      title: 'The Lore of Animorphs',
    },
    {
      url: '/writing-an-emulator-in-javascript-chip8/',
      title: 'JavaScript Emulator',
    },
    {
      url: '/overview-of-css-concepts/',
      title: 'CSS Guidebook',
    },
    {
      url: '/react-architecture-directory-structure',
      title: 'React Architecture',
    },
    {
      url: '/building-takenote',
      title: 'TakeNote Post-mortem',
    },
    {
      url: '/asynchronous-javascript-event-loop-callbacks-promises-async-await/',
      title: 'The Event Loop',
    },
    {
      url: '/setting-up-a-brand-new-mac-for-development',
      title: 'macOS Setup',
    },
    {
      url: '/topics',
      title: 'All Topics',
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
                alt="tania.dev"
                title="💾"
              />
            </span>
            <span>tania.dev</span>
          </Link>
        </div>
        <div className="sidebar-container">
          <section className="sidebar-section">
            <h2>About Me</h2>
            <div className="sidebar-content">
              <p>
                I'm <Link to="/me">Tania</Link>, software engineer and
                open-source creator. This is my digital garden. 🌱
              </p>
            </div>
          </section>

          <section className="sidebar-section">
            <h2>Stay Connected</h2>
            <p className="sidebar-links">
              <a
                href="https://taniarascia.substack.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Newsletter
              </a>
              <a
                href="https://go.bsky.app/SmEWb8G"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bluesky
              </a>
              <a href="/rss.xml">RSS Feed</a>
            </p>
          </section>

          <section className="sidebar-section">
            <h2>My Favorites</h2>
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
