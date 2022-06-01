import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { Hero } from '../components/Hero'
import { PostSidebarLayout } from '../components/PostSidebarLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function TagTemplate({ data, pageContext }) {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message =
    totalCount === 1 ? ' post found tagged:' : ' posts found tagged:'

  return (
    <>
      <Helmet title={`Posts tagged: ${tag} | ${config.siteTitle}`} />
      <SEO />

      <header className="hero">
        <div className="top">
          <div className="hero-padding pattern">
            <div className="container">
              <div className="hero-prelude">
                <span className="highlight">{totalCount}</span> {message}
              </div>
              <h1>{tag}</h1>
            </div>
          </div>
          <div className="lines vertical">
            <div className="line green1" />
            <div className="line green2" />
            <div className="line green3" />
            <div className="line green4" />
            <div className="line green5" />
          </div>
        </div>
      </header>

      <PostSidebarLayout>
        <Posts data={simplifiedPosts} />
      </PostSidebarLayout>
    </>
  )
}

TagTemplate.Layout = Layout

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
            tags
            categories
          }
        }
      }
    }
  }
`
