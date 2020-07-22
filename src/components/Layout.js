import React from 'react'
import Helmet from 'react-helmet'

import favicon from '../../content/thumbnails/favicon.png'

import Nav from './Nav'
import Footer from './Footer'

import '../style.css'
import '../new-moon.css'

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
