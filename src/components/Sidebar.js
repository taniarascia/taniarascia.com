import React from 'react'
import { Link } from 'gatsby'

import SearchForm from '../components/SearchForm'
import tania from '../../content/images/tania-2020.png'

import { slugify } from '../utils/helpers'

export default function Sidebar({ post, ...props }) {
  const { tags } = post.frontmatter

  return (
    <aside>
      <div className="aside-content">
        <section>
          <img src={tania} alt="Tania" className="avatar" />
          <p>
            I'm <Link to="/me">Tania</Link>, a software engineer and open-source
            creator. This website is a compendium of things I've learned while
            writing code for fun and profit.
          </p>
          <p>
            I create guides, tutorials, and resources on programming, modern
            JavaScript, and web development.
          </p>
        </section>
        <section>
          <h3>Stay in touch</h3>
          <p>
            I write as often as I can! I'll send out an email after I've written
            a few. Never any spam.
          </p>
          <nav>
            <a
              href="https://taniarascia.substack.com/subscribe"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              Get emails from Tania
            </a>
            <Link
              to="/rss.xml"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              Follow the RSS feed
            </Link>
            <a href="mailto:hello@taniarascia.com" className="link">
              hello@taniarascia.com
            </a>
          </nav>
        </section>
        <section>
          <h3>Support me</h3>
          <p>
            Everything I write and create for you is <b>free</b>. I will{' '}
            <b>never have ads, paywalls, or sponsored content</b> on my website.
          </p>
          <nav>
            <a
              href="https://ko-fi.com/taniarascia"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              Buy me a coffee
            </a>
            <a
              href="https://patreon.com/taniarascia"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              Become a Patron
            </a>
          </nav>
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
          <h3>Published</h3>
          <time>{post.frontmatter.date}</time>
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
