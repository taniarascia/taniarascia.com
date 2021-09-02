import React from 'react'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO }  from '../components/SEO'
import config from '../utils/config'

export default function FourOhFour() {
  return (
    <>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <SEO />

      <article>
        <header>
          <div className="container">
            <h1>404</h1>
            <p className="description">This was probably a mistake.</p>
          </div>
        </header>

        <section>
          <div className="container">
            <img
              src="/logo.png"
              alt="Logo"
              style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
            />
          </div>
        </section>
      </article>
    </>
  )
}

FourOhFour.Layout = Layout
