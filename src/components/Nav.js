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
          <div className="flex">
            <Link to="/me">
              <span className="emoji">❤️</span> About
            </Link>
            <Link to="/blog">
              <span className="emoji">📝</span> Blog
            </Link>
            <Link to="/guides">
              <span className="emoji">📘</span> Guides
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
