import React from 'react'
import { Link } from 'gatsby'

import { slugify } from '../utils/helpers'
import { useGetTaxonomies } from '../utils/hooks/useGetTaxonomies'

export const PostSidebar = () => {
  const data = useGetTaxonomies()
  const categories = data.categories.group
  const tags = data.tags.group

  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card">
        <h2>Categories</h2>
        <div className="vertical-list">
          {categories
            .filter((category) => category.name !== 'Highlight')
            .map((category) => {
              return (
                <Link
                  key={category.name}
                  to={`/categories/${slugify(category.name)}`}
                  className="category"
                  activeClassName="active"
                >
                  <div className="name">{category.name}</div>
                  <div className="count">{category.totalCount}</div>
                </Link>
              )
            })}
        </div>
      </div>

      <div className="post-sidebar-card">
        <h2>Tags</h2>
        <div className="tags">
          {tags.map((tag) => {
            return (
              <Link
                key={tag.name}
                to={`/tags/${slugify(tag.name)}`}
                className="tag"
              >
                {tag.name}
              </Link>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
