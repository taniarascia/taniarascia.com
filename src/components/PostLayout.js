import React from 'react'

import { PostSidebar } from './PostSidebar'

export const PostLayout = ({ post, children }) => {
  const { tags, date, thumbnail } = post.frontmatter

  return (
    <>
      <main className="main-content">{children}</main>
      <PostSidebar
        thumbnail={thumbnail}
        date={date}
        tags={tags}
        toc={post.tableOfContents}
      />
    </>
  )
}
