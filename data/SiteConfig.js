const config = {
  siteTitle: 'Tania Rascia',
  siteTitleShort: 'Tania Rascia',
  siteTitleAlt: 'Tania Rascia',
  siteLogo: '/logos/logo-1024.png',
  siteUrl: 'https://tania.dev',
  pathPrefix: '',
  siteDescription:
    'Tania Rascia is a web developer, designer, and writer who breaks down complex concepts for all skill levels.',
  siteRss: '/rss.xml',
  googleAnalyticsID: '',
  disqusShortname: 'taniarascia',
  postDefaultCategoryID: 'Tech',
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
  menuLinks: [
    {
      name: 'About me',
      link: 'me',
    },
    {
      name: 'Articles',
      link: 'blog',
    },
    {
      name: 'Newsletter',
      link: 'newsletter',
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
