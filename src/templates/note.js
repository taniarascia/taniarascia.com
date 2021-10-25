import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'

export default function NoteTemplate({ data }) {
  const post = data.markdownRemark
  const { title, slug, date } = post.frontmatter

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO />

      <article id={slug}>
        <header>
          <div className="container" style={{ paddingBottom: 0 }}>
            <p>
              <Link to="/notes">Back to Notes</Link>
            </p>
            <h1>{title}</h1>
            <p>
              <div className="post-details">
                Written by <Link to="/me">Tania Rascia</Link> on{' '}
                <time>{date}</time>
              </div>
            </p>
          </div>
        </header>

        <section
          className="container"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <section>
          <div className="container">
            <div className="divider" />
            <p>
              Comments? Feel free to{' '}
              <a href="mailto:hello[at]taniarascia[dot]com">email me</a>.
            </p>
            <p>
              <Link to="/notes">Back to Notes</Link>
            </p>
          </div>
        </section>
      </article>
    </>
  )
}

NoteTemplate.Layout = Layout

export const pageQuery = graphql`
  query NoteBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
      }
    }
  }
`
