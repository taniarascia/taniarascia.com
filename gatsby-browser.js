exports.onInitialClientRender = () => {
  const theme = typeof window !== 'undefined' && localStorage.getItem('theme')

  if (typeof window !== 'undefined' && theme === 'dark') {
    localStorage.setItem('theme', 'dark')
    document.getElementById('dark-mode-button').textContent = '☀️'
    const head = document.getElementsByTagName('head')[0]
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.id = 'dark-mode'
    link.href = '../dark.css'
    head.appendChild(link)
  }
}
