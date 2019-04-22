import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import Contact from '../components/Contact'
import config from '../../data/SiteConfig'

export default class ContactPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`Contact – ${config.siteTitle}`} />
        <div className="container">
          <Contact />
        </div>
      </Layout>
    )
  }
}
