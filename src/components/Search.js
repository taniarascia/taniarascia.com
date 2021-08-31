import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'
import * as queryString from 'query-string'
import { useLocation, navigate } from '@reach/router'

import searchIcon from '../assets/nav-search.png'
import Posts from './Posts'

export const Search = ({ data }) => {
  const location = useLocation()
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
      <div className="searchbar">
        <input
          id="search"
          type="search"
          placeholder="Search for..."
          value={query}
          onChange={(e) => {
            navigate(e.target.value ? `/blog/?search=${e.target.value}` : '')
            setQuery(e.target.value)
          }}
        />
        <img src={searchIcon} alt="Search" />
      </div>
      <section>
        {query ? (
          results.length > 0 ? (
            <Posts data={results} showYears />
          ) : (
            <p style={{ marginTop: '1rem' }}>
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
