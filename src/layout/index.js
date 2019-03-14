import React, { Component } from 'react'
import ThemeContext from '../context/ThemeContext'
import Helmet from 'react-helmet'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import favicon from '../images/favicon.png'
import '../styles/main.scss'

class MainLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <ThemeContext.Consumer>
        {theme => (
          <>
            <Helmet>
              <meta name="description" content={config.siteDescription} />
              <link rel="shortcut icon" type="image/png" href={favicon} />
            </Helmet>
            <section className={theme.dark ? 'dark' : '' || theme.notFound ? 'not-found' : ''}>
              <Navigation menuLinks={config.menuLinks} />
              <main id="main-content">{children}</main>
              <Footer />
            </section>
          </>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default MainLayout
