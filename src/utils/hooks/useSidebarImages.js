import { useStaticQuery, graphql } from 'gatsby'

export const useSidebarImages = () => {
  const data = useStaticQuery(graphql`
    query SidebarImagesQuery {
      apple: file(
        relativePath: { eq: "thumbnails/apple.png" }
        sourceInstanceName: { eq: "posts" }
      ) {
        publicURL
      }
      newMoon: file(
        relativePath: { eq: "images/new-moon.svg" }
        sourceInstanceName: { eq: "posts" }
      ) {
        publicURL
      }
    }
  `)

  return data
}
