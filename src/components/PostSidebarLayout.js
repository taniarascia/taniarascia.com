import React from 'react'

import { PostSidebar } from './PostSidebar'

export const PostSidebarLayout = ({ children }) => {
  return (
    <section className="container page">
      <div className="grid">
        <div>{children}</div>
        <div>
          <PostSidebar />
        </div>
      </div>
    </section>
  )
}
