import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import { isNewPost, getFormattedDate } from '../utils/helpers'

const highlightMatch = (text, query) => {
  if (!query) {
    return text
  }

  const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
  const highlightStart = text.search(re)

  if (highlightStart === -1) {
    return text
  }

  const highlightEnd = highlightStart + query.length

  return (
    <>
      {text.slice(0, highlightStart)}
      <strong className="searched">
        {text.slice(highlightStart, highlightEnd)}
      </strong>
      {text.slice(highlightEnd)}
    </>
  )
}

export const Post = ({ node, prefix, includeYear, query, detailed, number }) => {
  let formattedDate

  if (node.date) {
    if (!includeYear) {
      formattedDate = getFormattedDate(node.date, 1)
    } else {
      formattedDate = getFormattedDate(node.date)
    }
  }

  const newPost = useMemo(() => isNewPost(node.date), [node.date])

  const getTitle = (title, query) => <div>{highlightMatch(title, query)}</div>

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
          {node.date && <time>{formattedDate}</time>}
          {node.description && (
            <p className="post-description">{node.description}</p>
          )}
        </div>
        {node.tags && (
          <div className="post-tags">
            {node.tags.map((tag) => (
              <span className="tag" key={tag}>
                {highlightMatch(tag, query)}
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
        {number && <span className="post-number">{number}.</span>}
        {newPost && <div className="button x-small">✨ New</div>}{' '}
        {getTitle(node.title, query)}
      </div>
      <time>{formattedDate}</time>
    </Link>
  )
}
