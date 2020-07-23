import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import config from '../utils/config'

export default function PageTemplate({ data }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO />
      <header>
        <div className="container">
          <h1>
            <u>{post.frontmatter.title}</u>
          </h1>
        </div>
      </header>
      <section>
        <div className="container page">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
