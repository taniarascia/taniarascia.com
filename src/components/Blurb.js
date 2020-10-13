import React from 'react'

import tania from '../../content/images/dither.jpg'

export default function Blurb({ title, children }) {
  return (
    <section className="blurb">
      <div className="container">
        <div>
          <img src={tania} alt="Tania" className="avatar" />
        </div>
        <div>
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    </section>
  )
}
