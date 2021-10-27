import React, { useState, useEffect } from 'react'
import { useLocation } from '@reach/router'
import Helmet from 'react-helmet'

import favicon from '../assets/nav-floppy.png'
import { Nav } from './Nav'
import { Sidebar } from './Sidebar'
import { FileHeader } from './FileHeader'
import { Footer } from './Footer'

import '../style.css'
import '../new-moon.css'
import '../light-theme.css'

function setDarkTheme(setTheme) {
  localStorage.setItem('theme', 'dark')
  setTheme('dark')
  document.body.style.backgroundColor = '#272727'
}

function setLightTheme(setTheme) {
  localStorage.setItem('theme', 'light')
  setTheme('light')
  document.body.style.backgroundColor = 'white'
}

function getMainClass(theme, collapsed, slug) {
  let classString = 'theme'
  classString += ` ${theme}`

  if (collapsed) {
    classString += ' collapsed'
  }

  if (slug.includes('/notes') || slug.includes('/resume')) {
    classString += ' no-sidebar'
  }

  return classString
}

export const Layout = ({ children }) => {
  const location = useLocation()
  const [theme, setTheme] = useState('dark')
  const [collapsed, setCollapsed] = useState(false)
  const slug = location.pathname

  const onUpdateTheme = (theme) => {
    theme === 'dark' ? setLightTheme(setTheme) : setDarkTheme(setTheme)
  }

  useEffect(() => {
    const primaryColor = localStorage.getItem('primary')
    const savedTheme = localStorage.getItem('theme')

    if (primaryColor) {
      document.documentElement.style.setProperty('--primary', primaryColor)
    }

    if (savedTheme) {
      savedTheme === 'dark' ? setDarkTheme(setTheme) : setLightTheme(setTheme)
    }
  }, [])

  return (
    <>
      <Helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>

      <div className={getMainClass(theme, collapsed, slug)}>
        <Nav />
        {!(slug.includes('/notes') || slug.includes('/resume')) && <Sidebar />}
        <FileHeader
          setCollapsed={setCollapsed}
          onUpdateTheme={() => onUpdateTheme(theme)}
          theme={theme}
        />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
