import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <div>
        <strong>Tania Rascia</strong>
          {' '}
/
          {' '}
          <a href="https://twitter.com/taniarascia" target="_blank">
            Twitter
          </a>
          {' '}
          /
          {' '}
          <a href="https://github.com/taniarascia" target="_blank">
            GitHub
          </a>
          {' '}
          /
          {' '}
          <a href="https://github.com/taniarascia/taniarascia.com" target="_blank">
            View source
          </a>
        </div>
      </footer>
    )
  }
}
