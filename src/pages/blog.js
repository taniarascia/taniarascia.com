import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { SidebarLayout } from '../components/SidebarLayout'
import { Hero } from '../components/Hero'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function Blog({ data }) {
  const posts = data.posts.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const title = 'Writing'
  const description = 'Notes & tutorials'

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />
      <Hero subTitle={description} title={title} color="green" />

      <SidebarLayout>
        <Posts data={simplifiedPosts} showYears />
      </SidebarLayout>
    </>
  )
}

Blog.Layout = Layout

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
