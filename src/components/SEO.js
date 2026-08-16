import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { getSrc } from 'gatsby-plugin-image'

import config from '../utils/config'

export const SEO = ({ postNode, postPath, postSEO, customDescription }) => {
  const location = useLocation()
  const pageURL = `${config.siteUrl}${location.pathname}`

  let title = config.siteTitle
  let description = customDescription || config.description
  let image = config.siteLogo
  let postURL

  if (postSEO) {
    const postMeta = postNode.frontmatter
    title = postMeta.title
    description = postMeta.description || postNode.excerpt

    const thumbnailSrc = getSrc(
      postMeta.socialImage?.childImageSharp?.gatsbyImageData
    )

    if (thumbnailSrc) {
      image = thumbnailSrc
    }

    postURL = `${config.siteUrl}${postPath}`
  }

  image = `${config.siteUrl}${image}`
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: config.siteUrl,
      name: config.siteTitle,
    },
  ]

  if (postSEO) {
    schemaOrgJSONLD.push({
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      url: postURL,
      name: title,
      headline: title,
      image: {
        '@type': 'ImageObject',
        url: image,
      },
      description,
      author: {
        '@type': 'Person',
        name: config.siteAuthor,
        url: config.siteUrl,
      },
      publisher: {
        '@type': 'Person',
        name: config.siteAuthor,
        url: config.siteUrl,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': postURL,
      },
      datePublished: postNode.frontmatter.dateISO,
      dateModified: postNode.frontmatter.dateISO,
    })
  }

  return (
    <Helmet>
      <meta name="description" content={description} />

      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      <meta property="og:url" content={postSEO ? postURL : pageURL} />
      <meta property="og:type" content={postSEO ? 'article' : 'website'} />
      <meta property="og:site_name" content={config.siteTitle} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
