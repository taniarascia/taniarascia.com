import React from 'react'
import { Link } from 'gatsby'

export const Heading = ({
  title,
  buttonText,
  description,
  slug,
  textButton,
}) => {
  return (
    <header className="heading">
      <div>
        <h2>
          {title}
          {slug && textButton && <Link to={slug}>{buttonText}</Link>}
        </h2>
        {description && <div className="description">{description}</div>}
      </div>
      {slug && !textButton && (
        <Link className="button" to={slug}>
          {buttonText}
        </Link>
      )}
    </header>
  )
}
