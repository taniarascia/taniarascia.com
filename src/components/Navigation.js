import React from 'react'
import { Link } from 'gatsby'

import floppy from '../assets/floppylogo.png'
import blog from '../assets/nav-blog.png'
import search from '../assets/nav-search.png'
import projects from '../assets/nav-projects.png'
import moon from '../assets/moon.png'

const mainNavItems = [
  { url: '/notes', icon: blog, label: 'Notes' },
  { url: '/blog', icon: blog, label: 'Articles' },
  { url: '/projects', icon: projects, label: 'Projects' },
  { url: '/me', icon: search, label: 'About Me' },
]

export const Navigation = ({ onUpdateTheme }) => {
  return (
    <section className="navigation">
      <div className="container">
        <Link to="/" className="item brand">
          <img src={floppy} className="logo" alt="Tania Rascia" />
          <span>Tania Rascia</span>
        </Link>
        <nav>
          {mainNavItems.map((item) => (
            <div className="nav-item-outer" key={item.url}>
              <Link
                to={item.url}
                key={item.label}
                activeClassName="active"
                className="item"
              >
                <span>{item.label}</span>
              </Link>
            </div>
          ))}

          <div className="theme-toggle">
            <button onClick={onUpdateTheme}>
              <img src={moon} alt="Theme" />
            </button>
          </div>
        </nav>
      </div>
    </section>
  )
}
