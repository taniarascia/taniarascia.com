import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import Newsletter from '../components/Newsletter'
import config from '../../data/SiteConfig'

class NewsletterPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`Newsletter – ${config.siteTitle}`} />
        <div className="container">
          <Newsletter />
        </div>
      </Layout>
    )
  }
}

export default NewsletterPage
