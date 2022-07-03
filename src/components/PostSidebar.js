import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { slugify } from '../utils/helpers'

export const PostSidebar = ({ tags, date, categories, thumbnail }) => {
  const category = categories.filter((category) => category !== 'Highlight')[0]

  return (
    <aside className="post-sidebar">
      {thumbnail && (
        <div className="post-image">
          <Img fixed={thumbnail.childImageSharp?.fixed} />
        </div>
      )}
      <div className="post-sidebar-card">
        <h2>Details</h2>
        <ul>
          <li>Written {date}</li>
        </ul>

        <h2>Category</h2>
        <ul>
          <li>
            <Link to={`/categories/${slugify(category)}`}>{category}</Link>
          </li>
        </ul>

        <h2>Tags</h2>
        <div className="tags">
          {tags.map((tag) => {
            return (
              <Link
                key={tag}
                to={`/tags/${slugify(tag)}`}
                className="tag"
                activeClassName="active"
              >
                {tag}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="post-sidebar-card">
        <h2>About me</h2>
        <p>
          Hello and thanks for visiting! My name is Tania Rascia, and this is my
          website and digital garden.
        </p>
        <p>
          I'm a software developer by day, and I've written hundreds of articles
          and tutorials about things that interest me in my spare time. This site is and has
          always been free of ads, trackers, social media, affiliates, sponsored
          posts, and all the other nonsense we're so used to seeing on the web.
        </p>
        <p>I hope you enjoy the post!</p>
      </div>
    </aside>
  )
}
