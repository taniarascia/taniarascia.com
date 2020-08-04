import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import { slugify } from '../utils/helpers'

export default function Posts({ data, tags, showYears }) {
  const postsByYear = {}

  data.forEach((post) => {
    const year = post.date.split(', ')[1]

    postsByYear[year] = [...(postsByYear[year] || []), post]
  })

  const years = useMemo(() => Object.keys(postsByYear).reverse(), [postsByYear])

  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children

  return years.map((year) => {
    const posts = postsByYear[year]

    return (
      <ConditionalWrapper
        key={year}
        condition={showYears}
        wrapper={(children) => (
          <section>
            <h2>{year}</h2>
            {children}
          </section>
        )}
      >
        <div className={tags ? 'grid posts with-tags' : 'grid posts'}>
          {posts.map((node) => (
            <div className="row" key={node.id}>
              <Link to={node.slug} className="cell">
                <div>{node.title}</div>
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
          ))}
        </div>
      </ConditionalWrapper>
    )
  })
}
