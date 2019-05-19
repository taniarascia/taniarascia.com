import React, { Component } from 'react'
import GitHubButton from 'react-github-btn'

export default class ProjectListing extends Component {
  render() {
    const { projects } = this.props

    return (
      <section className="projects">
        {projects.map(project => (
          <div className="each" key={project.title}>
            <h2>
              <a
                className="project-link"
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="project-icon">{project.icon}</div>
                <div className="project-title">{project.title}</div>
              </a>
            </h2>
            <p>{project.description}</p>
            <div className="buttons">
              {project.path && (
                <a className="button" href={project.path} target="_blank" rel="noopener noreferrer">
                  Site
                </a>
              )}
              <GitHubButton href={project.source} data-size="large" data-show-count="true">
                Source
              </GitHubButton>
            </div>
          </div>
        ))}
      </section>
    )
  }
}
