import React from 'react'
import { Link } from 'gatsby'

import patreon from '../../content/thumbnails/patreon-light.png'
import kofi from '../../content/thumbnails/kofi.png'
import rss from '../../content/thumbnails/rss.png'
import email from '../../content/images/email.png'
import tania from '../../content/images/tania-2020.png'

import SearchForm from '../components/SearchForm'

import { slugify } from '../utils/helpers'

export default function Sidebar({ post, ...props }) {
  const { tags } = post.frontmatter

  return (
    <aside>
      <div className="aside-content">
        <section>
          <h3>Author</h3>
          <img src={tania} className="avatar" alt="Me" />
          <p>
            I'm <Link to="/me">Tania</Link>, a software engineer and open-source
            creator. This website is a compendium of things I've learned while
            writing code for fun and profit.
          </p>
          <nav>
            <a
              href="https://taniarascia.substack.com/subscribe"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <img src={email} alt="Email" />
              <span>Newsletter signup</span>
            </a>
            <Link
              to="/rss.xml"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <img src={rss} alt="RSS" /> <span>RSS Feed</span>
            </Link>
            <a
              href="https://ko-fi.com/taniarascia"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <img src={kofi} alt="Patreon" /> <span>Buy me a coffee</span>
            </a>
            <a
              href="https://patreon.com/taniarascia"
              target="_blank"
              rel="noreferrer"
              className="link patreon"
            >
              <img src={patreon} alt="Patreon" /> <span>Become a Patron</span>
            </a>
          </nav>
        </section>
        <section>
          <h3>Published</h3>
          <time>{post.frontmatter.date}</time>
        </section>
        <section>
          <h3>Tags</h3>
          <div className="cell tags">
            {tags &&
              tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tags/${slugify(tag)}`}
                  className={`tag-${tag}`}
                >
                  {tag}
                </Link>
              ))}
          </div>
        </section>

        <section>
          <h3>Search</h3>
          <p>Search anything on the site.</p>
          <SearchForm {...props} />
        </section>
      </div>
    </aside>
  )
}
