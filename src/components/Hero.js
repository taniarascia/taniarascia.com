import React from 'react'

export const Hero = ({
  highlight,
  subTitle,
  title,
  post,
  color = 'rainbow',
  children,
  index,
}) => {
  return (
    <header className={`hero ${index ? 'index' : ''}`}>
      <div className="container">
        {subTitle && (
          <div className="sub-title">
            {highlight && <span className="highlight">{highlight}</span>}
            {subTitle}
          </div>
        )}
        {title && <h1 className={post ? 'post-title' : ''}>{title}</h1>}
        {children && children}
      </div>
      {/* {!post && color !== 'none' && (
        <div className={`lines diagonal in-hero${index ? '-index' : ''}`}>
          {Array.from(Array(5)).map((_, i) => (
            <div key={_} className={`line ${color}-${i + 1}`} />
          ))}
        </div>
      )} */}
    </header>
  )
}
