import React from 'react'
import { Link } from '@reach/router'

import me from '../../content/images/tania2022.jpg'
import dimo from '../../content/images/dimo.jpg'

export const AboutSidebar = () => {
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card">
        <h2>Me</h2>
        <img src={me} alt="Tania" />
      </div>
      <div className="post-sidebar-card">
        <h2>Dimo (Kitty)</h2>
        <img src={dimo} alt="Tania" />
      </div>
      <div className="post-sidebar-card">
        <Link to="/josh">Memories of Josh</Link>
      </div>
    </aside>
  )
}
