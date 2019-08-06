const config = {
  siteTitle: 'Tania Rascia',
  siteTitleShort: 'Tania Rascia',
  siteTitleAlt: 'Tania Rascia',
  siteLogo: '/logos/tania.jpg',
  siteUrl: 'https://www.taniarascia.com',
  repo: 'https://github.com/taniarascia/taniarascia.com',
  pathPrefix: '',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription:
    'Tania Rascia is web developer and writer specializing in modern JavaScript who breaks down complex concepts in an accessible and intuitive way.',
  siteRss: '/rss.xml',
  googleAnalyticsID: 'UA-42068444-1',
  postDefaultCategoryID: 'Tech',
  commentsApi: 'https://tania-comments-api.herokuapp.com/comments',
  userName: 'Tania',
  userEmail: 'tania@taniarascia.com',
  userTwitter: 'taniarascia',
  menuLinks: [
    {
      name: 'Me',
      link: '/me/',
    },
    {
      name: 'Articles',
      link: '/blog/',
    },
    {
      name: 'Contact',
      link: '/contact/',
    },
  ],
  themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff',
}

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`

module.exports = config
