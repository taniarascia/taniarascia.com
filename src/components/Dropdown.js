import React, { useState, useEffect, useRef } from 'react'

export const Dropdown = () => {
  const dropdownRef = useRef()
  const [open, setOpen] = useState(false)
  const colors = ['#ffd479', '#989dfa', '#f57ad0', '#5eddac', '#6ab0f3']

  const handleSelectColor = (color) => {
    const root = document.querySelector(':root')
    root.style.setProperty('--primary', color)
  }

  const handleToggle = () => {
    setOpen(!open)
  }

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

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className={`navbar-button ${open ? 'active' : ''}}`}
      >
        <div className="circle" />
      </button>
      {open && (
        <div className="dropdown-results">
          <div className="circles">
            {colors.map((color) => (
              <div
                style={{ backgroundColor: color }}
                className="circle"
                onClick={() => {
                  handleSelectColor(color)
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
