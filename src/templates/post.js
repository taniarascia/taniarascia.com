import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Suggested from '../components/Suggested'
import SEO from '../components/SEO'
import Comment from '../components/Comment'

import config from '../utils/config'

export default function PostTemplate({ data, pageContext, ...props }) {
  const post = data.markdownRemark
  const { previous, next } = pageContext
  const { thumbnail } = post.frontmatter
  const commentBox = React.createRef()

  useEffect(() => {
    const commentScript = document.createElement('script')
    const theme =
      typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
        ? 'github-dark'
        : 'github-light'
    commentScript.async = true
    commentScript.src = 'https://utteranc.es/client.js'
    commentScript.setAttribute('repo', 'taniarascia/comments') // CHANGE THIS if you're just going to clone this repo and use the code. Do not test your code using my repo.
    commentScript.setAttribute('issue-term', 'pathname')
    commentScript.setAttribute('id', 'utterances')
    commentScript.setAttribute('theme', theme)
    commentScript.setAttribute('crossorigin', 'anonymous')
    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(commentScript)
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`)
    }
  }, []) // eslint-disable-line

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />
      <div className="container">
        <section className="grid post">
          <article>
            <header className="article-header">
              <div className="container">
                <div className="thumb">
                  {thumbnail && (
                    <Img
                      fixed={thumbnail.childImageSharp.fixed}
                      className="post-thumbnail"
                    />
                  )}
                  <h1>{post.frontmatter.title}</h1>
                </div>
                {post.frontmatter.description && (
                  <p className="description">{post.frontmatter.description}</p>
                )}
              </div>
            </header>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <div id="comments">
              <h2>Comments</h2>
              <Comment commentBox={commentBox} />
            </div>
          </article>
          <Sidebar post={post} {...props} />
        </section>
        <Suggested previous={previous} next={next} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        description
        thumbnail {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
