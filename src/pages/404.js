import React from 'react'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { PageLayout } from '../components/PageLayout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import config from '../utils/config'

export default function FourOhFour() {
  return (
    <div>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <SEO />
      <PageLayout>
        <div className="container">
          <Hero title="404" description="Not found." />
        </div>
      </PageLayout>
    </div>
  )
}

FourOhFour.Layout = Layout
