import React from 'react'
import { Link } from 'gatsby'

import { ExternalLinkIcon } from '../assets/ExternalLinkIcon'
import blog from '../assets/nav-blog.png'
import floppyLogo from '../assets/floppylogo.png'
import floppy from '../assets/nav-floppy.png'
import github from '../assets/nav-github.png'
import projects from '../assets/nav-projects.png'
import moon from '../assets/moon.png'
import { slugify } from '../utils/helpers'

const mainNavItems = [
  { url: '/me', icon: floppy, label: 'About me' },
  { url: '/blog', icon: blog, label: 'Writing' },
  { url: '/projects', icon: projects, label: 'Projects' },
]

const socialNavItems = [
  { url: 'https://github.com/taniarascia', icon: github, label: 'GitHub' },
]

export const Navigation = ({ theme, onUpdateTheme }) => {
  return (
    <section className="navigation">
      <div className="container">
        <nav>
          <Link to="/" className="item brand">
            <img src={floppyLogo} className="logo" alt="Tania Rascia" />
            <span>Tania Rascia</span>
          </Link>
          {mainNavItems.map((item) => (
            <div className="nav-item-outer">
              <img src={item.icon} alt={item.label} className="nav-image" />
              <Link
                to={item.url}
                key={item.label}
                activeClassName="active"
                className={`item ${slugify(item.label)}`}
              >
                <span>{item.label}</span>
              </Link>
            </div>
          ))}

          {socialNavItems.map((item) => (
            <div className="nav-item-outer">
              <img src={item.icon} alt={item.label} className="nav-image" />
              <a
                href={item.url}
                key={item.label}
                className={`desktop-only item ${slugify(item.label)}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>{item.label}</span>
                <ExternalLinkIcon />
              </a>
            </div>
          ))}
        </nav>
        <button className="theme-toggle" onClick={onUpdateTheme}>
          <img src={moon} alt="Theme" />{' '}
          <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </section>
  )
}
