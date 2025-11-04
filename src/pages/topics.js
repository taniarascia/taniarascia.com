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
        <Hero
          title={title}
          description="All the topics I've covered. I write about front and backend software development, design, architecture, and personal topics."
        />
        {Object.entries(groupTags).map(([key, value]) => {
          return (
            <div key={key} className="alphabetical-tags">
              <h3>{key.toUpperCase()}</h3>
              <div className="cards four-columns">
                {value.map((tag) => {
                  return (
                    <Link
                      key={tag.name}
                      to={`/topics/${slugify(tag.name)}`}
                      className="card card-highlight flex-space-between"
                      activeClassName="active"
                    >
                      <span>{tag.name}</span>
                      <span className="chip">
                        {tag.totalCount}{' '}
                        {tag.totalCount === 1 ? ' post' : ' posts'}
                      </span>
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
