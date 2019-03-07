import React, { Component } from 'react'
import '../styles/glitch.scss'

class UserInfo extends Component {
  render() {
    return (
      <aside className="note">
        <div className="noise">
          <div className="container">
            <div className="glitch" data-text="read me">
              Read me
            </div>
            <p>
              Hi! I'm Tania. I turn down every ad, affiliate, and sponsor that contacts me. I write
              free resources that help thousands of people daily.
            </p>
            <p>If you enjoy my content, please consider supporting what I do!</p>
            <p>
              <a href="https://ko-fi.com/taniarascia" className="donate-button" target="_blank">
                Support me
              </a>
            </p>
          </div>
        </div>
      </aside>
    )
  }
}

export default UserInfo
