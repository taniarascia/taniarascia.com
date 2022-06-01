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

      <header className="hero">
        <div className="top">
          <div className="hero-padding pattern">
            <div className="container">
              <div className="hero-prelude">Highest Quality</div>
              <h1>{title}</h1>
            </div>
          </div>
          <div className="lines vertical">
            <div className="line blue1" />
            <div className="line blue2" />
            <div className="line blue3" />
            <div className="line blue4" />
            <div className="line blue5" />
          </div>
        </div>
      </header>

      <section className="segment container page">
        <div className="grid">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
