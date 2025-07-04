import React, { useState } from 'react'
import { Link } from 'gatsby'
import { SocialIcon } from 'react-social-icons'
import { useLocation } from '@reach/router'

import floppy from '../assets/floppylogo.png'
import floppyLogo from '../assets/nav-floppy.png'
import blog from '../assets/nav-blog.png'
import projects from '../assets/nav-projects.png'
import github from '../assets/nav-github.png'
import { Moon } from '../assets/Moon'
import { Sun } from '../assets/Sun'
import { Menu } from '../assets/Menu'
import { Close } from '../assets/Close'
import { Searchbar } from './Searchbar'
import { IconCollapse } from '../assets/IconCollapse'
import { IconExpand } from '../assets/IconExpand'
import { ColorDropdown } from './ColorDropdown'

const links = [
  { url: '/notes', label: 'Notes', image: blog },
  { url: '/blog', label: 'Blog', image: projects },
  { url: '/projects', label: 'Projects', image: github },
  { url: '/me', label: 'About', image: floppy },
]

const socialLinks = [
  { url: 'https://github.com/taniarascia' },
  { url: 'https://bsky.app/profile/tania.dev' },
]

export const Navigation = ({
  handleUpdateTheme,
  theme,
  handleCollapse,
  collapsed,
}) => {
  const location = useLocation()
  const currentPath = location.pathname
  const [navOpen, setNavOpen] = useState(false)
  const [query, setQuery] = useState('')

  const handleToggleMobileNav = () => {
    setNavOpen((prev) => !prev)
  }

  const handleCloseMobileNav = () => {
    setNavOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-title">
        <div className="navbar-title-content">
          <Link to="/" className="navbar-title-link">
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
          <div className="navbar-collapse">
            <button className="navbar-button icon" onClick={handleCollapse}>
              {collapsed ? <IconExpand /> : <IconCollapse />}
            </button>
          </div>
        </div>
      </div>
      <div className="navbar-container">
        <section className="navbar-section navbar-section-search">
          {!currentPath.includes('blog') && !currentPath.includes('notes') && (
            <Searchbar
              isLocal={false}
              query={query}
              setQuery={setQuery}
              handleSearch={(event) => {
                setQuery(event.target.value)
              }}
            />
          )}
        </section>
        <section className="navbar-section">
          <button
            className={`navbar-button nav-menu-button ${
              navOpen ? 'active' : ''
            }`}
            onClick={handleToggleMobileNav}
          >
            {navOpen ? <Close /> : <Menu />}
          </button>
          <nav className={`navbar-menu nav-items ${navOpen ? 'active' : ''}`}>
            {links.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                activeClassName="active"
                onClick={handleCloseMobileNav}
              >
                <img src={link.image} alt={link.label} />
                {link.label}
              </Link>
            ))}
          </nav>
          <nav className="navbar-menu social">
            <button
              className="navbar-button"
              onClick={() => {
                const newTheme = theme === 'dark' ? 'light' : 'dark'

                handleUpdateTheme(newTheme)
              }}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
            <ColorDropdown />
            {socialLinks.map((link) => (
              <SocialIcon
                target="_blank"
                key={link.url}
                url={link.url}
                fgColor="currentColor"
                bgColor="transparent"
                className="navbar-icon"
              />
            ))}
          </nav>
        </section>
      </div>
    </header>
  )
}
