import React, { useState, useEffect, useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { Heading } from '../components/Heading'
import { projects } from '../data/projects'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import { slugify } from '../utils/helpers'

export default function Index({ data }) {
  const [followers, setFollowers] = useState(null)
  const latest = data.latest.edges
  const highlights = data.highlights.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedHighlights = useMemo(
    () =>
      getSimplifiedPosts(highlights, { shortTitle: true, thumbnails: true }),
    [highlights]
  )

  useEffect(() => {
    async function getGithubAPI() {
      const response = await fetch('https://api.github.com/users/taniarascia')
      const data = await response.json()

      return data
    }

    getGithubAPI().then((data) => {
      setFollowers(data.followers)
    })
  }, [])

  return (
    <>
      <Helmet title={config.siteTitle} />
      <SEO />
      <Hero index title="Hi, I'm Tania">
        I'm a software engineer, writer, and aspiring accordionist. This is my
        digital garden.
      </Hero>
      {/* <div className="bottom">
        <div className="dots">
          <div className="padding">
            <div className="flex space-between align-end container">
              <div>
                <div className="small width">
                  <p>
                    I'm a software engineer, open-sourcerer, and aspiring
                    accordionist. I like to read sci-fi books, ride my bike
                    around the city, record music, and write about the things
                    that interest me. This is my digital garden.
                  </p>
                </div>
              </div>
              <div className="flex">
                <Link to="/me" className="vhs-button">
                  <div className="bold">More</div>
                  <div className="light">About me</div>
                </Link>
                {followers && (
                  <a
                    href="https://github.com/taniarascia"
                    className="vhs-button"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="bold">
                      {Number(followers).toLocaleString()}
                    </div>
                    <div className="light">watching</div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container">
        <section className="segment">
          <Heading title="Latest Posts" slug="/blog" />

          <div className="post-preview">
            {simplifiedLatest.map((post) => {
              return (
                <div className="anchored card">
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
          <Heading title="Greatest Hits" />

          <div className="highlight-preview">
            {simplifiedHighlights.map((post) => {
              return (
                <div className="muted card flex">
                  {post.thumbnail && <Img fixed={post.thumbnail} />}
                  <div>
                    <time>{post.date}</time>
                    <Link className="card-header" to={post.slug}>
                      {post.title}
                    </Link>
                    <div className="tags">
                      {post.tags
                        .filter((tag, i) => i < 3)
                        .map((tag) => {
                          return (
                            <Link className="tag" to={`/tags/${tag}`}>
                              {tag}
                            </Link>
                          )
                        })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="segment">
          <Heading title="Side Projects" slug="/projects" />

          <div className="post-preview">
            {projects
              .filter((project) => project.highlight)
              .map((project) => {
                return (
                  <div className="anchored card">
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
                      <Link className="button" to={project.writeup}>
                        Article
                      </Link>
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
        </section>
      </div>
    </>
  )
}

Index.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
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
