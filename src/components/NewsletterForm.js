import React, { Component } from 'react'

export default class NewsletterForm extends Component {
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
        <input type="email" name="email" required className="email" placeholder="Email address" />
        <input type="hidden" name="list" value="P2bfC2WL3TvnTWEmucMbbg" />
        <input type="submit" name="submit" id="submit-sidebar" value="Submit" />
      </form>
    )
  }
}
