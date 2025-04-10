import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import config from '../utils/config'

import { slugify } from '../utils/helpers'
import { PageLayout } from '../components/PageLayout'
import { Layout } from '../components/Layout'
import { Hero } from '../components/Hero'

export default function Topics({ data }) {
  const tags = data.tags.group
  const title = 'Topics'
  const groupTags = useMemo(
    () =>
      tags.reduce((letterMap, tag) => {
        const letter = tag.name.charAt(0)
        const newArr = letterMap[letter] ? [...letterMap[letter], tag] : [tag]

        return { ...letterMap, [letter]: newArr }
      }, {}),
    [tags]
  )

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <PageLayout>
        <Hero title={title} />
        {Object.entries(groupTags).map(([key, value]) => {
          return (
            <div key={key} className="alphabetical-tags">
              <h3>{key.toUpperCase()}</h3>
              <div className="tags">
                {value.map((tag) => {
                  return (
                    <Link
                      key={tag.name}
                      to={`/topics/${slugify(tag.name)}`}
                      className="button small"
                      activeClassName="active"
                    >
                      <span>{tag.name}</span>
                      <span className="tag-count">{tag.totalCount}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </PageLayout>
    </>
  )
}

Topics.Layout = Layout

export const tagsQuery = graphql`
  query TopicsQuery {
    tags: allMarkdownRemark {
      group(field: { frontmatter: { tags: SELECT } }) {
        name: fieldValue
        totalCount
      }
    }
  }
`
