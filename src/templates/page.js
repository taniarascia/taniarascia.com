import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'

export default function PageTemplate({ data }) {
  const post = data.markdownRemark
  const { title, description, slug } = post.frontmatter

  return (
    <>
      <Helmet
        title={`${title === 'Tania Rascia' ? 'Resume' : title} | ${
          config.siteTitle
        }`}
      />
      <SEO />

      <article id={slug}>
        <header>
          <div className="container" style={{ paddingBottom: 0 }}>
            <h1>{title}</h1>
            <p className="description">{description}</p>
          </div>
        </header>

        <section
          className="container"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
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
