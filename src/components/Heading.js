import React from 'react'
import { Link } from 'gatsby'

export const Heading = ({ title, buttonText, description, slug }) => {
  return (
    <heading className="heading">
      <div>
        <h2>{title}</h2>
        {description && <div className="description">{description}</div>}
      </div>
      {slug && (
        <Link className="button" to={slug}>
          {buttonText}
        </Link>
      )}
    </heading>
  )
}
