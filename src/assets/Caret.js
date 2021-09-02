import React from 'react'

export const Caret = ({ position = 'down' }) => (
  <svg
    width="10"
    height="5"
    viewBox="-2.5 -5 75 60"
    preserveAspectRatio="none"
    style={position === 'right' ? { transform: 'rotate(-90deg)' } : {}}
  >
    <path
      d="M0,0 l35,50 l35,-50"
      fill="none"
      strokeLinecap="round"
      strokeWidth="5"
    />
  </svg>
)
