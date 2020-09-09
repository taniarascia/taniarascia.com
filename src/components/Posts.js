import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import { slugify } from '../utils/helpers'

const Cell = ({ node, tags, withDate }) => {
  return (
    <div className={`row ${!withDate ? 'narrow' : ''}`} key={node.id}>
      <Link to={node.slug} className="cell">
        <div>
          {withDate && <time>{node.date}</time>}
          <div>{node.title}</div>
        </div>
      </Link>
      {tags && (
        <div className="cell tags">
          {node.tags &&
            node.tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${slugify(tag)}`}
                className={`tag-${tag}`}
              >
                {tag}
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}

export default function Posts({ data, tags, showYears, withDate }) {
  const postsByYear = {}

  data.forEach((post) => {
    const year = post.date.split(', ')[1]

    postsByYear[year] = [...(postsByYear[year] || []), post]
  })

  const years = useMemo(() => Object.keys(postsByYear).reverse(), [postsByYear])

  if (showYears) {
    return years.map((year) => (
      <section key={year}>
        <h2>{year}</h2>
        <div className={tags ? 'grid posts with-tags' : 'grid posts'}>
          {postsByYear[year].map((node) => (
            <Cell key={node.id} node={node} tags={tags} withDate={withDate} />
          ))}
        </div>
      </section>
    ))
  } else {
    return (
      <div className={tags ? 'grid posts with-tags' : 'grid posts'}>
        {data.map((node) => (
          <Cell key={node.id} node={node} tags={tags} withDate={withDate} />
        ))}
      </div>
    )
  }
}
