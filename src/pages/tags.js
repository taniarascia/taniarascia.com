import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import config from '../utils/config'

import { slugify } from '../utils/helpers'
import { SidebarLayout } from '../components/SidebarLayout'
import { Layout } from '../components/Layout'
import { Hero } from '../components/Hero'

export default function Tags({ data }) {
  const tags = data.tags.group
  const title = 'Tags'
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
    <div>
      <Helmet title={`${title} | ${config.siteTitle}`} />

      <SidebarLayout>
        <Hero title={title} />
        <section className="segment">
          {Object.entries(groupTags).map(([key, value]) => {
            return (
              <div key={key} className="alphabetical-tags">
                <h3>{key.toUpperCase()}</h3>
                <div className="tags">
                  {value.map((tag) => {
                    return (
                      <Link
                        key={tag.name}
                        to={`/tags/${slugify(tag.name)}`}
                        className="tag"
                        activeClassName="active"
                      >
                        {tag.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>
      </SidebarLayout>
    </div>
  )
}

Tags.Layout = Layout

export const tagsQuery = graphql`
  query TagsQuery {
    tags: allMarkdownRemark {
      group(field: frontmatter___tags) {
        name: fieldValue
        totalCount
      }
    }
  }
`
