import React from 'react'
import { Link } from 'gatsby'
import floppy from '../images/floppy.svg'

const Navigation = ({ menuLinks }) => (
  <nav className="nav">
    <div className="nav-container">
      <div className="brand">
        <Link to="/">
          <img src={floppy} className="favicon" /> Tania Rascia
        </Link>
      </div>
      <div className="links">
        {menuLinks.map(link => (
          <Link to={link.link}>{link.name}</Link>
        ))}
        <a href="https://ko-fi.com/taniarascia" target="_blank">
          Donate
        </a>
      </div>
    </div>
  </nav>
)

export default Navigation
