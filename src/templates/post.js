import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import UserInfo from '../components/UserInfo'
import DisqusComments from '../components/DisqusComments'
import PostTags from '../components/PostTags'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import Img from 'gatsby-image'

class PostTemplate extends Component {
  render() {
    const { slug } = this.props.pageContext
    const postNode = this.props.data.markdownRemark
    const post = postNode.frontmatter

    if (!post.id) {
      post.id = slug
    }

    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID
    }

    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div className="container">
          <article className="single">
            <header className="single-header">
              <Img fixed={post.thumbnail.childImageSharp.fixed} />
              <h1>{post.title}</h1>
              <div className="post-meta">
                <time>{post.date}</time>
                <PostTags tags={post.tags} />
              </div>
            </header>

            <div className="post" dangerouslySetInnerHTML={{ __html: postNode.html }} />

            <UserInfo config={config} />
            <DisqusComments postNode={postNode} />
          </article>
        </div>
      </Layout>
    )
  }
}

export default PostTemplate

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        thumbnail {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        date
        category
        tags
        template
      }
      fields {
        nextTitle
        nextSlug
        prevTitle
        prevSlug
        slug
        date
      }
    }
  }
`
