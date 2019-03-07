import React, { Component } from 'react'
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
      <>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <link rel="shortcut icon" type="image/png" href={favicon} />
        </Helmet>
        <Navigation menuLinks={config.menuLinks} />
        <main id="main-content">{children}</main>
        <Footer />
      </>
    )
  }
}

export default MainLayout
