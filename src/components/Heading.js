import React from 'react'

export const Heading = ({ title, description }) => {
  return (
    <header className="heading">
      <h2>
        <span>{title}</span>
      </h2>
      {description && <div className="description">{description}</div>}
    </header>
  )
}
