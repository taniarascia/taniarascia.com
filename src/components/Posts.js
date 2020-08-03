import React from 'react'
import { Link } from 'gatsby'

import { slugify } from '../utils/helpers'

export default function Posts({ data, tags, includeDate }) {
  return (
    <div className={tags ? 'grid posts with-tags' : 'grid posts'}>
      {data.map((node) => {
        return (
          <Link to={node.slug} className="row" key={node.id}>
            <div className="cell">
              <div>{node.title}</div>
            </div>
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
          </Link>
        )
      })}
    </div>
  )
}
