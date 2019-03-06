import React from 'react'
import { Link } from 'gatsby'

const Navigation = ({ menuLinks }) => (
  <nav className="nav">
    <div className="nav-container">
      <div className="brand">
        <Link to="/">Tania Rascia</Link>
      </div>
      <div className="links">
        {menuLinks.map(link => (
          <Link to={link.link}>{link.name}</Link>
        ))}
      </div>
      <div className="social">
        <a className="nav-icon" id="night-mode">
          <i className="fas fa-moon" />
        </a>
        <a href="https://twitter.com/taniarascia" className="nav-icon" target="_blank">
          <i className="fab fa-twitter" />
        </a>
        <a href="https://github.com/taniarascia" className="nav-icon" target="_blank">
          <i className="fab fa-github" />
        </a>
        <a href="https://ko-fi.com/taniarascia" className="nav-icon" target="_blank">
          <span className="yellow">
            <i className="fas fa-coffee" />
          </span>
        </a>
      </div>
    </div>
  </nav>
)

export default Navigation
