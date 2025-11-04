import React, { useState, useEffect, useRef } from 'react'

export const ColorDropdown = ({ currentColor, setCurrentColor }) => {
  const dropdownRef = useRef()
  const [open, setOpen] = useState(false)
  const colors = [
    'var(--theme-pink)',
    'var(--theme-yellow)',
    'var(--theme-green)',
    'var(--theme-blue)',
    'var(--theme-lavender)',
  ]

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleSelectColor = (color) => {
    window.localStorage.setItem('color', color)
    setCurrentColor(color)
    handleToggle()
  }

  useEffect(() => {
    const savedColor = window.localStorage.getItem('color')

    if (savedColor) {
      setCurrentColor(savedColor)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  useEffect(() => {
    if (currentColor) {
      const root = document.querySelector(':root')
      root.style.setProperty('--color-primary', currentColor)
    }
  }, [currentColor])

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className={`navbar-button ${open ? 'active' : ''}`}
      >
        <div className="circle" style={{ backgroundColor: currentColor }} />
      </button>
      {open && (
        <div className="dropdown-results">
          <div className="circles">
            {colors.map((color) => (
              <div
                key={color}
                className="dropdown-option"
                onClick={() => {
                  handleSelectColor(color)
                }}
              >
                <div style={{ backgroundColor: color }} className="circle" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
