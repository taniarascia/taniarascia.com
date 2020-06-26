import React from 'react'

export default function Lists({ data }) {
  return (
    <div className="grid lists">
      {data.map((node) => {
        return (
          <a
            href={node.path}
            className="row"
            key={node.path}
            target="_blank"
            rel="noreferrer"
          >
            <div className="cell simple">
              <span className="meta">{node.meta}</span>
            </div>
            <div className="cell simple">{node.title}</div>
          </a>
        )
      })}
    </div>
  )
}
