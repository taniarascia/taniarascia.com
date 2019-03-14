import React, { Component } from 'react'

class SimpleListing extends Component {
  render() {
    const { data } = this.props

    return (
      <section className="simple-posts">
        {data.map(post => {
          return (
            <a href={post.path} key={post.title} target="_blank">
              <div className="each">
                <h2>{post.title}</h2>
              </div>
            </a>
          )
        })}
      </section>
    )
  }
}

export default SimpleListing
