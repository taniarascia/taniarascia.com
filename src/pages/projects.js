import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import { ExternalLinkIcon } from '../assets/ExternalLinkIcon'
import { StarIcon } from '../assets/StarIcon'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import config from '../utils/config'
import { projects } from '../data/projects'

export default function Projects() {
  const [repos, setRepos] = useState([])
  const title = 'Projects'

  console.log(repos)

  useEffect(() => {
    async function getStars() {
      const repos = await fetch(
        'https://api.github.com/users/taniarascia/repos?per_page=100'
      )

      return repos.json()
    }

    getStars()
      .then((data) => {
        setRepos(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO />
      <Hero subTitle="Open-source" title={title} color="red" />

      <section className="segment">
        <div className="container">
          <div className="project-preview">
            {projects.map((project) => {
              return (
                <div className="card anchored large">
                  <div className="stars">
                    {repos.find((repo) => repo.name === project.slug) && (
                      <div className="star">
                        <a
                          href={`https://github.com/taniarascia/${project.slug}/stargazers`}
                        >
                          {Number(
                            repos.find((repo) => repo.name === project.slug)
                              .stargazers_count
                          ).toLocaleString()}
                        </a>
                        <StarIcon />
                      </div>
                    )}
                  </div>
                  <div>
                    <time>{project.date}</time>
                    <a
                      className="card-header"
                      href={`https://github.com/taniarascia/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                    <p>{project.tagline}</p>
                  </div>
                  <div className="links anchored">
                    {project.writeup && (
                      <Link className="button" to={project.writeup}>
                        Article
                      </Link>
                    )}
                    {project.url && (
                      <a
                        className="button flex"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Demo <ExternalLinkIcon />
                      </a>
                    )}
                    <a
                      className="button flex"
                      href={`https://github.com/taniarascia/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

Projects.Layout = Layout
