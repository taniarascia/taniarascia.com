import React, { Component } from 'react'

class NewsletterForm extends Component {
  render() {
    return (
      <form
        id="newsletter-form"
        className="newsletter-form"
        action="https://newsletter.taniarascia.com/sendy/subscribe"
        method="POST"
        acceptCharset="utf-8"
        target="_blank"
      >
        <input
          type="email"
          name="email"
          required
          id="email-sidebar"
          className="email"
          placeholder="Email address"
          pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}"
        />
        <input type="hidden" name="list" value="P2bfC2WL3TvnTWEmucMbbg" />
        <input type="submit" name="submit" id="submit-sidebar" value="Submit" />
      </form>
    )
  }
}

export default NewsletterForm
