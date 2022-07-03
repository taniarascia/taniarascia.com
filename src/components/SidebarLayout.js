import React from 'react'

import { BlogSidebar } from './BlogSidebar'

export const SidebarLayout = ({ children }) => {
  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">{children}</div>
        <div className="sidebar-content">
          <BlogSidebar />
        </div>
      </div>
    </section>
  )
}
