import React, { useState, useEffect, useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

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
              <Link to="/blog">my knowledge</Link>. This website is my digital
              garden — a compendium of the things I've learned and created over
              the years.
            </p>
            <p className="hero-buttons">
              <a
                href="https://taniarascia.substack.com/subscribe"
                className="button"
              >
                Newsletter
              </a>
              {followers && (
                <a href="https://github.com/taniarascia" className="button">
                  {Number(followers).toLocaleString()} followers
                </a>
              )}
            </p>
          </div>
        </header>

        <div className="container">
          <h2>Latest Articles</h2>
          <Posts data={simplifiedLatest} />
          <h2>Newsletter</h2>
          <p>
            Subscribe to the{' '}
            <a href="https://taniarascia.substack.com/subscribe">newsletter</a>{' '}
            to get my latest content by email. Not on any set schedule.
            Unsubscribe anytime.
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
