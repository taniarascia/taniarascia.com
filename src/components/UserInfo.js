import React, { Component } from 'react'
import tania from '../../content/images/taniawarm.jpg'

export default class UserInfo extends Component {
  render() {
    return (
      <aside className="note">
        <div className="container note-container">
          <div className="flex-author">
            <h2>A note from the author</h2>
            <p>
              Hi! I'm Tania. I'm a full-stack software developer specializing in modern JavaScript.
              I write free, quality content that helps thousands of people daily, and{' '}
              <mark>
                I turn down everyone who offers to put ads, affiliate links, or sponsored posts
              </mark>{' '}
              on my website.
            </p>
            <p>
              <strong>If you enjoy my content, please consider supporting what I do!</strong>
            </p>

            <a href="https://ko-fi.com/taniarascia" className="donate-button" target="_blank">
              Buy me a coffee
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
