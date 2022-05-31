import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import config from '../utils/config'

export default function PageTemplate({ data }) {
  const post = data.markdownRemark
  const { title, description } = post.frontmatter

  return (
    <>
      <Helmet
        title={`${title === 'Tania Rascia' ? 'Resume' : title} | ${
          config.siteTitle
        }`}
      />
      <SEO />

      <Hero title={title} description={description} />

      <section className="segment container page">
        <div className="grid">
          <div
            dangerouslySetInnerHTML={{ __html: post.html }}
            style={{ marginTop: '3rem' }}
          />
        </div>
      </section>
    </>
  )
}

PageTemplate.Layout = Layout

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        slug
      }
    }
  }
`
