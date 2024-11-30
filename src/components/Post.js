import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import { isNewPost, getFormattedDate } from '../utils/helpers'

export const Post = ({ node, prefix, newspaper }) => {
  let formattedDate

  if (node.date) {
    if (!newspaper) {
      formattedDate = getFormattedDate(node.date, 1)
    } else {
      formattedDate = getFormattedDate(node.date)
    }
  }

  const newPost = useMemo(() => isNewPost(node.date), [node.date])

  return (
    <Link
      to={prefix ? `/${prefix}${node.slug}` : node.slug}
      key={node.id}
      className="post"
    >
      <p>{node.title}</p>
      <time className={newPost ? 'new-post' : ''}>{formattedDate}</time>
    </Link>
  )
}
