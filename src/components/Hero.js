import React from 'react'

export const Hero = ({
  highlight,
  subTitle,
  title,
  description,
  children,
  type = 'page',
}) => {
  return (
    <header className={`hero hero-${type}`}>
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
