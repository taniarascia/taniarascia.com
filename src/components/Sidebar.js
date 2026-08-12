import React from 'react'
import { Link } from 'gatsby'

import { ColorDropdown } from './ColorDropdown'
import floppyLogo from '../assets/nav-floppy.png'
import floppy from '../assets/floppylogo.png'
import blog from '../assets/nav-blog.png'
import projects from '../assets/nav-projects.png'
import { useSidebarImages } from '../utils/hooks/useSidebarImages'
import { Moon } from '../assets/Moon'
import { Sun } from '../assets/Sun'
import { Mail } from '../assets/Mail'
import { Bluesky } from '../assets/Bluesky'
import { Rss } from '../assets/Rss'
import { GitHub } from '../assets/GitHub'

export const Sidebar = ({
  theme,
  handleUpdateTheme,
  currentColor,
  setCurrentColor,
}) => {
  const { apple, newMoon } = useSidebarImages()
  const links = [
    { url: '/blog', label: 'Blog', image: blog },
    { url: '/projects', label: 'Projects', image: projects },
    { url: '/me', label: 'About Me', image: floppy },
  ]
  const socialLinks = [
    {
      url: 'https://taniarascia.substack.com',
      label: 'Email signup',
      Icon: Mail,
    },
    { url: 'https://github.com/taniarascia', label: 'GitHub', Icon: GitHub },
    { url: 'https://go.bsky.app/SmEWb8G', label: 'Bluesky', Icon: Bluesky },
    { url: '/rss.xml', label: 'RSS feed', Icon: Rss },
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
            <span className="site-name">Tania Rascia</span>
          </Link>
          <div className="flex-align-center">
            <ColorDropdown
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
            />
            <div className="tooltip-container">
              <button
                className="navbar-button"
                onClick={() => {
                  const newTheme = theme === 'dark' ? 'light' : 'dark'

                  handleUpdateTheme(newTheme)
                }}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </button>
              <div className="tooltip">Theme</div>
            </div>
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
        <nav className="sidebar-links">
          {socialLinks.map(({ url, label, Icon }) => (
            <div className="tooltip-container" key={url}>
              {url.startsWith('http') ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ) : (
                <a href={url} aria-label={label}>
                  <Icon size={20} />
                </a>
              )}
              <div className="tooltip">{label}</div>
            </div>
          ))}
        </nav>
      </section>

      <section className="sidebar-card">
        <h2 className="flex-align-center gap">
          {newMoon?.publicURL && (
            <img src={newMoon.publicURL} alt="" width="20" height="20" />
          )}
          New Moon Theme
        </h2>
        <div className="sidebar-content">
          <p>
            I use and maintain{' '}
            <a
              href="https://taniarascia.github.io/new-moon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Moon
            </a>
            , a dark theme for{' '}
            <a
              href="https://marketplace.visualstudio.com/items?itemName=taniarascia.new-moon-vscode"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visual Studio Code
            </a>
            .
          </p>
        </div>
      </section>

      <section className="sidebar-card">
        <h2 className="flex-align-center gap">
          {apple?.publicURL && (
            <img src={apple.publicURL} alt="" width="20" height="20" />
          )}
          Setting Up a Mac?
        </h2>
        <div className="sidebar-content">
          <p>
            Read my guide to{' '}
            <Link to="/setting-up-a-brand-new-mac-for-development">
              setting up a new Mac
            </Link>{' '}
            for dev.
          </p>
        </div>
      </section>
    </aside>
  )
}
