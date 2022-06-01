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

export default function CategoryTemplate({ data, pageContext }) {
  let { category } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message =
    totalCount === 1
      ? ' post found with the category:'
      : ' posts found with the category:'

  return (
    <>
      <Helmet title={`${category} | ${config.siteTitle}`} />
      <SEO />

      <header className="hero">
        <div className="top">
          <div className="hero-padding pattern">
            <div className="container">
              <div className="hero-prelude">
                <span className="highlight">{totalCount}</span> {message}
              </div>
              <h1>{category}</h1>
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

CategoryTemplate.Layout = Layout

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            tags
            categories
          }
        }
      }
    }
  }
`
