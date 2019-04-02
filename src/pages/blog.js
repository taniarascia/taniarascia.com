import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import kebabCase from 'lodash.kebabcase'
import _ from 'lodash'

class BlogPage extends Component {
  state = {
    searchTerm: '',
    posts: this.props.data.posts.edges,
    filteredPosts: this.props.data.posts.edges,
  }

  handleChange = event => {
    this.setState({ searchTerm: event.target.value })
    this.filterPosts(event.target.value)
  }

  filterPosts = searchTerm => {
    const { posts } = this.state

    const filteredPosts = posts.filter(post =>
      post.node.frontmatter.title.toLowerCase().includes(searchTerm)
    )

    this.setState({ filteredPosts })
  }

  render() {
    const { filteredPosts, searchTerm } = this.state
    const categories = this.props.data.categories.group.filter(
      category => category.fieldValue !== 'Popular'
    )

    return (
      <Layout>
        <Helmet title={`Articles – ${config.siteTitle}`} />
        <SEO />
        <div className="container">
          <h1>Articles</h1>
          <div className="tag-container articles-page-tags">
            {categories.map(category => (
              <Link to={`/categories/${kebabCase(category.fieldValue)}`} key={category.fieldValue}>
                <span key={category.fieldValue}>
                  {category.fieldValue} <strong className="count">{category.totalCount}</strong>
                </span>
              </Link>
            ))}
          </div>
          <div className="flex">
            <input
              className="search"
              type="search"
              name="searchTerm"
              value={searchTerm}
              placeholder="Type here to filter posts..."
              onChange={this.handleChange}
              autoComplete="new-password"
            />
          </div>
          <PostListing excerpt postEdges={filteredPosts} />
        </div>
      </Layout>
    )
  }
}

export default BlogPage

export const pageQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(limit: 2000, sort: { fields: [fields___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt(pruneLength: 180)
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
            template
          }
        }
      }
    }
    categories: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`
