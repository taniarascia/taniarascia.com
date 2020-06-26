module.exports = {
  siteMetadata: {
    title: 'Tania Rascia',
    author: {
      name: 'Tania Rascia',
    },
    pathPrefix: '/',
    siteUrl: 'https://www.taniarascia.com',
    description:
      'Software engineer and open source creator. This is my digital garden.',
  },
  plugins: [
    // ===================================================================================
    // Meta
    // ===================================================================================

    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Tania Rascia',
        short_name: 'Tania Rascia',
        description:
          'Software engineer and open source creator. This is my digital garden.',
        start_url: '/',
        background_color: 'white',
        theme_color: '#5183f5',
        display: 'minimal-ui',
        icon: `static/logo.png`,
      },
    },

    // ===================================================================================
    // Images and static
    // ===================================================================================

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`,
      },
    },

    // ===================================================================================
    // Markdown
    // ===================================================================================

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: true,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: true,
              },
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },

    // ===================================================================================
    // Search
    // ===================================================================================

    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: {
          encode: 'icase',
          tokenize: 'forward',
          async: false,
        },
        query: `
          {
            allMarkdownRemark(filter: { frontmatter: { template: { eq: "post" } } }) {
              nodes {
                id
                frontmatter {
                  title
                  tags
                  slug
                  date(formatString: "MMMM DD, YYYY")
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'body', 'tags'],
        store: ['id', 'slug', 'title', 'tags', 'date'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: `/${node.frontmatter.slug}`,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            tags: node.frontmatter.tags,
            date: node.frontmatter.date,
          })),
      },
    },
  ],
}
