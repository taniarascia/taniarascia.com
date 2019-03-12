import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import NewsletterForm from '../components/NewsletterForm'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

class Index extends Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} | Developer`} />
        <SEO />
        <div className="container">
          <div className="lead">
            <h1>
              Hi, I'm Tania. I build open source projects and write the missing instruction manuals
              of the web.
            </h1>
            <p>
              I'm <strong>developer, designer, writer, and former chef</strong> from Chicago. I
              created this site to document everything I learn, and share a bit of myself with the
              world.
            </p>
            <a className="button" href="https://github.com/taniarascia" target="_blank">
              GitHub
            </a>
            <a className="button" href="https://twitter.com/taniarascia" target="_blank">
              Twitter
            </a>
          </div>
          <section className="section">
            <h2>Latest Articles</h2>
            <PostListing simple postEdges={postEdges} />
          </section>
          <section className="section">
            <h2>Newsletter</h2>
            <p>Sign up to get notified when I make awesome new content.</p>
            <NewsletterForm />
          </section>
        </div>
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 10, sort: { fields: [fields___date], order: DESC }) {
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
            template
          }
        }
      }
    }
  }
`
