import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
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

      <PageLayout>
        <Hero
          highlight={totalCount}
          subTitle={message}
          title={category}
          type="taxonomy"
        />
        <Posts data={simplifiedPosts} showYears />
      </PageLayout>
    </>
  )
}

CategoryTemplate.Layout = Layout

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
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
