import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Comments } from '../components/Comments'
import config from '../utils/config'
import { slugify, appendComments } from '../utils/helpers'

export default function PostTemplate({ data }) {
  const post = data.markdownRemark
  const { tags, title, date, thumbnail } = post.frontmatter
  const commentBox = React.createRef()

  useEffect(() => {
    appendComments(commentBox)
  }, [commentBox])

  return (
    <>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />

      <header className="post hero">
        <div className="top">
          <div className="hero-padding pattern">
            <div className="container">
              <div className="hero-prelude">
                Written by <span className="highlight">Tania Rascia</span> on{' '}
                <span className="highlight">{date}</span>
              </div>
              <h1>{title}</h1>
            </div>
            <div className="lines vertical">
              <div className="line rainbow1" />
              <div className="line rainbow2" />
              <div className="line rainbow3" />
              <div className="line rainbow4" />
              <div className="line rainbow5" />
            </div>
          </div>
        </div>
      </header>

      <section className="segment container page">
        <div
          id={post.fields.slug}
          className="medium width"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </section>

      <div className="container">
        <section id="comments" className="comments medium width">
          <h3>Comments</h3>
          <Comments commentBox={commentBox} />
        </section>
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

/* {thumbnail && (
                <div>
                  <Img
                    fixed={thumbnail.childImageSharp?.fixed}
                    className="post-image"
                  />
                </div>
              )} */

/* {tags && (
                <div className="tags">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tags/${slugify(tag)}`}
                      className={`tag-${tag}`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )} */
