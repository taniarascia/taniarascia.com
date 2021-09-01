import '../style.css'
import '../new-moon.css'

import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'

import favicon from '../assets/nav-floppy.png'
import { Nav } from './Nav'
import { Sidebar } from './Sidebar'
import { FileHeader } from './FileHeader'
import { Footer } from './Footer'

export const Layout = ({ children }) => {
  const [theme, setTheme] = useState('dark')

  const onUpdateTheme = () => {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light')
      setTheme('light')
      document.body.style.backgroundColor = 'white'
    } else {
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
      document.body.style.backgroundColor = '#272727'
    }
  }

  useEffect(() => {
    const primaryColor = localStorage.getItem('primary')
    const theme = localStorage.getItem('theme')

    if (primaryColor) {
      document.documentElement.style.setProperty('--primary', primaryColor)
    }

    if (theme) {
      setTheme(theme)
    }
  }, [])

  return (
    <>
      <Helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>

      <div className={theme + ' theme'}>
        <Nav onUpdateTheme={onUpdateTheme} />
        <Sidebar />
        <FileHeader />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
