import React from 'react'
import { Link } from 'gatsby'

export const Heading = ({ title, description, slug }) => {
  return (
    <h2 className="home-heading">
      <div>
        <div className="title">{title}</div>
        {description && <div className="description">{description}</div>}
      </div>
      {slug && (
        <Link className="button" to={slug}>
          View all
        </Link>
      )}
    </h2>
  )
}
