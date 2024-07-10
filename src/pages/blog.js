import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { SidebarLayout } from '../components/SidebarLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function Articles({ data }) {
  const posts = data.posts.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const title = 'Articles'
  const description =
    'Guides, references, and tutorials on programming, web development, and design.'

  return (
    <div>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <SidebarLayout>
        <Hero
          title={title}
          description={
            <>
              <p>{description}</p>
              <p>
                <Link to="/tags" className="button small">
                  View All Tags
                </Link>
              </p>
            </>
          }
        />

        <Posts data={simplifiedPosts} showYears />
      </SidebarLayout>
    </div>
  )
}

Articles.Layout = Layout

export const articlesQuery = graphql`
  query ArticlesQuery {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Technical" }
        }
      }
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
            # tags
            # categories
          }
        }
      }
    }
  }
`
