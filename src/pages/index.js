import React, { useState, useEffect, useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import Guides from '../components/Guides'
import Projects from '../components/Projects'
import SEO from '../components/SEO'
import Blurb from '../components/Blurb'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import projects from '../data/projects'
import interviews from '../data/interviews'
import speaking from '../data/speaking'

export default function BlogIndex({ data }) {
  const [followers, setFollowers] = useState(0)
  const latest = data.latest.edges
  const popular = data.popular.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedPopular = useMemo(() => getSimplifiedPosts(popular), [
    popular,
  ])

  useEffect(() => {
    async function getGithubAPI() {
      // If you fork this and don't change this, I will find you
      const response = await fetch('https://api.github.com/users/taniarascia')
      const data = await response.json()

      return data
    }

    getGithubAPI().then((data) => {
      setFollowers(data.followers)
    })
  }, [])

  const Section = ({ title, children, button, ...props }) => (
    <section {...props}>
      <h2 className="section-title">
        {title}
        {button && (
          <Link className="section-button" to="/blog">
            View all
          </Link>
        )}
      </h2>
      {children}
    </section>
  )

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <Blurb title="I'm Tania Rascia.">
        <p>
          I'm a software engineer and writer. This website is my digital garden
          &mdash; a compendium of the things I've learned and created over the
          years.
        </p>
        {followers && (
          <p>
            <a
              className="button github-button"
              href="https://github.com/taniarascia"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex' }}
            >
              <svg
                viewBox="0 0 16 16"
                width="20"
                height="20"
                aria-hidden="true"
                style={{ marginRight: '0.75rem' }}
              >
                <path
                  fill="white"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
              {`${followers.toLocaleString()} following`}
            </a>
          </p>
        )}
      </Blurb>
      <div className="container index">
        <Section title="Latest Articles." button>
          <Posts data={simplifiedLatest} />
        </Section>
        <Section title="Popular Articles." button>
          <Posts data={simplifiedPopular} />
        </Section>
        <Section title="Projects.">
          <Projects data={projects} />
        </Section>
        <Section title="Interviews.">
          <Guides data={interviews} frontPage />
        </Section>
        <Section title="Speaking.">
          <Guides data={speaking} frontPage />
        </Section>
        <Section title="Newsletter.">
          <div className="flex justify-between">
            <p className="paragraph">
              I send out an email when I create something new.
            </p>
            <a
              href="https://taniarascia.substack.com/subscribe"
              target="_blank"
              rel="noreferrer"
              className="button"
              style={{ textAlign: 'center', marginLeft: '.5rem' }}
            >
              Get the newsletter
            </a>
          </div>
        </Section>
      </div>
    </Layout>
  )
}

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
    popular: allMarkdownRemark(
      limit: 20
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
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
