import '../style.css'
import '../new-moon.css'

import React, { useEffect } from 'react'
import Helmet from 'react-helmet'

import favicon from '../assets/nav-floppy.png'
import { Nav } from './Nav'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export const Layout = ({ children }) => {
  useEffect(() => {
    const primaryColor = localStorage.getItem('primary')

    if (primaryColor) {
      document.documentElement.style.setProperty('--primary', primaryColor)
    }
  }, [])

  return (
    <>
      <Helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>

      <Nav />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
