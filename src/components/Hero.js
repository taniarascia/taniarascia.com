import React from 'react'

export const Hero = ({
  highlight,
  subTitle,
  title,
  description,
  children,
  index,
}) => {
  return (
    <header className={`hero ${index ? 'index' : ''}`}>
      {subTitle && (
        <div className="sub-title">
          {highlight && <span className="highlight">{highlight}</span>}
          {subTitle}
        </div>
      )}
      {title && <h1>{title}</h1>}
      {description && <div className="hero-description">{description}</div>}

      {children}
    </header>
  )
}
