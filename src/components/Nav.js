import React from 'react'
import { Link } from 'gatsby'

export default function Nav() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="flex">
          <div>
            <Link to="/" className="brand">
              <span className="emoji">💾</span> Tania Rascia
            </Link>
          </div>
          <div>
            <Link to="/blog">Writing</Link>
            <Link to="/guides">Guides</Link>
            <Link to="/me">About</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
