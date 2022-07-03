import React from 'react'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import config from '../utils/config'

export default function FourOhFour() {
  return (
    <div>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <SEO />
      <div className="container">
        <Hero title="404">
          <p className="hero-description">Not found.</p>
        </Hero>
      </div>
    </div>
  )
}

FourOhFour.Layout = Layout
