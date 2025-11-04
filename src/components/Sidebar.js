import React from 'react'
import { Link } from 'gatsby'

import { ColorDropdown } from './ColorDropdown'
import floppyLogo from '../assets/nav-floppy.png'
import floppy from '../assets/floppylogo.png'
import bluesky from '../../content/thumbnails/bluesky.png'
import rss from '../../content/thumbnails/rss.png'
import newMoon from '../../content/images/new-moon.svg'
import blog from '../assets/nav-blog.png'
import projects from '../assets/nav-projects.png'
import github from '../assets/nav-github.png'
import { Moon } from '../assets/Moon'
import { Sun } from '../assets/Sun'

export const Sidebar = ({
  theme,
  handleUpdateTheme,
  currentColor,
  setCurrentColor,
}) => {
  const links = [
    { url: '/blog', label: 'Blog', image: projects },
    { url: '/notes', label: 'Notes', image: blog },
    { url: '/projects', label: 'Projects', image: github },
    { url: '/me', label: 'About Me', image: floppy },
  ]

  return (
    <aside className="sidebar">
      <section className="sidebar-section">
        <div className="sidebar-title-link">
          <Link to="/" className="flex-align-center gap">
            <span>
              <img
                src={floppyLogo}
                className="navbar-logo"
                alt="tania.dev"
                title="💾"
                height="16"
                width="16"
              />
            </span>
            <span className="site-name">tania.dev</span>
          </Link>
          <div className="flex-align-center">
            <ColorDropdown
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
            />
            <button
              className="navbar-button"
              onClick={() => {
                const newTheme = theme === 'dark' ? 'light' : 'dark'

                handleUpdateTheme(newTheme)
              }}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </section>

      <section className="sidebar-section">
        <h2>About Me</h2>
        <div className="sidebar-content">
          <p>
            I'm <Link to="/me">Tania</Link>, software engineer and open-source
            creator. This is my digital garden. 🌱
          </p>
        </div>
      </section>

      <section className="sidebar-section">
        <nav className="sidebar-nav-links">
          {links.map((link) => (
            <Link key={link.url} to={link.url} activeClassName="active">
              <img src={link.image} alt={link.label} />
              {link.label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="sidebar-section">
        <h2>Stay Connected</h2>
        <p className="sidebar-links">
          <a
            href="https://taniarascia.substack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={newMoon} alt="Email Newsletter" height="16" width="16" />
            Email Newsletter
          </a>
          <a
            href="https://go.bsky.app/SmEWb8G"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={bluesky} alt="Bluesky" height="16" width="16" />
            Bluesky Starter Pack
          </a>
          <a href="/rss.xml">
            <img src={rss} alt="RSS" height="16" width="16" />
            RSS Feed
          </a>
        </p>
      </section>
    </aside>
  )
}
