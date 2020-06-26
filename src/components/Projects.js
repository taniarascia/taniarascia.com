import React from 'react'

export default function Projects({ data }) {
  return (
    <div className="grid projects">
      {data.map((node) => {
        return (
          <a
            href={node.path || node.source}
            key={node.path || node.source}
            className="row"
            target="_blank"
            rel="noreferrer"
          >
            <div className="cell simple">{node.icon}</div>
            <div className="cell simple">{node.title}</div>
            <div className="cell simple light description">{node.description}</div>
          </a>
        )
      })}
    </div>
  )
}
