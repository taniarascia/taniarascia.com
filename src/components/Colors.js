import React, { useEffect, useState } from 'react'

const colors = ['blue', 'green', 'light-yellow', 'pink', 'lavender']

export const Colors = () => {
  const [savedColor, setSavedColor] = useState('lavender')

  const handleUpdateColor = (color) => {
    const cssRoot = document.querySelector(':root')
    cssRoot.style.setProperty('--selected-color', `var(--${color})`)
    window.localStorage.setItem('selected-color', color)

    setSavedColor(color)
  }

  useEffect(() => {
    const storedColor = localStorage.getItem('selected-color')

    if (storedColor) {
      setSavedColor(localStorage.getItem('selected-color'))
    }
  }, [])

  return colors.map((color) => (
    <div
      key={color}
      className={`circle ${savedColor === color ? 'active' : ''}`}
      style={{ background: `var(--${color})` }}
      onClick={() => handleUpdateColor(color)}
    />
  ))
}
