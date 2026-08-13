import React from 'react'
import { Link } from 'gatsby'

export const AuthorCard = () => {
  return (
    <aside className="author-card">
      <img src="/ram.png" alt="" width="80" height="80" />
      <p>
        Hey! I'm Tania, the software engineer tending to this digital garden.
        You can read <Link to="/me">more about me</Link>, or subscribe by{' '}
        <a
          href="https://taniarascia.substack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          email
        </a>
        .
      </p>
    </aside>
  )
}
