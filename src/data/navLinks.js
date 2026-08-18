import floppy from '../assets/floppylogo.png'
import blog from '../assets/nav-blog.png'
import projects from '../assets/nav-projects.png'
import search from '../assets/nav-search.png'

export const mainNavLinks = [
  { url: '/blog', label: 'Blog', image: blog },
  { url: '/shelves', label: 'Shelves', image: search },
  { url: '/projects', label: 'Projects', image: projects },
  { url: '/me', label: 'About me', image: floppy },
]

export const subNavLinks = [
  { url: '/resume', label: 'Resume' },
  { url: '/topics', label: 'Topics' },
  { url: 'https://github.com/taniarascia/taniarascia.com', label: 'Source' },
]
