import React, { useMemo, useState, useCallback } from 'react'
import { Link } from 'gatsby'

import { useGetPosts } from '../utils/hooks/useGetPosts'
import { getSimplifiedPosts, getCategoriesFromPosts } from '../utils/helpers'
import { Caret } from '../assets/Caret'
import { File } from '../assets/File'

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState({})
  const data = useGetPosts()
  const posts = data.allMarkdownRemark.edges

  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const categories = useMemo(() => getCategoriesFromPosts(simplifiedPosts), [
    simplifiedPosts,
  ])

  const onToggleHeader = useCallback(
    (category) => {
      if (collapsed[category]) {
        setCollapsed((prevCollapsed) => ({
          ...prevCollapsed,
          [category]: false,
        }))
      } else {
        setCollapsed((prevCollapsed) => ({
          ...prevCollapsed,
          [category]: true,
        }))
      }
    },
    [collapsed]
  )

  return (
    <aside className="sidebar">
      <div className="title">Tania Rascia</div>

      {categories.map((category) => {
        return (
          <React.Fragment key={category}>
            <header onClick={() => onToggleHeader(category)}>
              <Caret position={collapsed[category] ? 'right' : 'down'} />
              <span>{category}</span>
            </header>

            <nav className={!collapsed[category] ? 'collapsed' : ''}>
              {simplifiedPosts
                .filter((post) => (post.categories || []).includes(category))
                .map((post) => {
                  return (
                    <Link key={post.title} to={post.slug}>
                      <File />
                      <span>{post.title}</span>
                    </Link>
                  )
                })}
            </nav>
          </React.Fragment>
        )
      })}
    </aside>
  )
}
