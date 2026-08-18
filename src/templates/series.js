import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { getSimplifiedPosts, slugify } from '../utils/helpers'
import { seriesList } from '../data/seriesList'
import { useContentImages } from '../utils/hooks/useContentImages'
import config from '../utils/config'

export default function SeriesTemplate({ data, pageContext }) {
  const { series } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const imagesByPath = useContentImages()
  const message = ' part series'
  const seriesInfo = seriesList.find(
    (entry) => entry.slug === `/series/${slugify(series.toLowerCase())}`
  )
  const description =
    seriesInfo?.description ?? `All ${totalCount} parts of the ${series} series.`

  return (
    <>
      <Helmet title={`${series} | ${config.siteTitle}`} />
      <SEO customTitle={series} customDescription={description} />

      <PageLayout>
        <Hero
          highlight={totalCount}
          subTitle={message}
          title={series}
          type="taxonomy"
          description={description}
          icon={seriesInfo && imagesByPath[seriesInfo.icon]}
        />
        <Posts data={simplifiedPosts} includeYear numbered />
      </PageLayout>
    </>
  )
}

SeriesTemplate.Layout = Layout

export const pageQuery = graphql`
  query SeriesPage($series: String) {
    allMarkdownRemark(
      sort: { frontmatter: { date: ASC } }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
          }
        }
      }
    }
  }
`
