import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import SimpleListing from '../components/SimpleListing'
import config from '../../data/SiteConfig'
import publications from '../../data/publications'

class PublicationsPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`Published Articles – ${config.siteTitle}`} />
        <div className="container">
          <h1>Published Articles</h1>
          <SimpleListing data={publications} />
        </div>
      </Layout>
    )
  }
}

export default PublicationsPage
