export function getSimplifiedPosts(posts, options = {}) {
  return posts.map((post) => ({
    id: post.node.id,
    date: post.node.frontmatter.date,
    slug: post.node.fields.slug,
    tags: post.node.frontmatter.tags,
    categories: post.node.frontmatter.categories,
    title: post.node.frontmatter.title,
    description: post.node.frontmatter.description,
    ...(options.thumbnails && {
      thumbnail:
        post.node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData,
    }),
  }))
}

export function getTaxonomyFromPosts(posts, taxonomy) {
  return posts
    .reduce((acc, post) => {
      return [...new Set([...acc, ...(post[taxonomy] || [])])]
    }, [])
    .sort()
}

export function slugify(string) {
  return (
    string &&
    `${string}`
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function appendComments() {
  const commentDiv = document.getElementById('append-comments-here')
  const commentScript = document.createElement('script')
  const theme = window.localStorage.getItem('theme')

  commentScript.async = true
  commentScript.src = 'https://utteranc.es/client.js'
  commentScript.setAttribute('repo', 'taniarascia/comments')
  commentScript.setAttribute('issue-term', 'pathname')
  commentScript.setAttribute('id', 'utterances')
  commentScript.setAttribute(
    'theme',
    theme === 'light' ? 'github-light' : 'github-dark'
  )
  commentScript.setAttribute('crossorigin', 'anonymous')

  if (!commentDiv.firstChild) {
    commentDiv.appendChild(commentScript)
  } else {
    console.error('Error adding utterances comments')
  }
}

export function getFormattedDate(date, option = 2) {
  const dateArr = date.split(' ')
  if (dateArr[1].startsWith('0')) {
    dateArr[1] = dateArr[1].slice(1, 2)
  } else {
    dateArr[1] = dateArr[1].slice(0, 2)
  }

  if (option === 1) {
    return dateArr[0] + ' ' + dateArr[option]
  }

  dateArr[1] += ','

  return dateArr[0] + ' ' + dateArr[option]
}

export function isNewPost(date) {
  const postDate = new Date(date)
  const today = new Date()
  const diffTime = Math.abs(today - postDate)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 50) return true
}
