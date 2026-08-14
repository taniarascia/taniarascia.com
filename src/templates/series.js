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

export default function SeriesTemplate({ data, pageContext }) {
  const { series } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = ' part series'

  return (
    <>
      <Helmet title={`${series} | ${config.siteTitle}`} />
      <SEO />

      <PageLayout>
        <Hero
          highlight={totalCount}
          subTitle={message}
          title={series}
          type="taxonomy"
        />
        <Posts data={simplifiedPosts} includeYear />
      </PageLayout>
    </>
  )
}

SeriesTemplate.Layout = Layout

export const pageQuery = graphql`
  query SeriesPage($series: String) {
    allMarkdownRemark(
      sort: { frontmatter: { date: ASC } }
      filter: { frontmatter: { series: { eq: $series } } }
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
