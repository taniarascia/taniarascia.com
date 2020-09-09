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

    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://utteranc.es') {
        return
      }
      const message = {
        type: 'set-theme',
        theme: 'github-dark',
      }
      let utterances = document.querySelector('iframe')
      if (utterances && utterances.contentWindow)
        utterances.contentWindow.postMessage(message, 'https://utteranc.es')
    })
  }
}
