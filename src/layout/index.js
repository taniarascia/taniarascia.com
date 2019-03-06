import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import '../styles/main.scss'

class MainLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Navigation menuLinks={config.menuLinks} />
        <main id="main-content">{children}</main>
        <Footer />
      </>
    )
  }
}

export default MainLayout
