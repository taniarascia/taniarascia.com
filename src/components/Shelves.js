import React, { useMemo } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import { Heading } from './Heading'
import { shelvesList } from '../data/shelvesList'
import { slugify } from '../utils/helpers'

export const Shelves = () => {
  const data = useStaticQuery(graphql`
    query ShelvesQuery {
      shelfPosts: allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "post" } } }
      ) {
        nodes {
          frontmatter {
            slug
            title
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
  `)

  const shelfPostsBySlug = useMemo(() => {
    const map = {}

    data.shelfPosts.nodes.forEach(({ frontmatter }) => {
      map[frontmatter.slug] = frontmatter
    })

    return map
  }, [data.shelfPosts])

  return (
    <>
      {shelvesList.map((shelf) => (
        <section
          className="section-index"
          id={slugify(shelf.title)}
          key={shelf.title}
        >
          <Heading
            title={shelf.title}
            description={shelf.description}
            slug={shelf.slug}
            buttonText={shelf.buttonText}
          />
          <div className="posts shelf">
            {shelf.links.map((link) => {
              if (link.url) {
                return (
                  <a
                    className="post"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    key={link.title}
                  >
                    <div>{link.title}</div>
                  </a>
                )
              }

              const post = shelfPostsBySlug[link.slug.replace(/^\//, '')]
              const icon = post?.thumbnail?.publicURL

              return (
                <Link className="post" to={link.slug} key={link.slug}>
                  <div>
                    {icon && <img src={icon} alt="" width="25" height="25" />}
                    {link.title ?? post?.title}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
