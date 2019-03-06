import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

class Index extends Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges

    return (
      <Layout>
        <Helmet title={config.siteTitle} />
        <SEO />
        <div id="main-content">
          <div className="container">
            <PostListing postEdges={postEdges} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 2000, sort: { fields: [fields___date], order: DESC }) {
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
