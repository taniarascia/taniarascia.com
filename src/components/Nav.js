import React from 'react'
import { Link } from 'gatsby'

import blog from '../assets/nav-blog.png'
import floppy from '../assets/nav-floppy.png'
import github from '../assets/nav-github.png'
import projects from '../assets/nav-projects.png'
import search from '../assets/nav-search.png'
import twitter from '../assets/nav-twitter.png'

const mainNavItems = [
  { url: '/', icon: floppy, label: 'Home' },
  { url: '/', icon: search, label: 'Search' },
  { url: '/blog', icon: blog, label: 'Blog' },
  { url: '/projects', icon: projects, label: 'Projects' },
]

const socialNavItems = [
  { url: 'https://github.com/taniarascia', icon: github, label: 'GitHub' },
  { url: 'https://twitter.com/taniarascia', icon: twitter, label: 'Twitter' },
]

export const Nav = () => {
  return (
    <aside className="navbar">
      <section>
        <nav>
          {mainNavItems.map((item) => (
            <Link to={item.url} key={item.label}>
              <img src={item.icon} alt={item.label} />
              <div className="tooltip">{item.label}</div>
            </Link>
          ))}
        </nav>
        <nav>
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
      </section>
    </aside>
  )
}
