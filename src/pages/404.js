import React from 'react'
import { Link } from 'gatsby'
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
      <SEO customTitle="404" customDescription="Page not found." />

      <PageLayout>
        <Hero title="404" description="Not found." />
        <div className="page-article">
          <p>
            Whatever was here isn't here anymore (or never was). You can browse
            everything I've written in the <Link to="/blog">blog archive</Link>,
            find something by subject on the <Link to="/topics">topics</Link>{' '}
            page, or start over at the <Link to="/">homepage</Link>.
          </p>
        </div>
      </PageLayout>
    </>
  )
}

FourOhFour.Layout = Layout
