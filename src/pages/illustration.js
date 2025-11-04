import React from 'react'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
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
]

export default function Illustration() {
  const title = 'Art'

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO />

      <PageLayout>
        <Hero
          title={title}
          description="I don't draw much, but here's a few illustrations."
        />

        <div className="cards">
          {images.map((image) => {
            return (
              <div className="card" key={image.url}>
                <a href={image.url} target="_blank" rel="noreferrer">
                  <div>{image.title}</div>

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
      </PageLayout>
    </>
  )
}

Illustration.Layout = Layout
