import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'

import config from '../utils/config'

// Facebook and LinkedIn reject og:image below 200px and render a text-only
// card; fall back to the site logo so shares always carry an image
const MIN_OG_IMAGE_SIZE = 200
const LOGO_SIZE = 960

export const SEO = ({
  postNode,
  postPath,
  postSEO,
  customTitle,
  customDescription,
}) => {
  const location = useLocation()
  const pageURL = `${config.siteUrl}${location.pathname}`

  let title = customTitle || config.siteTitle
  let description = customDescription || config.description
  let image = config.siteLogo
  let imageWidth = LOGO_SIZE
  let imageHeight = LOGO_SIZE
  let postURL

  if (postSEO) {
    const postMeta = postNode.frontmatter
    title = postMeta.title
    description = postMeta.description || postNode.excerpt

    const original = postMeta.socialImage?.childImageSharp?.original

    if (original && original.width >= MIN_OG_IMAGE_SIZE) {
      image = original.src
      imageWidth = original.width
      imageHeight = original.height
    }

    postURL = `${config.siteUrl}${postPath}`
  }

  image = `${config.siteUrl}${image}`

  const published = postNode?.frontmatter?.dateISO
  const modified = postNode?.frontmatter?.updatedISO || published

  const schemaOrgJSONLD = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: config.siteUrl,
      name: config.siteTitle,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: config.siteAuthor,
      url: config.siteUrl,
      sameAs: config.profiles,
    },
  ]

  if (postSEO) {
    schemaOrgJSONLD.push({
      '@context': 'https://schema.org',
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
      datePublished: published,
      dateModified: modified,
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
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={title} />

      {postSEO && (
        <meta property="article:published_time" content={published} />
      )}
      {postSEO && <meta property="article:modified_time" content={modified} />}
      {postSEO && postNode.frontmatter.categories?.[0] && (
        <meta
          property="article:section"
          content={postNode.frontmatter.categories[0]}
        />
      )}
      {postSEO &&
        postNode.frontmatter.tags?.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
