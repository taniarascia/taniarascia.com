import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { AboutSidebar } from '../components/AboutSidebar'
import config from '../utils/config'

export default function PageTemplate({ data }) {
  const post = data.markdownRemark
  const { title, description } = post.frontmatter

  return (
    <div>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />
      <div className="container">
        <div className="grid">
          <div className="article-content">
            <div className="hero">
              <h1>{title}</h1>
            </div>
            <section className="segment small">
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </section>
          </div>

          <AboutSidebar />
        </div>
      </div>
    </div>
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
