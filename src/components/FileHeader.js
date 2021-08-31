import React from 'react'
import { Link } from 'gatsby'

import { Colors } from './Colors'

export const FileHeader = () => {
  return (
    <header className="file-header">
      <div className="file">
        <span>TaniaRascia.com</span>
      </div>
      <Colors />
    </header>
  )
}
