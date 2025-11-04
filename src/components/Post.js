import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import { isNewPost, getFormattedDate } from '../utils/helpers'

export const Post = ({ node, prefix, newspaper, query }) => {
  let formattedDate

  if (node.date) {
    if (!newspaper) {
      formattedDate = getFormattedDate(node.date, 1)
    } else {
      formattedDate = getFormattedDate(node.date)
    }
  }

  const newPost = useMemo(() => isNewPost(node.date), [node.date])

  const getTitle = (title, query) => {
    if (query) {
      const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      const highlightStart = title.search(re)

      if (highlightStart !== -1) {
        const highlightEnd = highlightStart + query.length

        return (
          <div>
            {title.slice(0, highlightStart)}
            <strong className="searched">
              {title.slice(highlightStart, highlightEnd)}
            </strong>
            {title.slice(highlightEnd)}
          </div>
        )
      }
      return <div>{title}</div>
    }
    return <div>{title}</div>
  }

  return (
    <Link
      to={prefix ? `/${prefix}${node.slug}` : node.slug}
      key={node.id}
      className="post"
    >
      {!newspaper && <time>{formattedDate}</time>}
      <div>
        {newPost && <div className="button x-small">✨ New</div>}{' '}
        {getTitle(node.title, query)}
      </div>
    </Link>
  )
}
