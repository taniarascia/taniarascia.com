import React from 'react'

import netlify from '../assets/netlify.png'
import gatsby from '../assets/gatsby.png'
import github from '../assets/nav-github.png'
import { Mail } from '../assets/Mail'
import { Rss } from '../assets/Rss'
import { Bluesky } from '../assets/Bluesky'
import { Coffee } from '../assets/Coffee'

const links = [
  { url: 'https://taniarascia.substack.com', label: 'Email signup', Icon: Mail },
  { url: 'https://www.taniarascia.com/rss.xml', label: 'RSS feed', Icon: Rss },
  { url: 'https://bsky.app/profile/tania.dev', label: 'Bluesky', Icon: Bluesky },
  {
    url: 'https://ko-fi.com/taniarascia',
    label: 'Buy me a coffee',
    Icon: Coffee,
  },
]
const madeWithLinks = [
  { url: 'https://www.gatsbyjs.org', label: 'Gatsby', icon: gatsby },
  { url: 'https://github.com/taniarascia', label: 'GitHub', icon: github },
  { url: 'https://www.netlify.com', label: 'Netlify', icon: netlify },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-section">
        <nav className="footer-menu">
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
              className="footer-link"
            >
              <link.Icon size={15} />
              {link.label}
            </a>
          ))}
        </nav>
        <nav className="footer-menu-buttons">
          {madeWithLinks.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
              className="button small"
            >
              <img src={link.icon} alt={link.label} />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
        <div className="footer-made-by">Made with ❤️ by Tania Rascia</div>
      </section>
    </footer>
  )
}
