import React, { useMemo, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'

import { useGetPosts } from '../utils/hooks/useGetPosts'
import { getSimplifiedPosts, getCategoriesFromPosts } from '../utils/helpers'
import { Caret } from '../assets/Caret'
import { File } from '../assets/File'

export const Sidebar = ({ setCollapsed }) => {
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState({})
  const data = useGetPosts()
  const posts = data.allMarkdownRemark.edges

  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const categories = useMemo(
    () => getCategoriesFromPosts(simplifiedPosts),
    [simplifiedPosts]
  )

  const onToggleHeader = (category) => {
    if (dropdownOpen[category]) {
      setDropdownOpen((prev) => ({
        ...prev,
        [category]: false,
      }))
    } else {
      setDropdownOpen((prev) => ({
        ...prev,
        [category]: true,
      }))
    }
  }

  useEffect(() => {
    const currentPost = simplifiedPosts.find(
      (post) => post.slug === location.pathname
    )

    if (currentPost?.categories) {
      const categories = currentPost.categories.reduce(
        (acc, val) => ({ ...acc, [val]: true }),
        {}
      )

      setDropdownOpen((prev) => ({ ...prev, ...categories }))
    }
  }, [simplifiedPosts, location])

  return (
    <aside className="sidebar">
      <div className="categories">
        {categories.map((category) => {
          return (
            <React.Fragment key={category}>
              <button
                className="category"
                onClick={() => onToggleHeader(category)}
              >
                <Caret position={dropdownOpen[category] ? 'down' : 'right'} />
                <span>{category}</span>
              </button>

              <nav className={!dropdownOpen[category] ? 'collapsed' : ''}>
                {simplifiedPosts
                  .filter((post) => (post.categories || []).includes(category))
                  .map((post) => {
                    return (
                      <Link
                        key={post.title}
                        to={post.slug}
                        activeClassName="active"
                        onClick={() => setCollapsed(true)}
                      >
                        <File />
                        <span>{post.title}</span>
                      </Link>
                    )
                  })}
              </nav>
            </React.Fragment>
          )
        })}
      </div>
    </aside>
  )
}
