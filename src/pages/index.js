import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import Lists from '../components/Lists'
import Projects from '../components/Projects'
import SEO from '../components/SEO'

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

  const Section = ({ title, children, ...props }) => (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  )

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <section className="small lead">
        <h1>Hey, I'm Tania</h1>
        <p className="subtitle">
          I'm a software engineer, technical writer, and{' '}
          <a
            href="https://github.com/taniarascia"
            target="_blank"
            rel="noreferrer"
          >
            open source
          </a>{' '}
          creator. This website is a compendium of the things I have learned
          over the years, and also my "digital garden".
        </p>
        <p>
          I aim to create a beautiful corner of the web free of ads, sponsored
          posts, newsletter pop-ups, affiliate links, and the rest of the
          annoying noise we're so accustomed to seeing on the internet these
          days.
        </p>
        <p>
          You can read my <Link to="/blog">blog</Link>, view my{' '}
          <Link to="/guides">dev guides</Link>, or contact me at <b>hello</b> at{' '}
          <b>taniarascia.com</b>.
        </p>
      </section>
      <Section title="Latest">
        <Posts data={simplifiedLatest} tags />
      </Section>
      <Section title="Popular">
        <Posts data={simplifiedPopular} tags />
      </Section>
      <Section title="Projects">
        <Projects data={projects} />
      </Section>
      <Section title="Interviews &amp; Podcasts" className="medium">
        <Lists data={interviews} />
      </Section>
      <Section title="Speaking" className="medium">
        <Lists data={speaking} />
      </Section>
      <Section title="Newsletter" className="small">
        <p>
          Every now and then I'll send out an email when I've created something
          new. Never any spam, easy unsubscribe whenever.
        </p>
        <a
          href="https://taniarascia.substack.com/subscribe"
          target="_blank"
          rel="noreferrer"
        >
          Subscribe to the email list
        </a>
      </Section>
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
