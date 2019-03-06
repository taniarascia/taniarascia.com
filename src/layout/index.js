import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Navigation from '../components/Navigation'
import config from '../../data/SiteConfig'
import '../styles/main.scss'

class MainLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Navigation menuLinks={config.menuLinks} />
        {children}
      </div>
    )
  }
}

export default MainLayout
