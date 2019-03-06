import React, { Component } from 'react'
import { Link } from 'gatsby'

class PostListing extends Component {
  getPostList() {
    const { postEdges } = this.props
    const postList = postEdges
      .filter(postEdge => postEdge.node.frontmatter.template === 'post')
      .map(postEdge => {
        return {
          path: postEdge.node.fields.slug,
          tags: postEdge.node.frontmatter.tags,
          thumbnail: postEdge.node.frontmatter.thumbnail,
          title: postEdge.node.frontmatter.title,
          date: postEdge.node.fields.date,
          excerpt: postEdge.node.excerpt,
          timeToRead: postEdge.node.timeToRead,
        }
      })
    return postList
  }

  render() {
    const postList = this.getPostList()

    return (
      <>
        {/* Your post list here. */
        postList.map(post => (
          <Link to={post.path} key={post.title}>
            <div className="post">{post.title}</div>
          </Link>
        ))}
      </>
    )
  }
}

export default PostListing
