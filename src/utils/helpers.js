export function getSimplifiedPosts(posts, options = {}) {
  return posts.map((post) => ({
    id: post.node.id,
    date: post.node.frontmatter.date,
    slug: post.node.fields.slug,
    tags: post.node.frontmatter.tags,
    categories: post.node.frontmatter.categories,
    title: options.shortTitle
      ? post.node.frontmatter.shortTitle
      : post.node.frontmatter.title,
    description: post.node.frontmatter.description,
    ...(options.thumbnails && {
      thumbnail: post.node.frontmatter?.thumbnail?.childImageSharp?.fixed,
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
  const theme = localStorage.getItem('theme')

  commentScript.async = true
  commentScript.src = 'https://utteranc.es/client.js'
  commentScript.setAttribute('repo', 'taniarascia/comments')
  commentScript.setAttribute('issue-term', 'pathname')
  commentScript.setAttribute('id', 'utterances')
  commentScript.setAttribute(
    'theme',
    theme === 'dark' ? 'github-dark' : 'github-light'
  )
  commentScript.setAttribute('crossorigin', 'anonymous')

  if (!commentDiv.firstChild) {
    commentDiv.appendChild(commentScript)
  } else {
    console.error('Error adding utterances comments')
  }
}

export function getFormattedDate(date) {
  const dateArr = date.split(' ')
  if (dateArr[1].startsWith('0')) {
    dateArr[1] = dateArr[1].slice(1, 2)
  } else {
    dateArr[1] = dateArr[1].slice(0, 2)
  }
  dateArr[1] += ','

  return dateArr.join(' ')
}
