import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { useActiveHash } from '../utils/hooks/useActiveHash'
import { slugify } from '../utils/helpers'

export const PostSidebar = ({ thumbnail, toc, tags = [], date }) => {
  const [tocLinks, setTocLinks] = useState([])

  useLayoutEffect(() => {
    const anchors = document.querySelectorAll('.table-of-contents a')
    const ids = ['introduction']
    anchors.forEach((a) => {
      ids.push(a.hash.replace('#', ''))
    }, [])

    setTocLinks(ids)
  }, [toc])

  const { activeHash, setActiveHash } = useActiveHash(tocLinks)

  useEffect(() => {
    if (activeHash) {
      const anchors = document.querySelectorAll('.table-of-contents a')
      anchors.forEach((a) => {
        a.classList.remove('active')
      })
      const activeLink = document.querySelector(
        `.table-of-contents a[href$="${'#' + activeHash}"]`
      )

      if (activeLink) {
        activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        activeLink.classList.add('active')
      }
    }
  }, [activeHash])

  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-content">
        {thumbnail && (
          <div className="post-sidebar-thumbnail">
            <GatsbyImage
              image={thumbnail?.childImageSharp?.gatsbyImageData}
              alt="Thumbnail"
            />
          </div>
        )}

        <section className="post-sidebar-section">
          <h2>Published</h2>
          <div className="post-sidebar-offset">
            <p>{date}</p>
            <p>
              <a href="#comments">View Comments</a>
            </p>
          </div>
        </section>

        <section className="post-sidebar-section">
          <h2>Topics</h2>
          <div className="post-sidebar-offset">
            <div className="tags">
              {tags.map((tag) => {
                return (
                  <Link
                    key={tag}
                    to={`/topics/${slugify(tag)}`}
                    className="button small"
                    activeClassName="active"
                  >
                    {tag}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {toc && (
          <section className="post-sidebar-section">
            <h2>In This Article</h2>
            <nav className="table-of-contents">
              <ul>
                <li>
                  <a
                    href="#introduction"
                    onClick={() => setActiveHash('introduction')}
                  >
                    Introduction
                  </a>
                </li>
              </ul>
              <div dangerouslySetInnerHTML={{ __html: toc }} />
            </nav>
          </section>
        )}
      </div>
    </aside>
  )
}
