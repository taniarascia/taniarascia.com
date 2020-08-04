import React from 'react'
import { Link } from 'gatsby'

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
            I'm Tania, a software engineer and open-source creator. This website
            is a compendium of things I've learned while writing code for fun
            and profit.
          </p>
          <p>
            Everything I write and create is <b>free</b>. I will{' '}
            <b>never have ads, paywalls, or sponsored content</b> on my website.
          </p>
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
          <h3>Stay in touch</h3>
          <nav>
            <a
              href="https://taniarascia.substack.com/subscribe"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <span className="emoji">✉️</span> Email newsletter
            </a>
            <Link
              to="/rss.xml"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <span className="emoji">☢️</span> RSS feed
            </Link>
            <a
              href="https://ko-fi.com/taniarascia"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <span className="emoji">☕</span> Buy me a coffee
            </a>
          </nav>
        </section>
      </div>
    </aside>
  )
}
