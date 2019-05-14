import React, { Component } from 'react'

export default class ProjectListing extends Component {
  render() {
    const { projects } = this.props

    return (
      <section className="projects">
        {projects.map(project => (
          <div className="each" key={project.title}>
            <h2>
              <a href={project.source} target="_blank" rel="noopener noreferrer">
                {project.title}
              </a>
            </h2>
            <p>{project.description}</p>
            <div className="buttons">
              {project.path ? (
                <a className="button" href={project.path} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              ) : null}
              <a className="muted-button button" href={project.source}>
                Source
              </a>
            </div>
          </div>
        ))}
      </section>
    )
  }
}
