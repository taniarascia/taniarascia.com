import React, { useMemo } from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Guides from '../components/Guides'
import SEO from '../components/SEO'
import { getSimplifiedPosts, slugify } from '../utils/helpers'
import config from '../utils/config'

export default function GuidesIndex({ data }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(
    () => getSimplifiedPosts(posts, { thumbnails: true }),
    [posts]
  )

  const categories = useMemo(
    () =>
      posts.reduce((acc, val) => {
        const currentCategories = val.node.frontmatter.categories
        if (!acc.some((category) => category.includes(currentCategories))) {
          return [
            ...acc,
            ...currentCategories.filter(
              (c) => !acc.includes(c) && c !== 'Guides'
            ),
          ]
        }
        return acc
      }, []),
    [posts]
  )

  return (
    <Layout>
      <Helmet title={`Guides | ${config.siteTitle}`} />
      <SEO />
      <header>
        <div className="container">
          <h1>Guides.</h1>
          <p className="subtitle">
            The missing instruction manuals of the web. Long form articles,
            guides, tutorials, and references about programming and design.
          </p>
          <div className="categories">
            {categories.map((category) => (
              <Link to={`/categories/${slugify(category)}`} className="button">
                {category}
              </Link>
            ))}
          </div>
        </div>
      </header>
      <div className="container">
        <Guides data={simplifiedPosts} includeTime />
      </div>
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
            categories
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
