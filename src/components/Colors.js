import React from 'react'

export const Colors = () => {
  const indigo = '#7981f7'
  const yellow = '#ffd479'
  const red = '#f2777a'
  const green = '#92d192'

  const colors = [indigo, yellow, red, green]

  const onChangeTheme = (color) => {
    document.documentElement.style.setProperty('--primary', color)
    localStorage.setItem('primary', color)
  }

  return (
    <div className="colors">
      {colors.map((color) => (
        <div onClick={() => onChangeTheme(color)} className="color">
          <span style={{ background: color }} />
        </div>
      ))}
    </div>
  )
}
