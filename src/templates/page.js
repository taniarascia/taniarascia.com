import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO }  from '../components/SEO'
import config from '../utils/config'

export default function PageTemplate({ data }) {
  const post = data.markdownRemark

  return (
    <>
      <Helmet
        title={`${
          post.frontmatter.title === 'Tania Rascia'
            ? 'Resume'
            : post.frontmatter.title
        } | ${config.siteTitle}`}
      />
      <SEO />

      <article>
        <header>
          <div className="container">
            <h1>{post.frontmatter.title}</h1>
            <p className="description">{post.frontmatter.description}</p>
          </div>
        </header>

        <section>
          <div
            className="container"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>
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
      }
    }
  }
`
