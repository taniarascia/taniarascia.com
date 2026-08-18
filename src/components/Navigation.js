import React, { useState } from 'react'
import { Link } from 'gatsby'
import { SocialIcon } from 'react-social-icons'

import floppyLogo from '../assets/nav-floppy.png'
import { Moon } from '../assets/Moon'
import { Sun } from '../assets/Sun'
import { Menu } from '../assets/Menu'
import { Close } from '../assets/Close'
import { ColorDropdown } from './ColorDropdown'
import { mainNavLinks as links } from '../data/navLinks'

const socialLinks = [{ url: 'https://bsky.app/profile/tania.dev' }]

export const Navigation = ({
  handleUpdateTheme,
  theme,
  currentColor,
  setCurrentColor,
}) => {
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
        </div>
      </div>
      <div className="navbar-container">
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
                <img src={link.image} alt="" />
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
            <ColorDropdown
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
            />
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
