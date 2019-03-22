import React, { Component } from 'react'
import NewsletterForm from './NewsletterForm'

class Newsletter extends Component {
  render() {
    return (
      <>
        <h1>Stay in touch</h1>
        <p>Like the posts you see here? Sign up to get notified about new ones.</p>
        <NewsletterForm />
        <p>
          For anything else, email me at <a href="mailto:me@taniarascia.com">me@taniarascia.com</a>.
        </p>
      </>
    )
  }
}

export default Newsletter
