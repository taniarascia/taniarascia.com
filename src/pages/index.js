import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { Heading } from '../components/Heading'
import { Hero } from '../components/Hero'
import { projectsList } from '../data/projectsList'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function Index({ data }) {
  const latestNotes = data.latestNotes.edges
  const latestArticles = data.latestArticles.edges
  const highlights = data.highlights.edges
  const notes = useMemo(() => getSimplifiedPosts(latestNotes), [latestNotes])
  const articles = useMemo(
    () => getSimplifiedPosts(latestArticles),
    [latestArticles]
  )
  const simplifiedHighlights = useMemo(
    () => getSimplifiedPosts(highlights, { thumbnails: true }),
    [highlights]
  )

  return (
    <div>
      <Helmet title={config.siteTitle} />
      <SEO />

      <div className="container">
        <div className="hero-wrapper">
          <Hero title="Hey, I'm Tania" index>
            <p className="hero-description">
              I'm a software developer who makes open-source projects and writes
              about code and life.
            </p>
            <p className="hero-description">
              On this site, you can check out all the{' '}
              <Link to="/blog">technical articles</Link> I've written, read some
              of my <Link to="/notes">personal notes</Link>, or learn more{' '}
              <Link to="/me">about me</Link>.
            </p>
          </Hero>
          <div className="decoration">
            <img
              src="/ram.png"
              alt="RAM Ram"
              className="image hero-image"
              title="RAM Ram"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <section className="segment first">
          <Heading title="Notes" slug="/notes" buttonText="All Notes" />

          <Posts data={notes} newspaper />
        </section>

        <section className="segment">
          <Heading title="Articles" slug="/blog" buttonText="All Articles" />

          <Posts data={articles} newspaper />
        </section>

        <section className="segment large">
          <Heading title="Highlights" />

          <div className="highlight-preview">
            {simplifiedHighlights.map((post) => {
              return (
                <div className="muted card flex" key={`popular-${post.slug}`}>
                  {post.thumbnail && (
                    <Link className="card-header" to={post.slug}>
                      <Img fixed={post.thumbnail} />
                    </Link>
                  )}
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

        <section className="segment large">
          <Heading
            title="Projects"
            slug="/projects"
            buttonText="All Projects"
          />

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
                      <a
                        className="button flex"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Demo
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      </div>
    </div>
  )
}

Index.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latestNotes: allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Personal" }
        }
      }
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
    latestArticles: allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Technical" }
        }
      }
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
