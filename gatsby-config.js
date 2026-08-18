module.exports = {
  siteMetadata: {
    title: "Tania Rascia's Website",
    author: { name: 'Tania Rascia' },
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
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allMarkdownRemark {
              nodes {
                fields {
                  slug
                }
                frontmatter {
                  date
                  updated
                }
              }
            }
          }
        `,
        resolvePages: ({ allSitePage, allMarkdownRemark }) => {
          const dateBySlug = {}
          allMarkdownRemark.nodes.forEach((node) => {
            dateBySlug[node.fields.slug] =
              node.frontmatter.updated ?? node.frontmatter.date
          })

          return allSitePage.nodes.map((page) => ({
            ...page,
            lastmod: dateBySlug[page.path],
          }))
        },
        serialize: ({ path, lastmod }) => ({ url: path, lastmod }),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "Tania Rascia's Website",
        short_name: 'taniarascia.com',
        description:
          'Software engineer and open source creator. This is my digital garden.',
        start_url: '/',
        background_color: 'white',
        // theme_color: '#959af8',
        display: 'minimal-ui',
        icon: `static/logo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              const siteUrl = site.siteMetadata.siteUrl

              return allMarkdownRemark.edges.map((edge) => {
                // Feed readers can't resolve root-relative URLs, so make
                // every internal link and image absolute
                const html = edge.node.html.replace(
                  /(href|src)="\//g,
                  `$1="${siteUrl}/`
                )

                return Object.assign({}, edge.node.frontmatter, {
                  description:
                    edge.node.frontmatter.description || edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: siteUrl + edge.node.fields.slug,
                  guid: siteUrl + edge.node.fields.slug,
                  categories: edge.node.frontmatter.tags,
                  custom_elements: [
                    { 'content:encoded': html },
                    { author: 'hello@taniarascia.com' },
                  ],
                })
              })
            },
            setup: (options) => ({
              ...options,
              description: options.query.site.siteMetadata.description,
              site_url: options.query.site.siteMetadata.siteUrl,
              feed_url: `${options.query.site.siteMetadata.siteUrl}/rss.xml`,
              generator: 'GatsbyJS',
            }),
            query: `
              {
              allMarkdownRemark(
                limit: 30
                sort: {frontmatter: {date: DESC}}
                filter: {frontmatter: {template: {eq: "post"}}}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      template
                      description
                      tags
                    }
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: 'Tania Rascia | RSS Feed',
          },
        ],
      },
    },

    // ===================================================================================
    // Images, styles, and static
    // ===================================================================================

    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          // placeholder: `dominantColor`,
          backgroundColor: `transparent`,
        },
      },
    },
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
    'gatsby-plugin-image',

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
              backgroundColor: 'transparent',
              maxWidth: 590,
            },
          },
          'gatsby-remark-autolink-headers',
          // 'gatsby-remark-prismjs-copy-button',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '>',
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: true,
              },
            },
          },
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
                  thumbnail {
                    publicURL
                  }
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'tags'],
        store: ['id', 'slug', 'title', 'tags', 'date', 'thumbnail'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: `/${node.frontmatter.slug}`,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            tags: node.frontmatter.tags,
            categories: node.frontmatter.categories,
            date: node.frontmatter.date,
            thumbnail: node.frontmatter.thumbnail?.publicURL,
          })),
      },
    },
  ],
}
