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
          <img src={tania} alt="Tania" className="avatar" />
          <p>
            I'm Tania, a software engineer and open-source
            creator. This website is a compendium of things I've learned while
            writing code for fun and profit.
          </p>
        </section>
        <section>
          <h3>Published</h3>
          <time>{post.frontmatter.date}</time>
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
          <h3>Support</h3>
          <p>
            I believe there are pockets of the internet that can still be
            beautiful. That's why my site has:
          </p>
          <ul>
            <li>No ads</li>
            <li>No social media</li>
            <li>No tracking or analytics</li>
            <li>No sponsored posts</li>
            <li>No affiliate links</li>
            <li>No paywall</li>
            <li>No third-party scripts</li>
            <li>
              <mark>No bullshit</mark>
            </li>
          </ul>
          <p>
            If you like what I do and would like to support me, you can do so
            below!
          </p>
          <nav>
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
          <h3>Stay in touch</h3>
          <p>
            Every now and then I'll send out an email when I've created
            something new. No spam, unsubscribe whenever. Or follow on RSS.
          </p>
          <nav>
            <a
              href="https://taniarascia.substack.com/subscribe"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <img src={email} alt="Email" />
              <span>Email list</span>
            </a>
            <Link
              to="/rss.xml"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <img src={rss} alt="RSS" /> <span>RSS Feed</span>
            </Link>
          </nav>
        </section>
        <section>
          <h3>Search</h3>
          <p>This search actually works, I promise.</p>
          <SearchForm {...props} />
        </section>
      </div>
    </aside>
  )
}
