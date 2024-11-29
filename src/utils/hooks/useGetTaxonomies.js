import { useStaticQuery, graphql } from 'gatsby'

export const useGetTaxonomies = () => {
  const data = useStaticQuery(graphql`
    query TaxonomyQuery {
      tags: allMarkdownRemark {
        group(field: frontmatter___tags) {
          name: fieldValue
          totalCount
        }
      }

      categories: allMarkdownRemark {
        group(field: frontmatter___categories) {
          name: fieldValue
          totalCount
        }
      }

      highlights: allMarkdownRemark(
        limit: 12
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { categories: { eq: "Highlight" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              tags
              thumbnail {
                childImageSharp {
                  fixed(width: 25, height: 25) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return data
}
