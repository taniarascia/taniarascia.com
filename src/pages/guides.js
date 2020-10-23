import React, { useMemo } from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Guides from '../components/Guides'
import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function BlogIndex({ data }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(
    () => getSimplifiedPosts(posts, { thumbnails: true }),
    [posts]
  )

  return (
    <Layout>
      <Helmet title={`Guides | ${config.siteTitle}`} />
      <SEO />
      <header>
        <div className="container">
          <h1>Guides</h1>
          <p className="subtitle">
            The missing instruction manuals of the web.
          </p>
        </div>
      </header>
      <section>
        <div className="container guide-thumbnails">
          {simplifiedPosts.map((post) => (
            <Link to={post.slug} className="image-link" key={post.slug}>
              <Img fixed={post.thumbnail} />
              <span>{post.topic}</span>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <div className="container">
          <Guides data={simplifiedPosts} />
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GuidesQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: "Guides" } } }
    ) {
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
            topic
            thumbnail {
              childImageSharp {
                fixed(width: 100, height: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
