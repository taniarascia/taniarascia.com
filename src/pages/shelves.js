import React from 'react'
import Helmet from 'react-helmet'

import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import { Shelves } from '../components/Shelves'
import { SEO } from '../components/SEO'
import { PageLayout } from '../components/PageLayout'
import search from '../assets/nav-search.png'
import config from '../utils/config'

export default function ShelvesPage() {
  const title = 'Shelves'
  const description = 'A curated list of tutorials, references, and deep dives.'

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customTitle={title} customDescription={description} />

      <PageLayout>
        <Hero title={title} description={description} icon={search} />
        <Shelves />
      </PageLayout>
    </>
  )
}

ShelvesPage.Layout = Layout
