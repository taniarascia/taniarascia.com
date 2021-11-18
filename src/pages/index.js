import React, { useState, useEffect, useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

import github from '../assets/nav-github.png'

export default function WebsiteIndex({ data }) {
  const [followers, setFollowers] = useState(0)
  const latest = data.latest.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])

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
            <h1>Hey, I'm Tania.</h1>
            <p className="subtitle small">
              I'm a <strong>software engineer</strong> in{' '}
              <strong>Chicago</strong>. I love building open-source{' '}
              <Link to="/projects">projects</Link> and sharing{' '}
              <Link to="/blog">what I learn</Link>. This website is my digital
              garden — a compendium of the things I've learned and created over
              the years.
            </p>
            <p className="hero-buttons">
              {followers && (
                <a
                  href="https://github.com/taniarascia"
                  className="button icon-button"
                >
                  <img src={github} alt="GitHub" />
                  {Number(followers).toLocaleString()} GitHub followers
                </a>
              )}
            </p>
          </div>
        </header>

        <div className="container">
          <h2 className="flex-header">
            <span>Latest Articles</span> <Link to="/blog">View All</Link>
          </h2>
          <Posts data={simplifiedLatest} />

          <h2>Sitemap</h2>

          <ul>
            <li>
              <Link to="/blog">Articles</Link> - Tutorials, technical articles,
              snippets, and reference materials.
            </li>
            <li>
              <Link to="/notes">Notes</Link> - Anything else I want to write.
            </li>
            <li>
              <Link to="/projects">Projects</Link> - A few highlights of my
              open-source projects.
            </li>
            <li>
              <Link to="/resume">Resume</Link> - My professional experience (I'm
              not currently looking).
            </li>
            <li>
              <Link to="/me">About me</Link> - A little about me and links to
              talks, interviews, etc.
              <ul>
                <li>
                  <a href="https://ko-fi.com/taniarascia">Ko-fi</a> - Buy me a
                  coffee.
                </li>
                <li>
                  <a href="https://taniarascia.substack.com/subscribe">
                    Newsletter
                  </a>{' '}
                  - Get occasional updates.
                </li>
                <li>
                  <a href="https://github.com/taniarascia">GitHub</a> - Open
                  source projects.
                </li>
                <li>
                  <a href="https://twitter.com/taniarascia">Twitter</a> - Random
                  thoughts.
                </li>
                <li>
                  <Link to="/rss.xml">RSS feed</Link>
                </li>
              </ul>
            </li>
          </ul>

          <h2>Newsletter</h2>
          <p>
            Subscribe to the newsletter to get my latest content by email. Not
            on any set schedule. Unsubscribe anytime.
          </p>
          <p className="hero-buttons">
            <a
              href="https://taniarascia.substack.com/subscribe"
              className="button"
            >
              Get the Newsletter
            </a>
          </p>
        </div>
      </article>
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
          }
        }
      }
    }
  }
`
