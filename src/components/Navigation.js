import React from 'react'
import { Link } from 'gatsby'

import blog from '../assets/nav-blog.png'
import search from '../assets/nav-search.png'
import floppy from '../assets/nav-floppy.png'
import github from '../assets/nav-github.png'
import projects from '../assets/nav-projects.png'
import moon from '../assets/moon.png'
import { slugify } from '../utils/helpers'

const mainNavItems = [
  { url: '/', icon: floppy, label: 'Home' },
  { url: '/me', icon: search, label: 'About' },
  { url: '/blog', icon: blog, label: 'Blog' },
  { url: '/projects', icon: projects, label: 'Projects' },
]

const socialNavItems = [
  { url: 'https://github.com/taniarascia', icon: github, label: 'GitHub' },
]

export const Navigation = ({ onUpdateTheme }) => {
  return (
    <section className="navigation">
      <div className="container">
        {/* <Link to="/" className="item brand"> */}
        {/* <img src={floppyLogo} className="logo" alt="Tania Rascia" /> */}
        {/* <span>Tania Rascia</span> */}
        {/* </Link> */}
        <nav>
          {mainNavItems.map((item) => (
            <div className="nav-item-outer" key={item.url}>
              <Link
                to={item.url}
                key={item.label}
                activeClassName="active"
                className={`item ${slugify(item.label)} ${
                  item.mobileOnly ? 'mobile-only' : ''
                }`}
              >
                <img src={item.icon} alt={item.label} className="nav-image" />
                <span>{item.label}</span>
              </Link>
            </div>
          ))}

          {socialNavItems.map((item) => (
            <div className="nav-item-outer" key={item.url}>
              <a
                href={item.url}
                key={item.label}
                className={`desktop-only item ${slugify(item.label)}`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={item.icon} alt={item.label} className="nav-image" />
                <span>{item.label}</span>
              </a>
            </div>
          ))}
        </nav>
        <div className="theme-toggle">
          <button onClick={onUpdateTheme}>
            <img src={moon} alt="Theme" />
          </button>
        </div>
      </div>
    </section>
  )
}
