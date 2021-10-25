import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function NoteIndex({ data }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])

  return (
    <>
      <Helmet title={`Notes | ${config.siteTitle}`} />
      <SEO customDescription="Notes, musings, and whatever else I want to write." />

      <article className="blog-page">
        <header>
          <div className="container">
            <h1>Notes</h1>
            <p className="description">
              Notes, musings, and whatever else I want to write.
            </p>
          </div>
        </header>

        <section>
          <div className="container">
            <Posts data={simplifiedPosts} showYears prefix="notes" />
          </div>
        </section>
      </article>
    </>
  )
}

NoteIndex.Layout = Layout

export const pageQuery = graphql`
  query NotesQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "note" } } }
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
          }
        }
      }
    }
  }
`
