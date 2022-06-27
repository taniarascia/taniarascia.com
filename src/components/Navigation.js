import React from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'

import { ExternalLinkIcon } from '../assets/ExternalLinkIcon'
import blog from '../assets/nav-blog.png'
import floppyLogo from '../assets/floppylogo.png'
import floppy from '../assets/nav-floppy.png'
import github from '../assets/nav-github.png'
import projects from '../assets/nav-projects.png'
import { slugify } from '../utils/helpers'

const mainNavItems = [
  { url: '/me', icon: floppy, label: 'About me' },
  { url: '/blog', icon: blog, label: 'Writing' },
  { url: '/projects', icon: projects, label: 'Projects' },
]

const socialNavItems = [
  { url: 'https://github.com/taniarascia', icon: github, label: 'GitHub' },
]

const findColor = (path) => {
  switch (path) {
    case '/':
      return 'rainbow'
    case '/me':
      return 'blue'
    case '/blog':
      return 'green'
    case '/projects':
      return 'red'
    default:
      return ''
  }
}

export const Navigation = () => {
  const location = useLocation()
  const color = findColor(location.pathname)

  return (
    <section className="navigation">
      <div className="container">
        <nav>
          <img src={floppyLogo} className="logo" alt="Tania Rascia" />
          <Link to="/" className="item brand">
            <span>Tania Rascia</span>
          </Link>
          {mainNavItems.map((item) => (
            <Link
              to={item.url}
              key={item.label}
              activeClassName="active"
              className={`item ${slugify(item.label)}`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
          {socialNavItems.map((item) => (
            <a
              href={item.url}
              key={item.label}
              className={`item ${slugify(item.label)}`}
              target="_blank"
              rel="noreferrer"
            >
              <span>{item.label}</span>
              <ExternalLinkIcon />
            </a>
          ))}
        </nav>
      </div>
      {color && (
        <div className="lines diagonal">
          {Array.from(Array(5)).map((_, i) => (
            <div key={_} className={`line ${color}-${i + 1}`} />
          ))}
        </div>
      )}
    </section>
  )
}
