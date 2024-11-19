import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { PostSidebar } from '../components/PostSidebar'
import { Comments } from '../components/Comments'
import config from '../utils/config'

export default function PostTemplate({ data }) {
  const post = data.markdownRemark
  const { tags, categories, title, date, thumbnail, comments_off } =
    post.frontmatter

  return (
    <div>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />

      <div className="container">
        <div className="grid">
          <div className="article-content">
            <div className="post-header medium width">
              {thumbnail && (
                <div className="header-post-image">
                  <Img fixed={thumbnail.childImageSharp?.fixed} />
                </div>
              )}
              <h1>{title}</h1>
            </div>
            <section className="segment small">
              <div
                id={post.fields.slug}
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </section>

            <PostSidebar date={date} tags={tags} categories={categories} />

            {!comments_off && (
              <section id="comments" className="segment comments">
                <h3>Comments</h3>
                <Comments />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

PostTemplate.Layout = Layout

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        categories
        description
        comments_off
        thumbnail {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
