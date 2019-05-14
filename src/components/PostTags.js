import React, { Component } from 'react'
import kebabCase from 'lodash.kebabcase'
import { Link } from 'gatsby'

export default class PostTags extends Component {
  render() {
    const { tags, size } = this.props

    return (
      <div className="tag-container">
        {tags &&
          tags.map(tag => (
            <Link key={tag} style={{ textDecoration: 'none' }} to={`/tags/${kebabCase(tag)}/`}>
              <span className={size}>{tag}</span>
            </Link>
          ))}
      </div>
    )
  }
}
