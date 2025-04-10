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

export default function TopicTemplate({ data, pageContext }) {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = totalCount === 1 ? ' post' : ' posts'

  return (
    <>
      <Helmet title={`Topic: ${tag} | ${config.siteTitle}`} />
      <SEO />

      <PageLayout>
        <Hero
          highlight={totalCount}
          subTitle={message}
          title={tag}
          type="taxonomy"
          breadcrumb={{ value: '/topics', label: 'Topics' }}
        />
        <Posts data={simplifiedPosts} showYears />
      </PageLayout>
    </>
  )
}

TopicTemplate.Layout = Layout

export const pageQuery = graphql`
  query TopicPage($tag: String) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
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
