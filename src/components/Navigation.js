import React, { Component } from 'react'
import { Link } from 'gatsby'
import floppy from '../images/floppy.svg'

class Navigation extends Component {
  state = {
    scrolled: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', event => {
      if (window.scrollY > 20) {
        this.setState({ scrolled: true })
      } else {
        this.setState({ scrolled: false })
      }
    })
  }

  render() {
    const { scrolled } = this.state
    const { menuLinks } = this.props

    return (
      <nav className={scrolled ? 'nav scroll' : 'nav'}>
        <div className="nav-container">
          <div className="brand">
            <Link to="/">
              <img src={floppy} className="favicon" /> <span className="text">Tania Rascia</span>
            </Link>
          </div>
          <div className="links">
            {menuLinks.map(link => (
              <Link key={link.name} to={link.link}>
                {link.name}
              </Link>
            ))}
            <a className="donate-button" href="https://ko-fi.com/taniarascia" target="_blank">
              <span className="text">Donate</span> <span className="emoji">☕</span>
            </a>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation
