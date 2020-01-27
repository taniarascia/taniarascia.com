import React, { Component } from 'react'
import { Link } from 'gatsby'
import floppy from '../images/floppy.png'
import sun from '../images/sun.svg'
import moon from '../images/moon.svg'
import ThemeContext from '../context/ThemeContext'

export default class Navigation extends Component {
  static contextType = ThemeContext // eslint-disable-line

  state = {
    scrolled: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.navOnScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.navOnScroll)
  }

  navOnScroll = () => {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  }

  render() {
    const { scrolled } = this.state
    const { menuLinks } = this.props
    const theme = this.context

    return (
      <nav className={scrolled ? 'nav scroll' : 'nav'}>
        <div className="nav-container">
          <div className="brand">
            <Link to="/">
              <img src={floppy} className="favicon" alt="Floppy Diskette" />
              <span className="text">Tania Rascia</span>
            </Link>
          </div>
          <div className="links">
            {menuLinks.map(link => (
              <Link key={link.name} to={link.link} activeClassName="active">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="cta">
            <button
              className="dark-switcher"
              onClick={theme.toggleDark}
              aria-label="Toggle Dark Mode."
              title="Toggle Dark Mode"
            >
              {theme.dark ? (
                <img src={sun} className="theme-icon" alt="Light Mode" />
              ) : (
                <img src={moon} className="theme-icon" alt="Dark Mode" />
              )}
            </button>
          </div>
        </div>
      </nav>
    )
  }
}
