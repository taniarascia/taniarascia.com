import '@fontsource-variable/outfit'
import '@fontsource-variable/google-sans-code'
import '@fontsource-variable/google-sans-code/wght-italic.css'
import '@fontsource-variable/google-sans-flex/slnt.css'

const React = require('react')

export function wrapPageElement({ element, props }) {
  const Layout = element.type.Layout ?? React.Fragment

  return <Layout {...props}>{element}</Layout>
}
