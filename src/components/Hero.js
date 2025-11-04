import React from 'react'
import { Link } from 'gatsby'

export const Hero = ({
  highlight,
  subTitle,
  title,
  date,
  description,
  children,
  type = 'page',
  breadcrumb,
  hasSearch,
}) => {
  return (
    <header
      className={`hero hero-${type}`}
      style={hasSearch ? { marginBottom: '1.5rem' } : {}}
    >
      {subTitle && (
        <div className="sub-title">
          {breadcrumb && (
            <div>
              <Link to={breadcrumb.value}>{breadcrumb.label}</Link> /
            </div>
          )}
          <div>
            {highlight && <span className="highlight">{highlight}</span>}
            <span>{subTitle}</span>
          </div>
        </div>
      )}
      {date && <div className="post-date">{date}</div>}
      {title && <h1 className={date ? 'has-date' : ''}>{title}</h1>}
      {description && (
        <div
          className="hero-description"
          style={hasSearch ? { marginBottom: '0' } : {}}
        >
          {description}
        </div>
      )}

      {children}
    </header>
  )
}
