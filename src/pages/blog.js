import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { PostSidebarLayout } from '../components/PostSidebarLayout'
import { Hero } from '../components/Hero'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function BlogIndex({ data }) {
  const posts = data.posts.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const title = 'Writing'
  const description = 'Lorem'

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <header className="hero">
        <div className="top">
          <div className="hero-padding pattern">
            <div className="container">
              <div className="hero-prelude">Notes and tutorials</div>
              <h1>Writing</h1>
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
        <Posts data={simplifiedPosts} showYears />
      </PostSidebarLayout>
    </>
  )
}

BlogIndex.Layout = Layout

export const blogQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
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
