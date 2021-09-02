import React, { useRef, useState, useEffect } from 'react'

const indigo = '#757FF8'
const yellow = '#ffb038'
const red = '#ff5a55'
const green = '#74CF74'

const colors = [
  { name: 'Indigo', color: indigo },
  { name: 'Yellow', color: yellow },
  { name: 'Red', color: red },
  { name: 'Green', color: green },
]

function useOutsideAlerter(ref, setDropdownOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, setDropdownOpen])
}

export const Colors = () => {
  const dropdownRef = useRef()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [primary, setPrimary] = useState(indigo)

  const onOpenDropdown = () => {
    if (dropdownOpen) {
      setDropdownOpen(false)
    } else {
      setDropdownOpen(true)
    }
  }

  useOutsideAlerter(dropdownRef, setDropdownOpen)

  const onChangeTheme = (color) => {
    document.documentElement.style.setProperty('--primary', color)
    setPrimary(color)
    localStorage.setItem('primary', color)
  }

  useEffect(() => {
    const storedPrimary = localStorage.getItem('primary')

    if (storedPrimary) {
      setPrimary(storedPrimary)
    }
  }, [])

  return (
    <>
      <button
        ref={dropdownRef}
        className={dropdownOpen ? 'colors open' : 'colors'}
        onClick={onOpenDropdown}
      >
        <span>{colors.find((color) => color.color === primary)?.name}</span>
        <div className="color" key={primary}>
          <span style={{ background: primary }} />
        </div>
        <div className="colors-dropdown">
          {colors
            .filter((color) => color.color !== primary)
            .map((color) => (
              <div
                onClick={(e) => {
                  onChangeTheme(color.color)
                }}
                className="color-selection"
                key={color.color}
              >
                <span>{color.name}</span>
                <div className="color" key={color.color}>
                  <span style={{ background: color.color }} />
                </div>
              </div>
            ))}
        </div>
      </button>
    </>
  )
}
