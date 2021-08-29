import React from 'react'
import { Link } from 'gatsby'

import netlify from '../../content/thumbnails/netlify.png'
import gatsby from '../../content/thumbnails/gatsby.png'
import github from '../../content/thumbnails/github.png'

const links = [
  {
    url: 'https://taniarascia.substack.com/subscribe',
    label: 'Newsletter',
  },
  {
    url: 'https://ko-fi.com/taniarascia',
    label: 'Ko-Fi',
  },
  {
    url: 'https://patreon.com/taniarascia',
    label: 'Patreon',
  },
]

const internalLinks = [
  {
    url: '/rss.xml',
    label: 'RSS',
  },
]

const madeWithLinks = [
  {
    url: 'https://www.gatsbyjs.org/',
    label: 'Gatsby',
    icon: gatsby,
  },
  {
    url: 'https://github.com/taniarascia',
    label: 'GitHub',
    icon: github,
  },
  {
    url: 'https://www.netlify.com',
    label: 'Netlify',
    icon: netlify,
  },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <nav>
          <span>Made by Tania Rascia</span>
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              {link.label}
            </a>
          ))}
          {internalLinks.map((link) => (
            <Link to={link.url} key={link.url}>
              {link.label}
            </Link>
          ))}
        </nav>
        <nav>
          {madeWithLinks.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              <span>{link.label}</span>
              <img src={link.icon} alt={link.label} />
            </a>
          ))}
        </nav>
      </section>
    </footer>
  )
}
