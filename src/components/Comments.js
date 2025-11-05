import React, { useEffect } from 'react'

import { appendComments } from '../utils/helpers'

export const Comments = () => {
  useEffect(() => {
    appendComments()

    const setUtterancesTheme = () => {
      const currentTheme = window.localStorage.getItem('theme')
      const iframe = document.querySelector('iframe.utterances-frame')

      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          {
            type: 'set-theme',
            theme: currentTheme === 'light' ? 'github-light' : 'github-dark',
          },
          'https://utteranc.es'
        )
      }
    }

    setUtterancesTheme()
    const onThemeChange = () => setUtterancesTheme()
    window.addEventListener('themechange', onThemeChange)

    return () => {
      window.removeEventListener('themechange', onThemeChange)
    }
  }, [])

  return <div id="append-comments-here" />
}
