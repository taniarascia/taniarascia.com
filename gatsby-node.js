const path = require('path')

// Helpers
function slugify(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPage = path.resolve('./src/templates/post.js')
  const pagePage = path.resolve('./src/templates/page.js')
  const tagPage = path.resolve('./src/templates/tag.js')
  const categoryPage = path.resolve('./src/templates/category.js')

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              id
              frontmatter {
                title
                tags
                categories
                template
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const all = result.data.allMarkdownRemark.edges
  const posts = all.filter((post) => post.node.frontmatter.template === 'post')
  const pages = all.filter((post) => post.node.frontmatter.template === 'page')
  const tagSet = new Set()
  const categorySet = new Set()

  // =====================================================================================
  // Posts
  // =====================================================================================

  posts.forEach((post, i) => {
    const previous = i === posts.length - 1 ? null : posts[i + 1].node
    const next = i === 0 ? null : posts[i - 1].node

    if (post.node.frontmatter.tags) {
      post.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag)
      })
    }

    if (post.node.frontmatter.categories) {
      post.node.frontmatter.categories.forEach((category) => {
        categorySet.add(category)
      })
    }

    createPage({
      path: post.node.fields.slug,
      component: blogPage,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // =====================================================================================
  // Pages
  // =====================================================================================

  pages.forEach((page) => {
    createPage({
      path: page.node.fields.slug,
      component: pagePage,
      context: {
        slug: page.node.fields.slug,
      },
    })
  })

  // =====================================================================================
  // Tags
  // =====================================================================================

  const tagList = Array.from(tagSet)
  tagList.forEach((tag) => {
    createPage({
      path: `/tags/${slugify(tag)}/`,
      component: tagPage,
      context: {
        tag,
      },
    })
  })

  // =====================================================================================
  // Categories
  // =====================================================================================

  const categoryList = Array.from(categorySet)
  categoryList.forEach((category) => {
    createPage({
      path: `/categories/${slugify(category)}/`,
      component: categoryPage,
      context: {
        category,
      },
    })
  })
}

const createNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // =====================================================================================
  // Slugs
  // =====================================================================================

  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
      slug = `/${node.frontmatter.slug}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })
  }
}

exports.createPages = createPages
exports.onCreateNode = createNode
