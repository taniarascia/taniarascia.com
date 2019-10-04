import React, { Component } from 'react'

export default class NewsletterForm extends Component {
  render() {
    return (
      <div className="centered-iframe">
        <iframe
          width="480"
          height="150"
          src="https://taniarascia.substack.com/embed"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    )
  }
}
