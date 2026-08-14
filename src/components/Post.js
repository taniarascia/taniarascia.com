import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import { isNewPost, getFormattedDate } from '../utils/helpers'

export const Post = ({ node, prefix, includeYear, query, detailed }) => {
  let formattedDate

  if (node.date) {
    if (!includeYear) {
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

  if (detailed) {
    return (
      <Link
        to={prefix ? `/${prefix}${node.slug}` : node.slug}
        key={node.id}
        className="post detailed"
      >
        <div className="post-thumbnail">
          {node.thumbnail && <img src={node.thumbnail} alt="" />}
        </div>
        <div className="post-info">
          <div className="post-title">
            {getTitle(node.title, query)}
            {newPost && <div className="button x-small">✨ New</div>}
          </div>
          <time>{formattedDate}</time>
        </div>
        {node.tags && (
          <div className="post-tags">
            {node.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    )
  }

  return (
    <Link
      to={prefix ? `/${prefix}${node.slug}` : node.slug}
      key={node.id}
      className="post"
    >
      <div>
        {newPost && <div className="button x-small">✨ New</div>}{' '}
        {getTitle(node.title, query)}
      </div>
      <time>{formattedDate}</time>
    </Link>
  )
}
