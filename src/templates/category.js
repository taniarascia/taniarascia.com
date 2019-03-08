import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import config from '../../data/SiteConfig'

class CategoryTemplate extends Component {
  render() {
    const { category } = this.props.pageContext
    const postEdges = this.props.data.allMarkdownRemark.edges

    return (
      <Layout>
        <Helmet title={`Posts in category "${category}" | ${config.siteTitle}`} />
        <div className="container">
          <h1>Posts tagged as "{category}"</h1>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    )
  }
}

export default CategoryTemplate

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($categories: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: $categories } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
          }
        }
      }
    }
  }
`
