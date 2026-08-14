import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { GatsbyImage } from 'gatsby-plugin-image'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { PostLayout } from '../components/PostLayout'
import { Comments } from '../components/Comments'
import { AuthorCard } from '../components/AuthorCard'
import { Hero } from '../components/Hero'
import config from '../utils/config'
import { slugify } from '../utils/helpers'

export default function PostTemplate({ data }) {
  const post = data.markdownRemark
  const { title, date, dateISO, comments_off, thumbnail, tags, dated } =
    post.frontmatter
  const isNote = post.frontmatter.categories?.includes('Personal')

  return (
    <>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />

      <PostLayout post={post} isNote={isNote}>
        {thumbnail && (
          <GatsbyImage
            image={thumbnail?.childImageSharp?.gatsbyImageData}
            className="main-article-thumbnail"
            alt="Thumbnail"
          />
        )}
        <Hero
          title={title}
          type="post"
          date={
            <div className="small flex-align-center gap">
              <time dateTime={dateISO}>{date}</time>
              <div className="divider" />
              <a href="#comments">Comments</a>
            </div>
          }
        >
          <div className="tags">
            {tags.map((tag) => {
              return (
                <Link
                  key={tag}
                  to={`/topics/${slugify(tag)}`}
                  className="tag"
                  activeClassName="active"
                >
                  {tag}
                </Link>
              )
            })}
          </div>
        </Hero>

        {dated && (
          <blockquote className="dated-banner">
            <b>This post has been archived</b>. It was written in{' '}
            {dateISO.slice(0, 4)}, and the tools and concepts it covers belong
            to an earlier era of the web.
          </blockquote>
        )}

        <div
          className="main-article"
          id={post.fields.slug}
          dangerouslySetInnerHTML={{
            __html: `<div class="introduction" id="introduction"></div>${post.html}`,
          }}
        />
        <AuthorCard />
        {!comments_off && (
          <section id="comments" className="comments">
            <h3>Comments</h3>
            <Comments />
          </section>
        )}
      </PostLayout>
    </>
  )
}

PostTemplate.Layout = Layout

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      tableOfContents(maxDepth: 3)
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        dateISO: date(formatString: "YYYY-MM-DD")
        tags
        categories
        description
        comments_off
        dated
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 75, height: 75, layout: FIXED)
          }
        }
        socialImage: thumbnail {
          childImageSharp {
            gatsbyImageData(width: 150, height: 150, layout: FIXED)
          }
        }
      }
    }
  }
`
