import React from 'react'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import config from '../utils/config'

const images = [
  { url: '/illustrations/Ram.png', title: 'RAM Ram' },
  { url: '/illustrations/Kohaku.png', title: 'Kohaku River' },
  { url: '/illustrations/Slurms.png', title: 'Slurms MacKenzie' },
  { url: '/illustrations/Charizard.png', title: 'Charizard' },
  { url: '/illustrations/MechaRam.png', title: 'Mecha Ram' },
  { url: '/illustrations/Squirtle.png', title: 'Squirtle' },
  { url: '/illustrations/Wartortle.png', title: 'Wartortle' },
  { url: '/illustrations/Blastoise.png', title: 'Blastoise' },
  { url: '/illustrations/Oddish.png', title: 'Oddish' },
  { url: '/illustrations/Bulbasaur.png', title: 'Bulbasaur' },
]

export default function Illustration() {
  const title = 'Illustration'

  return (
    <div>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO />
      <div className="container">
        <Hero title={title} color="red" />
      </div>

      <section className="segment">
        <div className="container">
          <div className="image-preview">
            {images.map((image) => {
              return (
                <div className="card" key={image.url}>
                  <a href={image.url} target="_blank" rel="noreferrer">
                    <h2>{image.title}</h2>

                    <div
                      className="image-thumbnail"
                      style={{ backgroundImage: `url('${image.url}')` }}
                      alt={image.title}
                    />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

Illustration.Layout = Layout
