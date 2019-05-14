import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <div>
          <strong>Tania Rascia</strong>
          {' / '}
          <a href="https://twitter.com/taniarascia" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          {' / '}
          <a href="https://github.com/taniarascia" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {' / '}
          <a
            href="https://github.com/taniarascia/taniarascia.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source
          </a>
        </div>
      </footer>
    )
  }
}
