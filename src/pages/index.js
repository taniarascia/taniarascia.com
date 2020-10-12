import React, { useMemo } from 'react'
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
  const latest = data.latest.edges
  const popular = data.popular.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedPopular = useMemo(() => getSimplifiedPosts(popular), [
    popular,
  ])

  const Section = ({ title, children, button, ...props }) => (
    <section {...props}>
      <h2>
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
      <Blurb title="Hey! I'm Tania Rascia.">
        <p>
          I'm a software engineer, writer, and open-source creator. This website
          is my digital garden &mdash; a compendium of the things I've learned
          and created over the years.
        </p>
        <p>
          <Link className="button" to="/me">
            About me
          </Link>
          <a
            className="button"
            href="https://taniarascia.substack.com"
            target="_blank"
            rel="noreferrer"
          >
            Join newsletter
          </a>
          <a
            className="button"
            href="https://github.com/taniarascia"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </Blurb>
      <div className="container index">
        <Section title="Latest Articles" button>
          <Posts data={simplifiedLatest} />
        </Section>
        <Section title="Popular Articles" button>
          <Posts data={simplifiedPopular} />
        </Section>
        <Section title="Projects">
          <Projects data={projects} />
        </Section>
        <Section title="Interviews">
          <Guides data={interviews} frontPage />
        </Section>
        <Section title="Speaking">
          <Guides data={speaking} frontPage />
        </Section>
        <Section title="Newsletter">
          <p>
            I send out an email when I create something new. Subscribe to get
            updates!
          </p>
          <a
            href="https://taniarascia.substack.com/subscribe"
            target="_blank"
            rel="noreferrer"
            className="button large"
          >
            <span className="emoji">💌</span> Join the Newsletter
          </a>
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
