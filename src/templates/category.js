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
        <div className="category-container">
          <Helmet title={`Posts in category "${category}" | ${config.siteTitle}`} />
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    )
  }
}

export default CategoryTemplate

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
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
            thumbnail
            date
          }
        }
      }
    }
  }
`
