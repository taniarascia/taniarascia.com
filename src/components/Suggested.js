import React from 'react'
import { Link } from 'gatsby'

export default function Suggested({ previous, next }) {
  return (
    <nav className="flex container suggested">
      {previous && (
        <Link to={previous.fields.slug} rel="prev">
          {previous.frontmatter.title}
        </Link>
      )}
      {next && (
        <Link to={next.fields.slug} rel="next">
          {next.frontmatter.title}
        </Link>
      )}
    </nav>
  )
}
