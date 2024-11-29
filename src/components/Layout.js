import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'

import favicon from '../assets/nav-floppy.png'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'

import '../styles/style.css'
import '../styles/new-moon.css'

export const Layout = ({ children }) => {
  const [theme, setTheme] = useState('dark')

  const handleUpdateTheme = (newTheme) => {
    window.localStorage.setItem('theme', newTheme)
    document.documentElement.style.setProperty('color-scheme', newTheme)

    setTheme(newTheme)
  }

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme')

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.style.setProperty('color-scheme', savedTheme)
    }
  }, [])

  return (
    <div>
      <Helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>

      <div id="layout" className="layout">
        <Navigation handleUpdateTheme={handleUpdateTheme} theme={theme} />
        <Sidebar />
        <div className="main-wrapper">
          <div className="main-container">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
