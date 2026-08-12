import { useStaticQuery, graphql } from 'gatsby'

// Map of content image relativePaths (e.g. "thumbnails/tn.png") to their
// served URLs, for data files that reference images by path
export const useContentImages = () => {
  const data = useStaticQuery(graphql`
    query ContentImagesQuery {
      allFile(
        filter: {
          sourceInstanceName: { eq: "posts" }
          relativeDirectory: { in: ["thumbnails", "images"] }
          extension: { in: ["png", "svg"] }
        }
      ) {
        nodes {
          relativePath
          publicURL
        }
      }
    }
  `)

  const imagesByPath = {}

  data.allFile.nodes.forEach((node) => {
    imagesByPath[node.relativePath] = node.publicURL
  })

  return imagesByPath
}
