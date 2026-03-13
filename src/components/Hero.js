import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

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
  icon,
  thumbnail,
}) => {
  return (
    <header
      className={`hero hero-${type}`}
      style={hasSearch ? { marginBottom: '1.5rem' } : {}}
    >
      {subTitle && (
        <div className="sub-title">
          {breadcrumb && (
            <>
              <Link to={breadcrumb.value}>{breadcrumb.label}</Link>{' '}
              <span>/</span>
            </>
          )}
          <div>
            {highlight && <span className="highlight">{highlight}</span>}
            <span>{subTitle}</span>
          </div>
        </div>
      )}
      {date && <div className="post-date">{date}</div>}
      {title && (
        <h1 className={date ? 'has-date' : 'flex-align-center large-gap'}>
          {icon && <img src={icon} alt="Icon" />}
          {thumbnail && (
            <GatsbyImage
              image={thumbnail?.childImageSharp?.gatsbyImageData}
              alt="Thumbnail"
            />
          )}
          {title}
        </h1>
      )}
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
