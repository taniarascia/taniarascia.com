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
import { seriesList } from '../data/seriesList'
import { getSimplifiedPosts, slugify } from '../utils/helpers'
// import { useContentImages } from '../utils/hooks/useContentImages'
import config from '../utils/config'
import github from '../assets/nav-github.png'

export default function Index({ data }) {
  const latestPosts = data.latestPosts.edges
  const postCount = data.postCount.totalCount
  // const imagesByPath = useContentImages()
  const recent = useMemo(
    () => getSimplifiedPosts(latestPosts, { thumbnails: true }),
    [latestPosts]
  )

  return (
    <>
      <Helmet title={config.siteTitle} />
      <SEO />

      <PageLayout>
        <Hero type="index">
          <div className="hero-wrapper">
            <div>
              <h1 className="flex-align-center gap">Hey, I'm Tania!</h1>
              <p className="hero-description hero-tagline">
                Principal software engineer, writer, all-around nerd.
              </p>
              <Heading title="A brief timeline" small />
              <ul className="hero-eras">
                <li>
                  <span className="era-dates">1998&ndash;2006</span>
                  <span>
                    Geocities kid, forum-goer, gamer, lover of obscure '80s
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
                    senior engineer.{' '}
                    <Link to="/everything-i-know-as-a-software-developer-without-a-degree">
                      Wrote everything down
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
                <Link to="/me">Also</Link>: city explorer, weight-lifter,
                brick-clicker, accordion enthusiast, biker, Magic gatherer,
                webmaster.
              </p>
            </div>
            <div className="hero-image-container">
              <img src="/ram.png" className="hero-image" alt="RAM Ram" />
              <aside className="hero-bubble">
                Can't remember how to spell my name? Just go to{' '}
                <a href="https://tania.dev">tania.dev</a>!
              </aside>
            </div>
          </div>
        </Hero>

        <section className="section-index">
          <Heading title="Latest" slug="/blog" buttonText="All Posts" />
          <Posts data={recent} detailed />
        </section>

        <section className="section-index">
          <Heading
            title="Shelves"
            slug="/shelves"
            buttonText="All Shelves"
            description="Hand-picked paths through everything I've written."
          />
          <div className="cards cards-half">
            {shelvesList.map((shelf) => (
              <Link
                className="card card-highlight card-shelf"
                to={`/shelves#${slugify(shelf.title)}`}
                key={shelf.title}
              >
                <div className="flex-space-between">
                  <div className="card-title">{shelf.title}</div>
                  <div className="chip">
                    <span className="chip-highlight">{shelf.links.length}</span>
                  </div>
                </div>
                <p>{shelf.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-index">
          <Heading
            title="Series"
            description="Some things I wrote span years or dozens of parts."
          />
          <div className="posts shelf">
            {seriesList.map((series) => (
              <Link className="post" to={series.slug} key={series.slug}>
                <div>{series.title}</div>
              </Link>
            ))}
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
                        <Link to={project.writeup}>Article</Link>
                      )}
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noreferrer">
                          Demo
                        </a>
                      )}
                      <a
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
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
    postCount: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      totalCount
    }
  }
`
