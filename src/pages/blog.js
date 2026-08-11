import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import { Search } from '../components/Search'
import { SEO } from '../components/SEO'
import { PageLayout } from '../components/PageLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import blog from '../assets/nav-blog.png'
import config from '../utils/config'

export default function Blog({ data }) {
  const posts = data.posts.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const title = 'Blog'

  const description = (
    <div>
      {'Guides, tutorials, and notes on code and life. '}
      <Link to="/topics">View all topics</Link>.
    </div>
  )

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />
      <PageLayout>
        <Hero title={title} description={description} hasSearch icon={blog} />

        <Search data={simplifiedPosts} section="blog" />
      </PageLayout>
    </>
  )
}

Blog.Layout = Layout

export const articlesQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
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
          }
        }
      }
    }
  }
`
