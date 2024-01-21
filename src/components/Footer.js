import React from 'react'

import netlify from '../../content/thumbnails/netlify.png'
import gatsby from '../assets/gatsby.png'
import github from '../assets/nav-github.png'
import floppy from '../assets/floppylogo.png'

const links = [
  { url: 'https://taniarascia.substack.com', label: 'Newsletter' },
  { url: 'https://ko-fi.com/taniarascia', label: 'Ko-Fi' },
  { url: 'https://patreon.com/taniarascia', label: 'Patreon' },
  { url: 'https://www.taniarascia.com/rss.xml', label: 'RSS' },
]
const madeWithLinks = [
  { url: 'https://www.gatsbyjs.org', label: 'Gatsby', icon: gatsby },
  { url: 'https://github.com/taniarascia', label: 'GitHub', icon: github },
  { url: 'https://www.netlify.com', label: 'Netlify', icon: netlify },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <span>
          <img src={floppy} className="logo" alt="Tania Rascia" />
        </span>
        <nav>
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
