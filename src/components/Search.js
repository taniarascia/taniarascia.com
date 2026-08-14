import React, { useState } from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'
import queryString from 'query-string'
import { useLocation } from '@reach/router'

import { Searchbar } from './Searchbar'

import { Posts } from './Posts'
import blog from '../assets/nav-blog.png'

export const Search = ({ data, section, detailed }) => {
  const location = useLocation()

  const { search } = queryString.parse(location.search)
  const [query, setQuery] = useState(search || '')
  const staticData = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
      js: file(
        relativePath: { eq: "thumbnails/js.png" }
        sourceInstanceName: { eq: "posts" }
      ) {
        publicURL
      }
      react: file(
        relativePath: { eq: "thumbnails/react.png" }
        sourceInstanceName: { eq: "posts" }
      ) {
        publicURL
      }
      css: file(
        relativePath: { eq: "thumbnails/css-new.png" }
        sourceInstanceName: { eq: "posts" }
      ) {
        publicURL
      }
      php: file(
        relativePath: { eq: "thumbnails/php.png" }
        sourceInstanceName: { eq: "posts" }
      ) {
        publicURL
      }
      node: file(
        relativePath: { eq: "thumbnails/node.png" }
        sourceInstanceName: { eq: "posts" }
      ) {
        publicURL
      }
      snake: file(
        relativePath: { eq: "thumbnails/blinky.png" }
        sourceInstanceName: { eq: "posts" }
      ) {
        publicURL
      }
    }
  `)
  const { localSearchPages } = staticData

  const quickFilters = [
    { tag: 'javascript', label: 'JavaScript', image: staticData.js?.publicURL },
    { tag: 'react', label: 'React', image: staticData.react?.publicURL },
    { tag: 'css', label: 'CSS', image: staticData.css?.publicURL },
    { tag: 'php', label: 'PHP', image: staticData.php?.publicURL },
    { tag: 'node', label: 'Node', image: staticData.node?.publicURL },
    { tag: 'games', label: 'Games', image: staticData.snake?.publicURL },
    { tag: 'life', label: 'Life', image: blog },
  ]

  const handleQuickFilter = (tag) => {
    const next = query === tag ? '' : tag

    navigate(next ? `/${section}/?search=${next}` : `/${section}/`)

    setQuery(next)
  }

  const results = useFlexSearch(
    query,
    localSearchPages.index,
    localSearchPages.store
  )

  return (
    <>
      <div className="quick-filters">
        {quickFilters.map(({ tag, label, image }) => (
          <div className="tooltip-container tooltip-above" key={tag}>
            <button
              type="button"
              aria-label={`Filter posts by ${label}`}
              className={`quick-filter ${query === tag ? 'active' : ''}`}
              onClick={() => handleQuickFilter(tag)}
            >
              <img src={image} alt="" width="22" height="22" />
            </button>
            <div className="tooltip">{label}</div>
          </div>
        ))}
      </div>
      <Searchbar
        count={data.length}
        query={query}
        handleSearch={(event) => {
          const updatedValue = event.target.value
            ? `/${section}/?search=${event.target.value}`
            : ''

          navigate(updatedValue)

          setQuery(event.target.value)
        }}
        style={{ marginBottom: '2.5rem' }}
      />
      <section>
        {query ? (
          results.length > 0 ? (
            <Posts data={results} showYears query={query} detailed={detailed} />
          ) : (
            <p style={{ marginTop: '2rem' }}>
              Sorry, nothing matched that search.
            </p>
          )
        ) : (
          <Posts data={data} showYears detailed={detailed} />
        )}
      </section>
    </>
  )
}
