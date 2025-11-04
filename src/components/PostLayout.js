import React from 'react'

import { PostSidebar } from './PostSidebar'

export const PostLayout = ({ post, children }) => {
  const toc = post.tableOfContents

  return (
    <>
      <main className="main-content">{children}</main>
      {toc && <PostSidebar toc={toc} />}
    </>
  )
}
