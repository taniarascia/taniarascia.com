import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import ProjectListing from '../components/ProjectListing'
import SimpleListing from '../components/SimpleListing'
import NewsletterForm from '../components/NewsletterForm'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import projects from '../../data/projects'
import publications from '../../data/publications'
import speaking from '../../data/speaking'
import podcasts from '../../data/podcasts'

class Index extends Component {
  render() {
    const latestPostEdges = this.props.data.latest.edges
    const popularPostEdges = this.props.data.popular.edges
    const published = publications.filter((article, i) => i < 6)

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} | Developer, designer, writer`} />
        <SEO />
        <div className="container">
          <div className="lead">
            <h1>
              Hi, I'm Tania. I build open source projects and write the missing instruction manuals
              of the web.
            </h1>
            <p>
              I'm <strong>developer, designer,</strong> and <strong>writer</strong>. I created this
              site to document everything I learn, and share a bit of myself with the world. My site
              is free and has no ads, affiliate links, or sponsored posts.
            </p>
            <Link className="button" to="/me" target="_blank">
              About me
            </Link>
            <a className="button" href="https://github.com/taniarascia" target="_blank">
              GitHub
            </a>
            <a className="button" href="https://twitter.com/taniarascia" target="_blank">
              Twitter
            </a>
          </div>
        </div>

        <section className="note">
          <div className="container note-container">
            <h3>Updates</h3>
            <p>
              <small>
                <em>March 13, 2019</em>
              </small>
              <br />
              After a long and arduous journey, I've migrated the site from WordPress to Gatsby, a
              React/Node.js static site generator.{' '}
              <a href="https://github.com/taniarascia/taniarascia.com" target="_blank">
                View the source
              </a>{' '}
              of the new website! If you see any formatting errors on a post, feel free to make a
              pull request and fix it on GitHub.
            </p>
            <h4>Todos</h4>
            <ul>
              <li>Add night mode option</li>
              <li>Add improved sorting and filtering for posts</li>
              <li>Add logos for projects, podcasts, speaking, publications</li>
              <li>Bring in comments</li>
            </ul>
          </div>
        </section>

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
            <h2>
              Published Articles{' '}
              <Link className="view-all" to="/publications">
                View all
              </Link>
            </h2>
            <SimpleListing simple data={published} />
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
            <h2>Newsletter</h2>
            <p>Sign up to get notified about new content.</p>
            <NewsletterForm />
          </section>
        </div>
      </Layout>
    )
  }
}

export default Index

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
