import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'

import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { Heading } from '../components/Heading'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { projectsList } from '../data/projectsList'
import { shelvesList } from '../data/shelvesList'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import github from '../assets/nav-github.png'
import floppy from '../assets/floppylogo.png'

export default function Index({ data }) {
  const latestPosts = data.latestPosts.edges
  const postCount = data.postCount.totalCount
  const recent = useMemo(() => getSimplifiedPosts(latestPosts), [latestPosts])
  const shelfPostsBySlug = useMemo(() => {
    const map = {}

    data.shelfPosts.nodes.forEach(({ frontmatter }) => {
      map[frontmatter.slug] = frontmatter
    })

    return map
  }, [data.shelfPosts])

  return (
    <>
      <Helmet title={config.siteTitle} />
      <SEO />

      <PageLayout>
        <Hero type="index">
          <div className="hero-wrapper">
            <div>
              <h1 className="flex-align-center gap">
                Hey, I'm Tania!
                <img src={floppy} alt="" width="40" height="40" />
              </h1>
              <p className="hero-description hero-tagline">
                Principal software engineer, writer, all-around nerd.
              </p>
              <ul className="hero-eras">
                <li>
                  <span className="era-dates">1998&ndash;2006</span>
                  <span>
                    Built my first websites on the early internet at the public
                    library, made Digimon fansites, and documented obscure '80s
                    bands.
                  </span>
                </li>
                <li>
                  <span className="era-dates">2007&ndash;2014</span>
                  <span>
                    <Link to="/from-cooking-to-coding">Professional chef</Link>:
                    Culinary degree, 60-hour weeks in Chicago kitchens, line
                    cook to chef-manager by 22.
                  </span>
                </li>
                <li>
                  <span className="era-dates">2014&ndash;2020</span>
                  <span>
                    <Link to="/how-i-made-a-career-change-into-web-development">
                      Career change
                    </Link>
                    : Unpaid intern by day, cook by night, then junior dev to
                    senior engineer who{' '}
                    <Link to="/everything-i-know-as-a-software-developer-without-a-degree">
                      wrote everything down
                    </Link>{' '}
                    along the way.
                  </span>
                </li>
                <li>
                  <span className="era-dates">2021&ndash;now</span>
                  <span>
                    <Link to="/resume">Principal software engineer</Link>:
                    Building design systems, setting technical direction,
                    shipping features, and still documenting:{' '}
                    <Link to="/blog">{postCount} posts</Link>,{' '}
                    <Link to="/me#publications">40+ publications</Link>, and{' '}
                    <a
                      href="https://github.com/taniarascia"
                      rel="noreferrer"
                      target="_blank"
                    >
                      20,000+ stars on GitHub
                    </a>
                    .
                  </span>
                </li>
              </ul>
              <p className="hero-description">
                <Link to="/me">Also me</Link>: city explorer, weight-lifter,
                brick-clicker, accordion enthusiast, Magic gatherer, webmaster,
                DINK.
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

        {shelvesList.map((shelf) => (
          <section className="section-index" key={shelf.title}>
            <Heading
              title={shelf.title}
              description={shelf.description}
              slug={shelf.slug}
              buttonText={shelf.buttonText}
            />
            <div className="posts shelf">
              {shelf.links.map((link) => {
                if (link.url) {
                  return (
                    <a
                      className="post"
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      key={link.title}
                    >
                      <div>{link.title}</div>
                    </a>
                  )
                }

                const post = shelfPostsBySlug[link.slug.replace(/^\//, '')]
                const icon = post?.thumbnail?.publicURL

                return (
                  <Link className="post" to={link.slug} key={link.slug}>
                    <div>
                      {icon && <img src={icon} alt="" width="25" height="25" />}
                      {link.title ?? post?.title}
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}

        <section className="section-index">
          <Heading title="Recently" slug="/blog" buttonText="All Posts" />
          <Posts data={recent} />
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
    latestPosts: allMarkdownRemark(
      limit: 4
      sort: { frontmatter: { date: DESC } }
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
    shelfPosts: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      nodes {
        frontmatter {
          slug
          title
          thumbnail {
            publicURL
          }
        }
      }
    }
  }
`
