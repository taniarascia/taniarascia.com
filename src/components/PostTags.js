import React, { Component } from 'react'
import { kebabCase } from '../utils/global'
import { Link } from 'gatsby'

class PostTags extends Component {
  render() {
    const { tags } = this.props
    return (
      <div className="post-tag-container">
        {tags &&
          tags.map(tag => (
            <Link key={tag} style={{ textDecoration: 'none' }} to={`/tags/${kebabCase(tag)}`}>
              <button>{tag}</button>
            </Link>
          ))}
      </div>
    )
  }
}

export default PostTags
