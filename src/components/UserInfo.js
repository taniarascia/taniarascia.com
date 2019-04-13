import React, { Component } from 'react'
import tania from '../../content/images/taniawarm.jpg'

class UserInfo extends Component {
  render() {
    return (
      <aside className="note">
        <div className="container note-container">
          <div className="flex-author">
            <h2>A note from the author</h2>
            <p>
              Hi! I'm Tania. I'm a Full-stack Software Developer specializing in modern JavaScript development. I write free, quality content that helps thousands of people daily, and <mark>I turn down
              everyone who offers to put ads, affiliate links, and sponsored posts</mark> on my website.
            </p>
            <p>
              <strong>If you enjoy my content, please consider supporting what I do!</strong>
            </p>

            <a href="https://ko-fi.com/taniarascia" className="donate-button" target="_blank">
              Support me
            </a>
            <a
              className="patreon-button"
              href="https://www.patreon.com/taniarascia"
              target="_blank"
            >
              Patreon
            </a>
          </div>
          <div className="flex-avatar">
            <img className="avatar" src={tania} />
          </div>
        </div>
      </aside>
    )
  }
}

export default UserInfo
