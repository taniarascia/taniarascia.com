import React, { Component } from 'react'

class UserInfo extends Component {
  render() {
    return (
      <aside className="note">
        <div className="container note-container">
          <h2>A note from the author</h2>
          <p>
            Hi! I'm Tania. I write free resources that help thousands of people daily. I turn down
            every person who offers to put ads, affiliate links, and sponsored posts on my website,
            because that stuff is the worst and I'm not the enemy.
          </p>
          <p>
            <strong>If you enjoy my content, please consider supporting what I do!</strong>
          </p>
          <a href="https://ko-fi.com/taniarascia" className="donate-button" target="_blank">
            Support me <span className="emoji">☕</span>
          </a>
        </div>
      </aside>
    )
  }
}

export default UserInfo
