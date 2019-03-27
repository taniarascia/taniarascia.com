import React, { Component } from 'react'
import NewsletterForm from './NewsletterForm'

class Contact extends Component {
  render() {
    return (
      <>
        <h1>Stay in touch</h1>
        <p>Like the posts you see here? Sign up to get notified about new ones.</p>
        <NewsletterForm />
        <p>You can find me around the web:</p>
        <ul>
          <li>
            <strong>Email</strong>: <a href="mailto:me@taniarascia.com">me@taniarascia.com</a>
          </li>
          <li>
            <strong>GitHub</strong>:{' '}
            <a target="_blank" href="https://github.com/taniarascia">
              taniarascia
            </a>
          </li>
          <li>
            <strong>Twitter</strong>:{' '}
            <a target="_blank" href="https://twitter.com/taniarascia">
              taniarascia
            </a>
          </li>
        </ul>
      </>
    )
  }
}

export default Contact
