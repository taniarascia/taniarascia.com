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

export default function TagTemplate({ data, pageContext }) {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = totalCount === 1 ? ' post tagged:' : ' posts tagged:'

  return (
    <div>
      <Helmet title={`Posts tagged: ${tag} | ${config.siteTitle}`} />
      <SEO />

      <SidebarLayout>
        <Hero highlight={totalCount} subTitle={message} title={tag} />
        <Posts data={simplifiedPosts} showYears />
      </SidebarLayout>
    </div>
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
