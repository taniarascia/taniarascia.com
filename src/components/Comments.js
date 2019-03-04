import React, { Component } from 'react'
import moment from 'moment'
import config from '../../data/SiteConfig'

export default class Comments extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      submitting: false,
      comments: [],
      newComment: {
        name: '',
        parentCommentId: '',
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

    this.setState({ submitting: true })

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
          parentCommentId: '',
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
      submitting,
      success,
      error,
      comments,
      newComment: { name, text },
    } = this.state

    const showError = () =>
      error && (
        <blockquote className="error">
          <p>Comments disabled.</p>
        </blockquote>
      )
    const showSuccess = () =>
      success && (
        <blockquote className="success">
          <p>Comment submitted!</p>
        </blockquote>
      )

    const commentTitle = commentLength => {
      if (commentLength < 1) {
        return 'Leave a comment'
      } else if (commentLength === 1) {
        return '1 comment'
      } else {
        return `${commentLength} comments`
      }
    }

    return (
      <section className="comments" id="comments">
        {success || error ? (
          showError() || showSuccess()
        ) : (
          <>
            <h3>{commentTitle(comments.length)}</h3>
            <form id="new-comment" onSubmit={this.onSubmitComment}>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.handleChange}
                minLength="3"
                maxLength="255"
                placeholder="Name"
                required
              />
              <textarea
                rows="2"
                cols="5"
                name="text"
                id="text"
                value={text}
                onChange={this.handleChange}
                minLength="20"
                maxLength="1000"
                placeholder="Comment"
                required
              />
              <div style={{ marginBottom: '.5rem' }}>
                <small>Plain text only. Comment must be over 20 characters.</small>
              </div>
              <button type="submit" disabled={!name || !text || text.length < 20 || submitting}>
                Submit
              </button>
            </form>
          </>
        )}
        {comments.length > 0 &&
          comments
            .filter(comment => !comment.parent_comment_id)
            .filter((comment, i) => i < 50)
            .map((comment, i) => {
              let child
              if (comment.id) {
                child = comments.find(c => comment.id == c.parent_comment_id)
              }

              return (
                <div className="comment" key={i} data-id={i}>
                  <header>
                    <h2>{comment.name}</h2>
                    <div className="comment-date">{moment(comment.date).fromNow()}</div>
                  </header>
                  <p>{comment.text}</p>
                  {child && (
                    <div className="comment reply">
                      <header>
                        <h2>{child.name}</h2>
                        <div className="comment-date">{moment(child.date).fromNow()}</div>
                      </header>
                      <p>{child.text}</p>
                    </div>
                  )}
                </div>
              )
            })}
      </section>
    )
  }
}
