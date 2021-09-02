require('prismjs/plugins/line-numbers/prism-line-numbers.css')

const React = require('react')

export function wrapPageElement({ element, props }) {
  const Layout = element.type.Layout ?? React.Fragment

  return <Layout {...props}>{element}</Layout>
}
