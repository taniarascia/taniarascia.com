import React, { Component } from 'react'
import { Link } from 'gatsby'

class SimpleListing extends Component {
  render() {
    const { data } = this.props

    return (
      <section className="simple">
        {data.map(post => {
          return (
            <Link to={post.path} key={post.title}>
              <div className="each">
                <h2>{post.title}</h2>
              </div>
            </Link>
          )
        })}
      </section>
    )
  }
}

export default SimpleListing
