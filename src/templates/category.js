import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import SEO from '../components/SEO'

import { getSimplifiedPosts, slugify } from '../utils/helpers'
import config from '../utils/config'

export default function CategoryTemplate({ data, pageContext }) {
  let { cat } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = totalCount === 1 ? ' post found.' : ' posts found.'

  return (
    <Layout>
      <Helmet title={`Category: ${cat} | ${config.siteTitle}`} />
      <SEO />
      <header>
        <div className="container">
          <h1>Category: {cat}</h1>
          <p className="subtitle">
            <span className="count">{totalCount}</span>
            {message}
          </p>
        </div>
      </header>
      <section className="container">
        <Posts data={simplifiedPosts} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoryPage($cat: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { categories: { in: [$cat] } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            categories
          }
        }
      }
    }
  }
`
