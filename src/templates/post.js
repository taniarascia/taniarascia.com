import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import UserInfo from '../components/UserInfo'
import PostTags from '../components/PostTags'
import NewsletterForm from '../components/NewsletterForm'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import Img from 'gatsby-image'
import { formatDate, editOnGithub } from '../utils/global'

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

    const date = formatDate(post.date)
    const githubLink = editOnGithub(post)
    const twitterUrl = 'https://twitter.com/search?q=' + config.siteUrl + '/' + post.slug + '/'
    const twitterShare =
      'http://twitter.com/share?text=' +
      encodeURIComponent(post.title) +
      '&url=' +
      config.siteUrl +
      '/' +
      post.slug +
      '/&via=taniarascia'

    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} – ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <article className="single container">
          <header className="single-header">
            {thumbnail ? <Img fixed={post.thumbnail.childImageSharp.fixed} /> : <div />}
            <div className="flex">
              <h1>{post.title}</h1>
              <div className="post-meta">
                <time className="date">{date}</time>/
                <a className="twitter-link" href={twitterShare}>
                  Share
                </a>
                /
                <a className="github-link" href={githubLink} target="_blank">
                  Edit on Github ✏️
                </a>
              </div>
              <PostTags tags={post.tags} />
            </div>
          </header>
          <div className="post" dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <div>
            {' '}
            <a href={twitterShare}>Share on Twitter</a> |{' '}
            <a href={twitterUrl}>Discuss on Twitter</a> |{' '}
            <a href={githubLink} target="_blank">
              Edit on Github ✏️
            </a>
          </div>
          <h3>Stay in touch</h3>
          <p>Like the posts you see here? Sign up to get notified about new ones.</p>
          <NewsletterForm />
        </article>
        <UserInfo config={config} />
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
        slug
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
