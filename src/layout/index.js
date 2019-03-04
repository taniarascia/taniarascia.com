import React, { Component } from 'react'
import Helmet from 'react-helmet'
import config from '../../data/SiteConfig'

class MainLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        {children}
      </div>
    )
  }
}

export default MainLayout
