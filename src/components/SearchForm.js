import React, { useState } from 'react'

export default function SearchForm({ posts, location, navigate }) {
  const [query, setQuery] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!query) return

        navigate(query ? `/blog/?search=${query}` : '')
      }}
    >
      <input
        id="search"
        type="search"
        placeholder="Search all posts..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />
    </form>
  )
}
