import React, { useState, useEffect } from 'react'
import { useLocation } from '@reach/router'
import Helmet from 'react-helmet'

import favicon from '../assets/nav-floppy.png'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

import '../style.css'

function getMainClass(theme, collapsed) {
  let classString = theme

  if (collapsed) {
    classString += ' collapsed'
  }

  return classString
}

export const Layout = ({ children }) => {
  const location = useLocation()
  const [theme, setTheme] = useState('dark')
  const [collapsed, setCollapsed] = useState(true)
  const slug = location.pathname

  const onUpdateTheme = (theme) => {}

  useEffect(() => {
    // const savedTheme = localStorage.getItem('theme')
  }, [])

  return (
    <>
      <Helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>

      <div className={getMainClass(theme, collapsed, slug)}>
        <Navigation
          setCollapsed={setCollapsed}
          onUpdateTheme={() => onUpdateTheme(theme)}
          theme={theme}
        />
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  )
}
