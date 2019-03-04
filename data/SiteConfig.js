const config = {
  siteTitle: 'Tania Rascia',
  siteTitleShort: 'Tania Rascia',
  siteTitleAlt: 'Tania Rascia, Web Developer',
  siteLogo: '/logos/logo-1024.png',
  siteUrl: 'https://taniarascia.github.io',
  pathPrefix: '/',
  siteDescription:
    'I build open source projects and write the missing instruction manuals of the web.',
  siteRss: '/rss.xml',
  googleAnalyticsID: '',
  disqusShortname: 'taniarascia',
  postDefaultCategoryID: 'Tech',
  dateFromFormat: 'YYYY-MM-DD', // Date format used in the frontmatter.
  dateFormat: 'DD/MM/YYYY', // Date format for display.
  userName: 'Tania',
  userEmail: 'me@taniarascia.com',
  userTwitter: 'taniarascia',
  userLocation: 'Chicago, IL',
  userAvatar: 'https://api.adorable.io/avatars/150/test.png',
  userDescription:
    'I build open source projects and write the missing instruction manuals of the web.',
  userLinks: [
    {
      label: 'GitHub',
      url: 'https://github.com/taniarascia',
      iconClassName: 'fa fa-github',
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/taniarascia',
      iconClassName: 'fa fa-twitter',
    },
    {
      label: 'Email',
      url: 'mailto:me@taniarascia.com',
      iconClassName: 'fa fa-envelope',
    },
  ],
  copyright: 'Copyright © 2019. Tania Rascia.', // Copyright string for the footer of the website and RSS feed.
  themeColor: '#c62828', // Used for setting manifest and progress theme colors.
  backgroundColor: '#e0e0e0', // Used for setting manifest background color.
}

// Validate

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
