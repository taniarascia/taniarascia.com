import { useStaticQuery, graphql } from 'gatsby'

export const useGetPosts = () => {
  const data = useStaticQuery(graphql`
    query StaticQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { template: { eq: "post" } } }
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
              categories
            }
          }
        }
      }
    }
  `)

  return data
}
