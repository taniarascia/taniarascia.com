import React from 'react'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import config from '../utils/config'

export default function FourOhFour() {
  return (
    <>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <SEO />
      <Hero title="404">
        <p className="hero-description">Not found.</p>
      </Hero>
    </>
  )
}

FourOhFour.Layout = Layout
