import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { PageLayout } from '../components/PageLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function Articles({ data }) {
  const posts = data.posts.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const title = 'Articles'
  const description =
    'Guides, references, and tutorials on programming, web development, and design.'

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <PageLayout>
        <Hero
          title={title}
          description={
            <>
              <div className="hero-description">{description}</div>
              <p>
                <Link to="/topics" className="button">
                  Explore Topics
                </Link>
              </p>
            </>
          }
        />

        <Posts data={simplifiedPosts} showYears />
      </PageLayout>
    </>
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
