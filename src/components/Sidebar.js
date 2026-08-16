import React from 'react'
import { Link } from 'gatsby'

import { ColorDropdown } from './ColorDropdown'
import floppyLogo from '../assets/nav-floppy.png'
import floppy from '../assets/floppylogo.png'
import blog from '../assets/nav-blog.png'
import projects from '../assets/nav-projects.png'
import search from '../assets/nav-search.png'
import { useSidebarImages } from '../utils/hooks/useSidebarImages'
import { Moon } from '../assets/Moon'
import { Sun } from '../assets/Sun'
import { Mail } from '../assets/Mail'
import { Bluesky } from '../assets/Bluesky'
import { Rss } from '../assets/Rss'
import { GitHub } from '../assets/GitHub'

export const Sidebar = ({
  theme,
  handleUpdateTheme,
  currentColor,
  setCurrentColor,
}) => {
  const { newMoon } = useSidebarImages()
  const links = [
    { url: '/blog', label: 'Blog', image: blog },
    { url: '/shelves', label: 'Shelves', image: search },
    { url: '/projects', label: 'Projects', image: projects },
    { url: '/me', label: 'About me', image: floppy },
  ]
  const subLinks = [
    { url: '/resume', label: 'Resume' },
    { url: '/topics', label: 'Topics' },
    { url: 'https://github.com/taniarascia/taniarascia.com', label: 'Source' },
  ]
  const socialLinks = [
    {
      url: 'https://taniarascia.substack.com',
      label: 'Email signup',
      Icon: Mail,
    },
    { url: 'https://github.com/taniarascia', label: 'GitHub', Icon: GitHub },
    { url: 'https://go.bsky.app/SmEWb8G', label: 'Bluesky', Icon: Bluesky },
    { url: '/rss.xml', label: 'RSS feed', Icon: Rss },
    {
      url: 'https://taniarascia.github.io/new-moon/',
      label: 'New Moon',
      image: newMoon?.publicURL,
    },
  ]

  return (
    <aside className="sidebar">
      <section className="sidebar-section">
        <div className="sidebar-title-link">
          <Link to="/" className="flex-align-center gap">
            <span>
              <img
                src={floppyLogo}
                className="navbar-logo"
                alt="tania.dev"
                title="💾"
                height="16"
                width="16"
              />
            </span>
            <span className="site-name">tania.dev</span>
          </Link>
          <div className="flex-align-center">
            <ColorDropdown
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
            />
            <div className="tooltip-container">
              <button
                className="navbar-button"
                onClick={() => {
                  const newTheme = theme === 'dark' ? 'light' : 'dark'

                  handleUpdateTheme(newTheme)
                }}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </button>
              <div className="tooltip">Theme</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sidebar-section">
        <div className="sidebar-content">
          <p>
            I'm <Link to="/me">Tania</Link>, software engineer and open-source
            creator. This is my digital garden. 🌱
          </p>
        </div>
      </section>

      <section className="sidebar-section">
        <nav className="sidebar-nav-links">
          {links.map((link) => (
            <Link key={link.url} to={link.url} activeClassName="active">
              <img src={link.image} alt="" />
              {link.label}
            </Link>
          ))}
        </nav>
      </section>

      <div className="sidebar-bottom">
        <section className="sidebar-section">
          <nav className="sidebar-links">
            {socialLinks.map(({ url, label, Icon, image }) => (
              <div className="tooltip-container tooltip-above" key={url}>
                {url.startsWith('http') ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    {Icon ? (
                      <Icon size={20} />
                    ) : (
                      <img src={image} alt="" width="20" height="20" />
                    )}
                  </a>
                ) : (
                  <a href={url} aria-label={label}>
                    {Icon ? (
                      <Icon size={20} />
                    ) : (
                      <img src={image} alt="" width="20" height="20" />
                    )}
                  </a>
                )}
                <div className="tooltip">{label}</div>
              </div>
            ))}
          </nav>
        </section>

        <nav className="sidebar-sub-links">
          {subLinks.map((link, index) => (
            <React.Fragment key={link.url}>
              {index > 0 && <div className="divider" />}
              {link.url.startsWith('http') ? (
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ) : (
                <Link to={link.url} activeClassName="active">
                  {link.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </aside>
  )
}
