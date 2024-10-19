import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import { isNewPost, getFormattedDate } from '../utils/helpers'

export const Post = ({ node, prefix, newspaper }) => {
  let formattedDate

  if (node.date) {
    if (!newspaper) {
      const dateArr = node.date.split(' ')
      dateArr.pop()

      dateArr[0] = dateArr[0].slice(0, 3)
      formattedDate = dateArr.join(' ').slice(0, -1)
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
      <h3>{node.title}</h3>
      <time className={newPost ? 'new-post' : ''}>
        {formattedDate} {newPost && <div className="new-post-pill">New!</div>}
      </time>
    </Link>
  )
}
