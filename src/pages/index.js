import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import ProjectListing from '../components/ProjectListing'
import SimpleListing from '../components/SimpleListing'
import NewsletterForm from '../components/NewsletterForm'
import GitHubButton from 'react-github-btn'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import projects from '../../data/projects'
import speaking from '../../data/speaking'
import podcasts from '../../data/podcasts'

export default class Index extends Component {
  render() {
    const latestPostEdges = this.props.data.latest.edges
    const popularPostEdges = this.props.data.popular.edges

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Full-Stack Software Developer`} />
        <SEO />
        <div className="container">
          <div className="lead">
            <h1>Hi, I'm Tania</h1>
            <div className="lead-grid">
              <p>
                I'm a full-stack software developer specializing in modern
                JavaScript. I write about everything I know and break down
                complex concepts in an accessible and intuitive way.
              </p>
              <p>
                I like making things from scratch and{' '}
                <a href="/learn">learning in public</a>. My open source projects
                include{' '}
                <a
                  href="https://github.com/taniarascia/laconia/"
                  target="blank"
                >
                  an MVC framework
                </a>
                ,{' '}
                <a
                  href="https://taniarascia.github.io/primitive/"
                  target="blank"
                >
                  a CSS framework
                </a>
                ,{' '}
                <a href="https://github.com/taniarascia/chip8/" target="blank">
                  an old-school emulator
                </a>
                , and{' '}
                <a
                  href="https://taniarascia.github.io/new-moon/"
                  target="blank"
                >
                  the optimized dark theme
                </a>{' '}
                for web development.
              </p>
            </div>
            <div className="social-buttons">
              <div>
                <a
                  className="twitter-follow-button"
                  href="https://twitter.com/taniarascia"
                  data-size="large"
                  data-show-screen-name="false"
                >
                  Follow @taniarascia
                </a>
              </div>
              <div>
                <GitHubButton
                  href="https://github.com/taniarascia"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Follow @taniarascia on GitHub"
                >
                  Follow
                </GitHubButton>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <section className="section">
            <h2>Latest Articles</h2>
            <PostListing simple postEdges={latestPostEdges} />
          </section>

          <section className="section">
            <h2>Most Popular</h2>
            <PostListing simple postEdges={popularPostEdges} />
          </section>

          <section className="section">
            <h2>Open Source Projects</h2>
            <ProjectListing projects={projects} />
          </section>

          <section className="section">
            <h2>Podcasts</h2>
            <SimpleListing simple data={podcasts} />
          </section>

          <section className="section">
            <h2>Speaking</h2>
            <SimpleListing simple data={speaking} />
          </section>

          <section className="section">
            <h2>Other People's Opinions</h2>
            <blockquote className="quotation">
              <p>
                “You write extremely clear, concise tutorials that have the best
                ratio of learning to bullshit that I've encountered so far. It's
                no exaggeration to say that I wouldn't currently have a job in
                development without this site. So thanks for ruining my life,
                Tania.”
              </p>
              <cite>— Craig</cite>
            </blockquote>
            <blockquote className="quotation">
              <p>
                “You taught me more than any class could have, and it took me a
                fraction of the time because of how clearly you write and
                teach.”
              </p>
              <cite>— Evan</cite>
            </blockquote>
            <blockquote className="quotation">
              <p>
                “Not to get too dramatic, but I find your site to be an
                unspeakably beautiful lifeboat in an overwhelming sea of
                technical jargon and shite.”
              </p>
              <cite>— Lori</cite>
            </blockquote>
          </section>

          <section className="section">
            <h2>Newsletter</h2>
            <p>
              I write what I know and I share it with the world. Sign up to get
              notified about new content!
            </p>
            <NewsletterForm />
          </section>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`
