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
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />
      <div className="container">
        <Hero title={title} />
      </div>

      <section className="small segment container">
        <div
          className="post-content medium width"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
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
        slug
      }
    }
  }
`
