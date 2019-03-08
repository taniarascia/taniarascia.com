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
    let thumbnail

    if (!post.id) {
      post.id = slug
    }

    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID
    }

    if (post.thumbnail) {
      thumbnail = post.thumbnail.childImageSharp.fixed
    }

    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <article className="single container">
          <header className="single-header">
            {thumbnail ? <Img fixed={post.thumbnail.childImageSharp.fixed} /> : <div />}
            <div className="post-meta">
              <time className="date">{post.date}</time>
              <h1>{post.title}</h1>
              <PostTags tags={post.tags} />
            </div>
          </header>
          <div className="post" dangerouslySetInnerHTML={{ __html: postNode.html }} />
        </article>
        <UserInfo config={config} />
        <div className="container">
          <DisqusComments postNode={postNode} />
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
        categories
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
