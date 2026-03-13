import React from 'react'

export const Heading = ({ title, icon, description }) => {
  return (
    <header className="heading">
      <h2>
        {icon && <img src={icon} alt="Icon" className="heading-icon" />}
        <span>{title}</span>
      </h2>
      {description && <div className="description">{description}</div>}
    </header>
  )
}
