import React from 'react'
import { Link } from 'gatsby'

import netlify from '../../content/thumbnails/netlify.png'
import gatsby from '../../content/thumbnails/gatsby.png'
import github from '../../content/thumbnails/github.png'

export default function Footer() {
  return (
    <footer className="footer flex">
      <section className="container">
        <nav className="footer-links">
          <Link to="/blog">Articles</Link>
          <Link to="/guides">Guides</Link>
          <a
            href="https://taniarascia.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Newsletter
          </a>
          <a
            href="https://twitter.com/taniarascia"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <Link to="/rss.xml">RSS</Link>
          <a
            href="https://ko-fi.com/taniarascia"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donate
          </a>
          <a
            href="https://patreon.com/taniarascia"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patreon
          </a>
        </nav>
        <nav className="flex justify-center">
          <a
            href="https://www.gatsbyjs.org/"
            title="Built with Gatsby"
            target="_blank"
            rel="noopener noreferrer"
            className="img"
          >
            <img src={gatsby} className="footer-img" alt="Gatsby" />
          </a>
          <a
            href="https://github.com/taniarascia"
            title="Open-source on GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="img"
          >
            <img src={github} className="footer-img" alt="GitHub" />
          </a>
          <a
            href="https://www.netlify.com/"
            title="Hosted by Netlify"
            target="_blank"
            rel="noopener noreferrer"
            className="img"
          >
            <img src={netlify} className="footer-img" alt="Netlify" />
          </a>
        </nav>
      </section>
    </footer>
  )
}
