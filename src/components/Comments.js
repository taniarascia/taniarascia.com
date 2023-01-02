import React, { useEffect } from 'react'

import { appendComments } from '../utils/helpers'

export const Comments = () => {
  useEffect(() => {
    appendComments()
  }, [])

  return <div id="append-comments-here" />
}
