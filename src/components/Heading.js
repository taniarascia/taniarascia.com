import React from 'react'
import { Link } from 'gatsby'

export const Heading = ({ title, buttonText, description, slug }) => {
  return (
    <h2 className="home-heading">
      <div>
        <div className="title">{title}</div>
        {description && <div className="description">{description}</div>}
      </div>
      {slug && (
        <Link className="button" to={slug}>
          {buttonText}
        </Link>
      )}
    </h2>
  )
}
