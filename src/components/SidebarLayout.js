import React from 'react'

import { BlogSidebar } from './BlogSidebar'

export const SidebarLayout = ({ children }) => {
  return (
    <section className="container markdown-content">
      <div className="grid">
        <div>{children}</div>
        <div>
          <BlogSidebar />
        </div>
      </div>
    </section>
  )
}
