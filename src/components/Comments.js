import React, { Component } from 'react'
import moment from 'moment'
import config from '../../data/SiteConfig'

export default class Comments extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      comments: [],
      newComment: {
        name: '',
        website: '',
        text: '',
        slug: this.props.slug,
      },
      success: false,
      error: false,
    }

    this.state = this.initialState
  }

  componentDidUpdate(prevProps) {
    const { commentsList } = this.props

    if (prevProps.commentsList !== commentsList && commentsList.length > 0) {
      this.setState({ comments: commentsList })
    }
  }

  onSubmitComment = async event => {
    event.preventDefault()

    const { newComment, comments } = this.state
    const { slug } = this.props

    const response = await fetch(config.commentsApi, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(newComment),
    })

    if (response.status === 201) {
      this.setState(prevState => ({
        ...prevState,
        comments: [newComment, ...comments],
        newComment: {
          name: '',
          website: '',
          text: '',
          slug,
        },
        success: true,
        error: false,
      }))
    } else {
      this.setState({ ...this.initialState, error: true })
    }
  }

  handleChange = event => {
    const { newComment } = this.state
    const { name, value } = event.target

    this.setState({
      newComment: { ...newComment, [name]: value },
    })
  }

  render() {
    const {
      success,
      error,
      comments,
      newComment: { name, text },
    } = this.state

    const showError = () =>
      error && (
        <blockquote className="error">
          <p>Comment failed to submit.</p>
        </blockquote>
      )
    const showSuccess = () =>
      success && (
        <blockquote className="success">
          <p>Comment submitted!</p>
        </blockquote>
      )

    return (
      <section className="comments">
        {success || error ? (
          showError() || showSuccess()
        ) : (
          <>
            <h3>Leave a response</h3>
            <form id="new-comment" onSubmit={this.onSubmitComment}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.handleChange}
                minLength="3"
                maxLength="30"
                required
              />
              <label htmlFor="text">Response</label>
              <textarea
                rows="5"
                cols="5"
                name="text"
                id="text"
                value={text}
                onChange={this.handleChange}
                minLength="20"
                maxLength="800"
                required
              />
              <button type="submit" disabled={!name || !text}>
                Add response
              </button>
            </form>
          </>
        )}
        <h3>Discussion</h3>
        {comments.length > 0 ? (
          comments.map((comment, i) => (
            <div className="comment" key={i}>
              <header>
                <h2>{comment.name}</h2>
                <div className="comment-date">{moment(comment.date).fromNow()}</div>
              </header>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <div>
            <p>No one has left a response yet.</p>
          </div>
        )}
      </section>
    )
  }
}
