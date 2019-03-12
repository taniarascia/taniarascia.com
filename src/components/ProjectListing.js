import React, { Component } from 'react'

class ProjectListing extends Component {
  render() {
    const projectList = this.props.projects

    return (
      <section className="projects">
        {projectList.map(project => (
          <a href={project.path} key={project.title}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </a>
        ))}
      </section>
    )
  }
}

export default ProjectListing
