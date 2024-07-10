import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { SidebarLayout } from '../components/SidebarLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function Notes({ data }) {
  const posts = data.posts.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const title = 'Notes'
  const description =
    'Personal notes about life, music, art, projects, and everything else I want to write about.'

  return (
    <div>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <SidebarLayout>
        <Hero title={title} description={description} />
        <Posts data={simplifiedPosts} showYears />
      </SidebarLayout>
    </div>
  )
}

Notes.Layout = Layout

export const notesQuery = graphql`
  query NotesQuery {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Personal" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            # tags
            # categories
          }
        }
      }
    }
  }
`
