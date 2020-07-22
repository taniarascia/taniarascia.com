import React, { useState } from 'react'

export default function SearchForm({ posts, location, navigate }) {
  const [query, setQuery] = useState('')

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault()
        if (!query) return

        navigate(query ? `/blog/?search=${query}` : '')
      }}
    >
      <input
        id="search"
        type="search"
        placeholder="Try me..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />
      <button>🔍</button>
    </form>
  )
}
