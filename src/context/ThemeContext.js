import React, { Component } from 'react'

const defaultState = {
  dark: false,
  notFound: false,
  toggleDark: () => {},
  toggleNotFound: () => {},
}

const ThemeContext = React.createContext(defaultState)

const supportsDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches === true

class ThemeProvider extends Component {
  state = {
    dark: false,
    notFound: false,
  }

  toggleDark = () => {
    let dark = !this.state.dark

    localStorage.setItem('dark', JSON.stringify(dark))
    this.setState({ dark })
  }

  toggleNotFound = () => {
    let notFound = !this.state.dark

    this.setState({ notFound })
  }

  found = () => {
    this.setState({ notFound: false })
  }

  componentDidMount() {
    const lsDark = JSON.parse(localStorage.getItem('dark'))

    if (lsDark) {
      this.setState({ dark: lsDark })
    } else if (supportsDarkMode()) {
      this.setState({ dark: true })
    }
  }

  render() {
    const { children } = this.props
    const { dark, notFound } = this.state
    return (
      <ThemeContext.Provider
        value={{
          dark,
          notFound,
          toggleNotFound: this.toggleNotFound,
          toggleDark: this.toggleDark,
          found: this.found,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext

export { ThemeProvider }
