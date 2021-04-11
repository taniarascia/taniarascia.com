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
          <div className="flex">
            <p className="paragraph">
              I send out an email when I create something new. I'm never going
              to spam you, and you can unsubscribe any time.
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
