import React, { Component } from 'react'
import { Link } from 'gatsby'
import floppy from '../images/floppy.svg'
import sun from '../images/sun.svg'
import moon from '../images/moon.svg'
import coffee from '../images/coffee.svg'
import ThemeContext from '../context/ThemeContext'

class Navigation extends Component {
  state = {
    scrolled: false,
  }

  navOnScroll = () => {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.navOnScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.navOnScroll)
  }

  render() {
    const { scrolled } = this.state
    const { menuLinks } = this.props

    return (
      <ThemeContext.Consumer>
        {theme => (
          <nav className={scrolled ? 'nav scroll' : 'nav'}>
            <div className="nav-container">
              <div className="brand">
                <Link to="/">
                  <img src={floppy} className="favicon" />{' '}
                  <span className="text">Tania Rascia</span>
                </Link>
              </div>
              <div className="links">
                {menuLinks.map(link => (
                  <Link key={link.name} to={link.link}>
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="cta">
                <button className="dark-switcher" onClick={theme.toggleDark}>
                  {theme.dark ? (
                    <span>
                      <img src={sun} className="theme-icon" />
                    </span>
                  ) : (
                    <span>
                      <img src={moon} className="theme-icon" />
                    </span>
                  )}
                </button>
                <a className="donate-button" href="https://ko-fi.com/taniarascia" target="_blank">
                  <span className="text">Donate</span> <img src={coffee} className="coffee-icon" />
                </a>
              </div>
            </div>
          </nav>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default Navigation
