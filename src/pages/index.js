import React, { useState, useEffect, useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import github from '../assets/nav-github.png'
import floppy from '../assets/nav-floppy.png'
import looking from '../assets/me.jpg'

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

      <article className="hero">
        <header>
          <div className="container">
            <div className="flex-content">
              <div>
                <h1>Hey, I'm Tania.</h1>
                <p className="subtitle small">
                  I'm a software engineer in Chicago. I love building
                  open-source <Link to="/projects">projects</Link> and{' '}
                  <Link to="/blog">writing</Link> about what I learn. This
                  website is my digital garden—a compendium of the things I've
                  learned and created over the years.
                </p>
              </div>
              <img src={looking} alt="Me" className="main-image" />
            </div>
            <p className="hero-buttons">
              <Link to="/me" className="hero-button">
                <img src={floppy} alt="Me" />
                More about me
              </Link>
              {followers && (
                <a
                  href="https://github.com/taniarascia"
                  target="_blank"
                  className="hero-button"
                  rel="noreferrer"
                >
                  <img src={github} alt="GitHub" />
                  <span className="bright">
                    {Number(followers).toLocaleString()}
                  </span>
                  {' followers on GitHub'}
                </a>
              )}
            </p>
          </div>
        </header>

        <div className="container">
          <h2 className="main-header">
            <span>Latest Articles</span> <Link to="/blog">View All</Link>
          </h2>
          <Posts data={simplifiedLatest} />

          <h2 className="main-header">
            <span>Highlights</span> <Link to="/blog">View All</Link>
          </h2>
          <Posts data={simplifiedHighlights} yearOnly />

          <h2 className="main-header">Newsletter</h2>
          <div className="flex-content">
            <p>
              Subscribe to the newsletter to get my latest content by email. Not
              on any set schedule. Unsubscribe anytime.
            </p>
            <p className="hero-buttons">
              <a
                href="https://taniarascia.substack.com/subscribe"
                className="button"
              >
                Subscribe
              </a>
            </p>
          </div>
        </div>
      </article>
    </>
  )
}

WebsiteIndex.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 7
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
          }
        }
      }
    }
    highlights: allMarkdownRemark(
      limit: 99
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
                fixed(width: 25, height: 25) {
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
