import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import config from '../../data/SiteConfig'
import publications from '../../data/publications'
import digitalOcean from '../../content/images/do.png'
import sitePoint from '../../content/images/sitepoint.png'
import codrops from '../../content/images/codrops.png'
import envato from '../../content/images/envato.png'
import progress from '../../content/images/progress.png'
import gatsby from '../../content/thumbnails/gatsby.png'
import logRocket from '../../content/images/logrocket.png'

export default class PublicationsPage extends Component {
  render() {
    const logoMap = {
      DigitalOcean: digitalOcean,
      SitePoint: sitePoint,
      Codrops: codrops,
      'Envato Tuts+': envato,
      Progress: progress,
      Gatsby: gatsby,
      LogRocket: logRocket,
    }

    const companyStr = Object.keys(logoMap)
      .join(', ')
      .replace(/, ([^,]*)$/, ' and $1')

    const pubs = Object.entries(publications)
    return (
      <Layout>
        <Helmet title={`Published Articles – ${config.siteTitle}`} />
        <div className="container">
          <header className="page-header">
            <h1>Publications</h1>
          </header>
          <div className="page">
            <p>I've written for {companyStr}.</p>
            {pubs.map((publication, i) => {
              const company = publication[0]
              const articles = publication[1]

              return (
                <article key={company}>
                  <h2 className="publication-company" id={company.replace(/\s/g, '')}>
                    <img src={logoMap[company]} alt="Company" />
                    {company}
                  </h2>
                  <ul key={i}>
                    {articles.map((article, f) => {
                      return (
                        <li key={f}>
                          <a href={article.path} target="_blank" rel="noopener noreferrer">
                            {article.title}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}
