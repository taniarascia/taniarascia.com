import React from 'react'
import { Img, Link } from 'gatsby'

const Navigation = ({ menuLinks }) => (
  <nav className="nav">
    <div className="nav-container">
      <div className="links">
        <Link to="/">Tania Rascia</Link>
        {menuLinks.map(link => (
          <Link to={link.link}>{link.name}</Link>
        ))}
      </div>
    </div>
  </nav>
)

export default Navigation
