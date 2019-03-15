# taniarascia.com [![Netlify Status](https://api.netlify.com/api/v1/badges/0a51d0e9-f611-4dd8-887f-fc1889e68540/deploy-status)](https://app.netlify.com/sites/tania/deploys) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Personal website running on Gatsby, React, and Node.js.

## Installation

```bash
git clone git@github.com:taniarascia/taniarascia.com
cd taniarascia.com
yarn
yarn run dev
```

## Features

- Posts and pages in Markdown
- Tags and categories
- Night mode
- DOS mode (404)
- Code theme (starring [New Moon](https://taniarascia.github.io/new-moon))
- Sass (starring [Primitive](https://taniarascia.github.io/primitive))

- Disqus comments

## Notes

### Format all markdown files

```bash
cd content/posts
prettier
  --print-width 100
  --no-semi
  --single-quote
  --jsx-single-quote
  --trailing-comma es5
  --arrow-parens avoid
  --parser "markdown"  "**/*.md"
```

## Contributing

If you see any typos or formatting errors in a post, please do not hesitate to open a pull request and fix it!

## Acknowledgements

- Ruben Harutyunyan - [Gatsby Advanced Starter](https://github.com/vagr9k/gatsby-advanced-starter/) the theme I hacked on to create this one.
- Muhammad Muhsin - [Using React Context API with Gatsby](https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/) the article I used to implement dark mode with the context API.
- Thomas Frössman - [ExitWP](https://github.com/thomasf/exitwp) - the converter I used to do half of the work of migrating from WordPress XML to Markdown.

## License

This project is open source and available under the [MIT License](LICENSE).
