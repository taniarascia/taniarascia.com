import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import Guides from '../components/Guides'
import Projects from '../components/Projects'
import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

import projects from '../data/projects'
import interviews from '../data/interviews'
import speaking from '../data/speaking'

import tania from '../../content/images/tania-2020.png'

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
      <section className="lead">
        <div className="container">
          <div className="copy">
            <h1>
              Hey! I'm Tania Rascia.
              <br /> I'm a software engineer and open-source creator.
            </h1>
            <p>
              This website is my 🌱 digital garden&mdash;a compendium of the
              things I have learned and created over the years, and anything
              else I want to write about. You can read my{' '}
              <Link to="/blog">blog</Link>, view my{' '}
              <Link to="/guides">guides &amp; tutorials</Link>, or learn more{' '}
              <Link to="/me">about me</Link>.
            </p>
          </div>

          <div className="image">
            <img src={tania} alt="Tania" />
          </div>
        </div>
      </section>
      <div className="container index">
        <Section title="Latest Articles" button>
          <Posts data={simplifiedLatest} tags withDate />
        </Section>
        <Section title="Popular Articles" button>
          <Posts data={simplifiedPopular} tags withDate />
        </Section>
        <Section title="Projects">
          <Projects data={projects} />
        </Section>
        <Section title="Interviews">
          <Guides data={interviews} />
        </Section>
        <Section title="Speaking">
          <Guides data={speaking} />
        </Section>
        <Section title="Newsletter">
          <p>
            I send out an email whenever I create something new. Never any spam.
          </p>
          <a
            href="https://taniarascia.substack.com/subscribe"
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            <span className="emoji">💌</span> Join Newsletter
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
