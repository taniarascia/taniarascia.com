const React = require('react')

export function wrapPageElement({ element, props }) {
  const Layout = element.type.Layout ?? React.Fragment

  return <Layout {...props}>{element}</Layout>
}

// The global stylesheet pulls Google Fonts via @import; preconnecting shaves
// the two extra connection setups off the critical font path
export function onRenderBody({ setHeadComponents }) {
  setHeadComponents([
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
      key="preconnect-googleapis"
    />,
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
      key="preconnect-gstatic"
    />,
  ])
}
