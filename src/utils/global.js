import urljoin from 'url-join'
import config from '../../data/SiteConfig'
import moment from 'moment'

const formatDate = date => moment.utc(date).format(config.dateFormat)

const editOnGithub = post => {
  const date = moment.utc(post.date).format(config.dateFromFormat)
  return urljoin(config.repo, '/blob/master/content/posts', `${date}-${post.slug}.md`)
}

export { formatDate, editOnGithub }
