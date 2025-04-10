import React from 'react'
import { Link } from 'gatsby'

export const Heading = ({ title, buttonText, description, slug }) => {
  return (
    <header className="heading">
      <h2>
        {title}
        {slug && (
          <Link className="small" to={slug}>
            {buttonText}
          </Link>
        )}
      </h2>
      {description && <div className="description">{description}</div>}
    </header>
  )
}
