import React, { Component } from 'react'

export default class SimpleListing extends Component {
  render() {
    const { data } = this.props

    return (
      <section className="simple-posts">
        {data.map(post => {
          return (
            <a href={post.path} key={post.title} target="_blank">
              <div className="each">
                <h2>
                  <img src={post.img} />
                  {post.title}
                </h2>
              </div>
            </a>
          )
        })}
      </section>
    )
  }
}
