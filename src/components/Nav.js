import React from 'react'
import { Link } from 'gatsby'

export default function Nav() {
  return (
    <nav className="navbar">
      <div className="container flex">
        <div>
          <Link to="/" className="brand">
            <span className="emoji">💾</span> Tania Rascia
          </Link>
        </div>
        <div>
          <Link to="/me">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/guides">Guides</Link>
        </div>
      </div>
    </nav>
  )
}
