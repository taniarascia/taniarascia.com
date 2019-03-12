import React, { Component } from 'react'

class ProjectListing extends Component {
  render() {
    const projectList = this.props.projects

    return (
      <section className="projects">
        {projectList.map(project => (
          <div className="each" key={project.title}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="buttons">
              {project.path ? (
                <a className="button" href={project.path} target="_blank">
                  Project
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

export default ProjectListing
