import React, { useState } from 'react'
import { Link } from 'gatsby'
import { SocialIcon } from 'react-social-icons'

import floppy from '../assets/nav-floppy.png'
import { Moon } from '../assets/Moon'
import { Sun } from '../assets/Sun'
import { Menu } from '../assets/Menu'
import { Close } from '../assets/Close'

const links = [
  { url: '/notes', label: 'Notes' },
  { url: '/blog', label: 'Articles' },
  { url: '/projects', label: 'Projects' },
  { url: '/illustration', label: 'Illustration' },
  { url: '/me', label: 'About me' },
]

const socialLinks = [
  { url: 'https://github.com/taniarascia' },
  { url: 'https://bsky.app/profile/tania.dev' },
]

export const Navigation = ({ handleUpdateTheme, theme }) => {
  const [navOpen, setNavOpen] = useState(false)

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
                src={floppy}
                className="sidebar-logo"
                alt="Tania Rascia"
                title="💾"
              />
            </span>
            <span>Tania Rascia</span>
          </Link>
        </div>
      </div>
      <div className="navbar-wrapper">
        <div className="navbar-container">
          <section className="navbar-section navbar-section-search"></section>
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
                  {link.label}
                </Link>
              ))}
            </nav>
            <nav className="navbar-menu social">
              <button
                className="navbar-button theme-switch-button"
                onClick={() => {
                  const newTheme = theme === 'dark' ? 'light' : 'dark'

                  handleUpdateTheme(newTheme)
                }}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </button>
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
      </div>
    </header>
  )
}
