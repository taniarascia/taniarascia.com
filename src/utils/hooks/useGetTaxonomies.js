import { useStaticQuery, graphql } from 'gatsby'

export const useGetTaxonomies = () => {
  const data = useStaticQuery(graphql`
    query TaxonomyQuery {
      tags: allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
          name: fieldValue
          totalCount
        }
      }
      categories: allMarkdownRemark {
        group(field: { frontmatter: { categories: SELECT } }) {
          name: fieldValue
          totalCount
        }
      }
      highlights: allMarkdownRemark(
        limit: 12
        sort: { frontmatter: { date: DESC } }
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
                  gatsbyImageData(width: 25, height: 25, layout: FIXED)
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
