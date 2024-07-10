import React from 'react'

export const SidebarLayout = ({ children }) => {
  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">{children}</div>
      </div>
    </section>
  )
}
