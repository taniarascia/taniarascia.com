import React, { useMemo } from 'react'
import { Link } from 'gatsby'

const Post = ({ node }) => {
  const date = new Date(node.date)
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  let isNew = false

  if (date > oneMonthAgo) {
    isNew = true
  }

  let formattedDate
  if (node.date) {
    const dateArr = node.date.split(' ')
    dateArr.pop()
    dateArr[0] = dateArr[0].slice(0, 3)
    formattedDate = dateArr.join(' ').slice(0, -1)
  }

  return (
    <Link to={node.slug} key={node.id} className={isNew ? 'post new' : 'post'}>
      <h3>{node.title}</h3>
      <div>
        {isNew && <div className="new-post">New!</div>}
        {formattedDate && <time>{formattedDate}</time>}
      </div>
    </Link>
  )
}

export default function Posts({ data = [], showYears }) {
  const postsByYear = useMemo(() => {
    const collection = {}

    data.forEach((post) => {
      const year = post.date?.split(', ')[1]

      collection[year] = [...(collection[year] || []), post]
    })

    return collection
  }, [data])
  const years = useMemo(() => Object.keys(postsByYear).reverse(), [postsByYear])

  if (showYears) {
    return years.map((year) => (
      <section key={year}>
        <h2>{year}</h2>
        <div className="posts">
          {postsByYear[year].map((node) => (
            <Post key={node.id} node={node} />
          ))}
        </div>
      </section>
    ))
  } else {
    return (
      <div className="posts">
        {data.map((node) => (
          <Post key={node.id} node={node} />
        ))}
      </div>
    )
  }
}
