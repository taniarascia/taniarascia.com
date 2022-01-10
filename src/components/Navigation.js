import React from 'react'
import { Link } from 'gatsby'

import { Hamburger } from '../assets/Hamburger'
import moon from '../assets/moon.png'
import blog from '../assets/nav-blog.png'
import floppy from '../assets/nav-floppy.png'
import github from '../assets/nav-github.png'
import projects from '../assets/nav-projects.png'
import twitter from '../assets/nav-twitter.png'

const mainNavItems = [
  { url: '/blog', icon: blog, label: 'Articles' },
  { url: '/projects', icon: projects, label: 'Projects' },
  { url: '/me', icon: floppy, label: 'About me' },
]

const socialNavItems = [
  { url: 'https://github.com/taniarascia', icon: github, label: 'GitHub' },
  { url: 'https://twitter.com/taniarascia', icon: twitter, label: 'Twitter' },
]

export const Navigation = ({ setCollapsed, onUpdateTheme, theme }) => {
  return (
    <header className="navigation">
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="desktop-only"
        title="Collapse Sidebar"
      >
        <Hamburger />
      </button>
      <Link to="/" className="brand">
        <span>Tania Rascia</span>
      </Link>
      <div>
        <nav>
          {mainNavItems.map((item) => (
            <Link to={item.url} key={item.label} activeClassName="active">
              <img src={item.icon} alt={item.label} />
              <div className="tooltip">{item.label}</div>
            </Link>
          ))}
        </nav>
      </div>
      <div className="toolbar">
        <nav className="social-nav">
          {socialNavItems.map((item) => (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              key={item.label}
            >
              <img src={item.icon} alt={item.label} />
              <div className="tooltip">{item.label}</div>
            </a>
          ))}
        </nav>
        <button onClick={onUpdateTheme} className="theme-switcher">
          <img src={moon} alt="Theme" />
          <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </header>
  )
}
