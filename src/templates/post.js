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
  const { tags, categories, title, date, thumbnail, comments_off } =
    post.frontmatter
  const commentBox = React.createRef()

  useEffect(() => {
    appendComments(commentBox)
  }, [commentBox])

  return (
    <div>
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

            <section id="comments" className="segment">
              <div className="card single">
                <h3>Newsletter</h3>
                <p className="text-large">
                  If you liked this post, sign up to get updates in your email
                  when I write something new! No spam ever.
                </p>
                <a
                  href="https://taniarascia.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button highlighted large"
                >
                  Subscribe to the Newsletter
                </a>
              </div>
            </section>

            {!comments_off && (
              <section id="comments" className="segment comments">
                <h3>Comments</h3>
                <Comments commentBox={commentBox} />
              </section>
            )}
          </div>

          <PostSidebar
            date={date}
            tags={tags}
            categories={categories}
            thumbnail={thumbnail}
          />
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
