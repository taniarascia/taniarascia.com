import React from 'react'

import { PostSidebar } from './PostSidebar'

export const PostLayout = ({ post, children }) => {
  const { tags, date, thumbnail } = post.frontmatter
  const toc = post.tableOfContents

  return (
    <>
      <main className="main-content">{children}</main>
      <PostSidebar thumbnail={thumbnail} date={date} tags={tags} toc={toc} />
    </>
  )
}
