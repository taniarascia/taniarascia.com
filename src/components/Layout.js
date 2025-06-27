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
  const [collapsed, setCollapsed] = useState(false)

  const handleUpdateTheme = (newTheme) => {
    const html = document.documentElement
    window.localStorage.setItem('theme', newTheme)
    document.documentElement.style.setProperty('color-scheme', newTheme)

    if (newTheme === 'light') {
      html.classList.add('is-light')
      html.classList.remove('is-dark')
    }

    if (newTheme === 'dark') {
      html.classList.add('is-dark')
      html.classList.remove('is-light')
    }

    setTheme(newTheme)
  }

  const handleCollapse = () => {
    if (collapsed) {
      window.localStorage.setItem('sidebar-collapsed', 'false')
      setCollapsed(false)
    } else {
      window.localStorage.setItem('sidebar-collapsed', 'true')
      setCollapsed(true)
    }
  }

  useEffect(() => {
    const html = document.documentElement
    const savedTheme = window.localStorage.getItem('theme')
    const savedSidebarCollapsed =
      window.localStorage.getItem('sidebar-collapsed')

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.style.setProperty('color-scheme', savedTheme)

      if (savedTheme === 'light') {
        html.classList.add('is-light')
        html.classList.remove('is-dark')
      }

      if (savedTheme === 'dark') {
        html.classList.add('is-dark')
        html.classList.remove('is-light')
      }
    }

    if (savedSidebarCollapsed) {
      setCollapsed(savedSidebarCollapsed === 'true' ? true : false)
    }
  }, [])

  return (
    <div>
      <Helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>

      <div id="layout" className={collapsed ? 'layout collapsed' : 'layout'}>
        <Navigation
          handleUpdateTheme={handleUpdateTheme}
          theme={theme}
          handleCollapse={handleCollapse}
          collapsed={collapsed}
        />
        <Sidebar collapsed={collapsed} />
        <div className="main-wrapper" id="introduction">
          <div className="main-container">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
