import React from 'react'
import { Link } from 'gatsby'

export const Hero = ({ prelude, title, description, hasBack, section }) => {
  return (
    <div className="container">
      <header className={`hero ${section}`}>
        {hasBack && (
          <Link to="/blog" className="prelude">
            &lt; Back
          </Link>
        )}
        {prelude && <div className="hero-prelude">{prelude}</div>}
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
    </div>
  )
}
