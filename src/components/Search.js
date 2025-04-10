import React, { useState, useRef } from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'
import queryString from 'query-string'
import { useLocation } from '@reach/router'

import searchIcon from '../assets/nav-search.png'
import { Posts } from './Posts'

export const Search = ({ data, section }) => {
  const location = useLocation()
  const searchRef = useRef(null)
  const { search } = queryString.parse(location.search)
  const [query, setQuery] = useState(search || '')
  const { localSearchPages } = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `)

  const results = useFlexSearch(
    query,
    localSearchPages.index,
    localSearchPages.store
  )

  return (
    <>
      <div className="search-container">
        <input
          ref={searchRef}
          id="search"
          type="search"
          className="searchbar"
          placeholder="Search posts..."
          value={query}
          autoComplete="off"
          onChange={(event) => {
            const updatedValue = event.target.value
              ? `/${section}/?search=${event.target.value}`
              : ''

            navigate(updatedValue)

            setQuery(event.target.value)
          }}
        />
        <img
          className="search-icon"
          src={searchIcon}
          alt="Search"
          onClick={() => searchRef.current.focus()}
        />
      </div>
      <section>
        {query ? (
          results.length > 0 ? (
            <Posts data={results} showYears query={query} />
          ) : (
            <p style={{ marginTop: '2rem' }}>
              Sorry, nothing matched that search.
            </p>
          )
        ) : (
          <Posts data={data} showYears />
        )}
      </section>
    </>
  )
}
