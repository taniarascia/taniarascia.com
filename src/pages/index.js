import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Heading } from '../components/Heading'
import { Hero } from '../components/Hero'
import { projectsList } from '../data/projectsList'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import { slugify } from '../utils/helpers'

export default function Index({ data }) {
  const latest = data.latest.edges
  const highlights = data.highlights.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedHighlights = useMemo(
    () =>
      getSimplifiedPosts(highlights, { shortTitle: true, thumbnails: true }),
    [highlights]
  )

  return (
    <div>
      <Helmet title={config.siteTitle} />
      <SEO />

      <div className="container">
        <div className="hero-wrapper">
          <Hero title="Hey, I'm Tania!" index>
            <p className="hero-description small width">
              Welcome to my digital garden. 🌱
              <br />
              <br />
              I'm a software developer who creates open-source projects and
              writes about code, design, and life. I like accordions, outer
              space, board games, and stand-up comedy.
              <br />
              <br />
              Check out <Link to="/projects">my projects</Link> and{' '}
              <Link to="/blog">articles I've written</Link> on subjects like
              game design, security, front end development, or learn{' '}
              <Link to="/me">more about me</Link>.
            </p>
          </Hero>
          <div className="decoration">
            <p>Empty space</p>
          </div>
        </div>
      </div>
      <div className="container">
        <section className="segment">
          <Heading title="Latest Posts" slug="/blog" />

          <div className="post-preview">
            {simplifiedLatest.map((post) => {
              return (
                <div className="anchored card" key={post.slug}>
                  <time>{post.date}</time>
                  <Link className="card-header" to={post.slug}>
                    {post.title}
                  </Link>
                  <div className="anchored categories">
                    {post.categories
                      .filter((cat) => cat !== 'Highlight')
                      .map((cat) => {
                        return (
                          <Link
                            className="cat"
                            to={`/categories/${slugify(cat)}`}
                            key={slugify(cat)}
                          >
                            {cat}
                          </Link>
                        )
                      })}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="segment">
          <Heading title="Popular Tutorials" />

          <div className="highlight-preview">
            {simplifiedHighlights.map((post) => {
              return (
                <div className="muted card flex" key={`popular-${post.slug}`}>
                  {post.thumbnail && <Img fixed={post.thumbnail} />}
                  <div>
                    <time>{post.date}</time>
                    <Link className="card-header" to={post.slug}>
                      {post.title}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="segment">
          <Heading title="Side Projects" slug="/projects" />

          <div className="post-preview">
            {projectsList
              .filter((project) => project.highlight)
              .map((project) => {
                return (
                  <div className="anchored card" key={project.slug}>
                    <div>
                      <time>{project.date}</time>
                      <a
                        className="card-header"
                        href={`https://github.com/taniarascia/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.name}
                      </a>
                      <p>{project.tagline}</p>
                    </div>
                    <div className="anchored links">
                      {project.writeup && (
                        <Link className="button" to={project.writeup}>
                          Article
                        </Link>
                      )}
                      <a className="button flex" href={project.url}>
                        Demo
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </section>

        <section className="segment">
          <Heading title="Stay in touch" />
          <p>
            If I write something new, I'll let you know via newsletter. I don't
            update often, and don't spam ever.
          </p>
          <p>
            <a
              href="https://taniarascia.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="button large"
            >
              Subscribe to the Newsletter
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}

Index.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
          }
        }
      }
    }
    highlights: allMarkdownRemark(
      limit: 12
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Highlight" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            shortTitle
            tags
            thumbnail {
              childImageSharp {
                fixed(width: 45, height: 45) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
