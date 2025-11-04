import React, { useState, useLayoutEffect, useEffect } from 'react'

import { useActiveHash } from '../utils/hooks/useActiveHash'

export const PostSidebar = ({ toc }) => {
  const [tocLinks, setTocLinks] = useState([])

  useLayoutEffect(() => {
    const margin = document.querySelector('.main-article').offsetTop
    document
      .querySelector('.post-sidebar')
      .setAttribute('style', `padding-top: ${margin - 24}px`)
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
        {toc && (
          <section className="post-sidebar-section">
            <div className="card post-sidebar-card">
              <h2>Table of Contents</h2>
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
            </div>
          </section>
        )}
      </div>
    </aside>
  )
}
