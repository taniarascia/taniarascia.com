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
    }
  `)

  return data
}
