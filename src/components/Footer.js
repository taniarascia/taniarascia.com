import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <small>
          Made by <strong>Tania Rascia</strong> /{' '}
          <a href="https://github.com/taniarascia/taniarascia.com" target="_blank">
            View source
          </a>
        </small>
      </footer>
    )
  }
}
