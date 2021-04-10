import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import config from '../utils/config'
import takeNote from '../../content/images/takenoteproject.png'
import laconia from '../../content/images/laconiaproject.png'
import primitive from '../../content/images/primitiveproject.png'
import chip8 from '../../content/images/chip8project.png'

export default function ProjectsIndex() {
  return (
    <Layout>
      <Helmet title={`Projects | ${config.siteTitle}`} />
      <SEO />
      <div className="container">
        <header>
          <h1>Projects.</h1>
          <p className="subtitle">A few open-source projects I've created.</p>
          <h2>TakeNote</h2>
          <p></p>
          <a href="https://github.com/taniarascia/takenote" className="button">
            Source
          </a>
          <a href="https://takenote.dev/app" className="button">
            Demo
          </a>
          <a href="https://takenote.dev" className="link-image" target="_blank">
            <img src={takeNote} />
          </a>

          <h2>Chip8.js</h2>
          <p></p>
          <a href="https://github.com/taniarascia/chip8" className="button">
            Source
          </a>
          <a href="https://taniarascia.github.io/chip8" className="button">
            Demo
          </a>
          <a
            href="https://taniarascia.github.io/chip8"
            className="link-image"
            target="_blank"
          >
            <img src={chip8} />
          </a>
          <h2>Laconia</h2>
          <p></p>
          <a href="https://github.com/taniarascia/laconia" className="button">
            Source
          </a>
          <a href="https://laconia.dev" className="button">
            Demo
          </a>
          <a href="https://laconia.dev" className="link-image" target="_blank">
            <img src={laconia} />
          </a>
          <h2>Primitive</h2>
          <p></p>
          <a href="https://github.com/taniarascia/primitive" className="button">
            Source
          </a>
          <a href="https://taniarascia.github.io/primitive" className="button">
            Demo
          </a>
          <a
            href="https://taniarascia.github.io/primitive"
            className="link-image"
            target="_blank"
          >
            <img src={primitive} />
          </a>
        </header>
      </div>
    </Layout>
  )
}
