import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { Hero } from '../components/Hero'
import { SidebarLayout } from '../components/SidebarLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function CategoryTemplate({ data, pageContext }) {
  let { category } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message =
    totalCount === 1 ? ' post categorized as:' : ' posts categorized as:'

  return (
    <>
      <Helmet title={`${category} | ${config.siteTitle}`} />
      <SEO />

      <SidebarLayout>
        <Hero highlight={totalCount} subTitle={message} title={category} />
        <Posts data={simplifiedPosts} />
      </SidebarLayout>
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
