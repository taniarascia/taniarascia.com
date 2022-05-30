import React, { useState, useEffect, useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { projectHighlights } from '../data/project-highlights'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import github from '../assets/nav-github.png'
import { slugify } from '../utils/helpers'

export default function WebsiteIndex({ data }) {
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

      <div className="container">
        <header className="hero">
          <div className="small width">
            <h1>Hi, I'm Tania.</h1>
            <p>
              I'm a software engineer, open-sourcerer, and aspiring
              accordionist. I like to read sci-fi books, ride my bike around the
              city, record music, and write about the things that interest me.
            </p>
            <p>This is my digital garden.</p>
          </div>
          {/* <img src={looking} alt="Me" className="main-image" /> */}
          {followers && (
            <a
              href="https://github.com/taniarascia"
              className="button"
              target="_blank"
              rel="noreferrer"
            >
              <img src={github} alt="GitHub" />
              <span className="bright">
                {Number(followers).toLocaleString()}
              </span>
            </a>
          )}
        </header>

        <section className="segment">
          <h2 className="heading">
            <div>
              <div className="title">Recent posts</div>
              <div className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
            </div>
            <Link className="button" to="/blog">
              View all
            </Link>
          </h2>

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
          <h2 className="heading">
            <div>
              <div className="title">Greatest hits</div>
              <div className="description">
                A few of the most popular articles, guides, tutorials, and
                reference materials I've written over the years.
              </div>
            </div>
          </h2>

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
                      {post.tags.map((tag) => {
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
          <h2 className="heading">
            <div>
              <div className="title">Side projects</div>
              <div className="description">
                I like to build stuff for fun. Here are a few of the write-ups
                I've made for my open-source projects.
              </div>
            </div>
            <Link className="button" to="/projects">
              View all
            </Link>
          </h2>

          <div className="post-preview">
            {projectHighlights.map((project) => {
              return (
                <div className="card">
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
                  <div className="links">
                    <Link className="button" to={project.writeup}>
                      Write-up
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
          <h2 className="heading">
            <div>
              <div className="title">Stay in touch</div>
              <div className="description">
                I like to build stuff for fun. Here are a few of the write-ups
                I've made for my open-source projects.
              </div>
            </div>
          </h2>
        </section>
      </div>
    </>
  )
}

WebsiteIndex.Layout = Layout

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
