import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { PostSidebar } from '../components/PostSidebar'
import { Comments } from '../components/Comments'
import config from '../utils/config'
import { appendComments } from '../utils/helpers'

export default function PostTemplate({ data }) {
  const post = data.markdownRemark
  const { tags, categories, title, date, thumbnail } = post.frontmatter
  const commentBox = React.createRef()

  useEffect(() => {
    appendComments(commentBox)
  }, [commentBox])

  return (
    <>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />

      <div className="container">
        <div className="grid">
          <div className="article-content">
            <div className="post-header medium width">
              <h1>{title}</h1>
            </div>
            <section className="segment small">
              <div
                id={post.fields.slug}
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </section>

            <section id="comments" className="segment comments">
              <h3>Comments</h3>
              <Comments commentBox={commentBox} />
            </section>
          </div>

          <PostSidebar
            date={date}
            tags={tags}
            categories={categories}
            thumbnail={thumbnail}
          />
        </div>
      </div>
    </>
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
