import React from 'react'
import { Link } from 'gatsby'

export const Heading = ({ title, slug, buttonText, icon, description }) => {
  return (
    <header className="heading">
      <div className="heading-row">
        <h2>
          {icon && <img src={icon} alt="Icon" className="heading-icon" />}
          <span>{title}</span>
        </h2>
        {slug && buttonText && (
          <Link to={slug} className="button secondary small">
            {buttonText}
          </Link>
        )}
      </div>
      {description && <div className="description">{description}</div>}
    </header>
  )
}
