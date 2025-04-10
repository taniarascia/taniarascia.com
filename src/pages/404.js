import React from 'react'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { PageLayout } from '../components/PageLayout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import config from '../utils/config'

export default function FourOhFour() {
  return (
    <>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <SEO />

      <PageLayout>
        <Hero title="404" description="Not found." />
      </PageLayout>
    </>
  )
}

FourOhFour.Layout = Layout
