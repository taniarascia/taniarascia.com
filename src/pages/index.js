import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'

import { GatsbyImage } from 'gatsby-plugin-image'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { Heading } from '../components/Heading'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { projectsList } from '../data/projectsList'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import blog from '../assets/nav-blog.png'
import projects from '../assets/nav-projects.png'
import github from '../assets/nav-github.png'

export default function Index({ data }) {
  const latestNotes = data.latestNotes.edges
  const latestArticles = data.latestArticles.edges
  const highlights = data.highlights.edges
  const postCount = data.postCount.totalCount
  const notes = useMemo(() => getSimplifiedPosts(latestNotes), [latestNotes])

  const articles = useMemo(
    () => getSimplifiedPosts(latestArticles),
    [latestArticles]
  )
  const simplifiedHighlights = useMemo(
    () => getSimplifiedPosts(highlights, { thumbnails: true }),
    [highlights]
  )

  return (
    <>
      <Helmet title={config.siteTitle} />
      <SEO />

      <PageLayout>
        <Hero type="index">
          <div className="hero-wrapper">
            <div>
              <h1>Hey, I'm Tania!</h1>
              <p className="hero-description">
                I made my first websites in the late '90s on the public
                library's dial-up internet - fan pages about
                Digimon, gaming, and obscure '80s bands.
              </p>
              <p className="hero-description">
                Somehow, I ended up taking a{' '}
                <Link to="/from-cooking-to-coding">decade-long detour</Link>{' '}
                getting a culinary degree (including three months at Olive
                Garden school in Italy) and being a professional chef (including
                a stint at Namco's Pac-Man restaurant).
              </p>
              <p className="hero-description">
                Eventually I found my way back,{' '}
                <Link to="/how-i-made-a-career-change-into-web-development">
                  starting over as an unpaid intern
                </Link>{' '}
                making WordPress sites, working my way through the industry
                (including being a Taco Bell dev) and becoming the Principal
                Software Engineer I am today.
              </p>
              <p className="hero-description">
                Meanwhile, I've documented{' '}
                <Link to="/everything-i-know-as-a-software-developer-without-a-degree">
                  everything I learned
                </Link>{' '}
                since I started in 2015, in {postCount} posts,{' '}
                <Link to="/me#publications">
                  40+ articles written for other publications
                </Link>
                , dozens of open-source projects with{' '}
                <a
                  href="https://github.com/taniarascia"
                  rel="noreferrer"
                  target="_blank"
                >
                  20,000+ stars on GitHub
                </a>
                , and some art, songs, and personal thoughts scattered around.
              </p>
              <p className="hero-description">
                As ever, this site has no ads, no paywalls, no tracking, and no
                sponsors.
              </p>
            </div>
            <div className="hero-image-container">
              <img src="/ram.png" className="hero-image" alt="RAM Ram" />
              <aside className="hero-bubble">
                Can't remember how to spell my name? Just go to{' '}
                <a href="https://tania.dev">tania.dev</a>
              </aside>
            </div>
          </div>
        </Hero>

        <section className="section-index">
          <Heading
            title="Blog"
            description="Guides, references, and tutorials."
            icon={projects}
          />
          <Posts data={articles} />
        </section>

        <section className="section-index">
          <Heading
            title="Notes"
            description="Life, music, projects, and everything else."
            icon={blog}
          />
          <Posts data={notes} />
        </section>

        <section className="section-index">
          <Heading
            title="Deep Dives"
            slug="/topics"
            buttonText="All Topics"
            description="Long-form tutorials on a variety of development topics."
          />
          <div className="cards">
            {simplifiedHighlights.map((post) => {
              return (
                <Link
                  to={post.slug}
                  className="card card-highlight"
                  key={`popular-${post.slug}`}
                >
                  {post.thumbnail && (
                    <GatsbyImage image={post.thumbnail} alt="Thumbnail" />
                  )}
                  <div>{post.title}</div>
                </Link>
              )
            })}
          </div>
        </section>

        <section>
          <Heading
            title="Projects"
            slug="/projects"
            buttonText="All Projects"
            description="Open-source projects I've worked on over the years."
            icon={github}
          />

          <div className="cards">
            {projectsList
              .filter((project) => project.highlight)
              .map((project) => {
                return (
                  <div className="card" key={`hightlight-${project.slug}`}>
                    <time>{project.date}</time>
                    <a
                      href={`https://github.com/taniarascia/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                    <p>{project.tagline}</p>
                    <div className="card-links">
                      {project.writeup && (
                        <Link
                          className="button secondary small"
                          to={project.writeup}
                        >
                          Article
                        </Link>
                      )}
                      {project.url && (
                        <a
                          className="button secondary small"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Demo
                        </a>
                      )}
                      <a
                        className="button secondary small"
                        href={`https://github.com/taniarascia/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      </PageLayout>
    </>
  )
}

Index.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latestNotes: allMarkdownRemark(
      limit: 5
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Personal" }
        }
      }
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
            categories
          }
        }
      }
    }
    latestArticles: allMarkdownRemark(
      limit: 5
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Technical" }
        }
      }
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
            categories
          }
        }
      }
    }
    postCount: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      totalCount
    }
    highlights: allMarkdownRemark(
      limit: 12
      sort: { frontmatter: { date: DESC } }
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
            tags
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 40, height: 40, layout: FIXED)
              }
            }
          }
        }
      }
    }
  }
`
