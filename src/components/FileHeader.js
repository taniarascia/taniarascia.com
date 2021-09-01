import React from 'react'

import { Colors } from './Colors'

export const FileHeader = ({ setCollapsed }) => {
  return (
    <header className="file-header">
      <div className="file">
        <span>TaniaRascia.com</span>
      </div>
      <div className="toolbar">
        <button onClick={() => setCollapsed((prev) => !prev)}>Collapse</button>
        <Colors />
      </div>
    </header>
  )
}
