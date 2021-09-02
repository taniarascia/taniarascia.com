import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Search } from '../components/Search'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function BlogIndex({ data }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])

  return (
    <>
      <Helmet title={`Blog | ${config.siteTitle}`} />
      <SEO customDescription="Articles, tutorials, snippets, musings, and everything else." />

      <article className="blog-page">
        <header>
          <div className="container">
            <h1>Blog</h1>
            <p className="description">
              Articles, tutorials, snippets, musings, notes, and everything
              else. The archive of everything I've written.
            </p>
          </div>
        </header>

        <section>
          <div className="container">
            <Search data={simplifiedPosts} showYears />
          </div>
        </section>
      </article>
    </>
  )
}

BlogIndex.Layout = Layout

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
          }
        }
      }
    }
  }
`
