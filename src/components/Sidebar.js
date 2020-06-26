import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import patreon from '../../content/thumbnails/patreon-light.png'
import kofi from '../../content/thumbnails/kofi.png'

import { slugify } from '../utils/helpers'

export default function Sidebar({ post }) {
  const { tags, thumbnail } = post.frontmatter

  return (
    <aside>
      <div className="aside-content">
        <section>
          {thumbnail && <Img fixed={thumbnail.childImageSharp.fixed} />}
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
          <h3>Author</h3>
          <p>
            Hey there, I'm Tania&mdash;a software engineer and open-source
            creator. This website is a compendium of things I've learned while
            writing code for fun and profit.
          </p>
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
          <a
            href="https://ko-fi.com/taniarascia"
            target="_blank"
            rel="noreferrer"
            className="kofi"
          >
            <img src={kofi} alt="Patreon" /> <span>Buy me a coffee</span>
          </a>
          <a
            href="https://patreon.com/taniarascia"
            target="_blank"
            rel="noreferrer"
            className="patreon"
          >
            <img src={patreon} alt="Kofi" /> <span>Become a Patron</span>
          </a>
        </section>
        <section>
          <h3>Email list</h3>
          <p>
            Every now and then I'll send out an email when I've created
            something new. Never any spam, easy unsubscribe whenever.
          </p>
          <a
            href="https://taniarascia.substack.com/subscribe"
            target="_blank"
            rel="noreferrer"
          >
            Subscribe to the email list
          </a>
        </section>
      </div>
    </aside>
  )
}
