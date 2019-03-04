import React, { Component } from 'react'
import {
  TwitterShareButton,
  RedditShareButton,
  RedditShareCount,
  TwitterIcon,
  RedditIcon,
} from 'react-share'
import urljoin from 'url-join'
import config from '../../data/SiteConfig'

class SocialLinks extends Component {
  render() {
    const { postNode, postPath, mobile } = this.props
    const post = postNode.frontmatter
    const url = urljoin(config.siteUrl, config.pathPrefix, postPath)
    const iconSize = mobile ? 36 : 48
    const filter = count => (count > 0 ? count : '')
    const renderShareCount = count => <div className="share-count">{filter(count)}</div>

    return (
      <div className="social-links">
        <RedditShareButton url={url} title={post.title}>
          <RedditIcon round size={iconSize} />
          <RedditShareCount url={url}>{count => renderShareCount(count)}</RedditShareCount>
        </RedditShareButton>
        <TwitterShareButton url={url} title={post.title}>
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
      </div>
    )
  }
}

export default SocialLinks
