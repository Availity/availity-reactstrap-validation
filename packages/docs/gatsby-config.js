const themeOptions = require('@availity/gatsby-theme-docs/theme-options');

module.exports = {
  pathPrefix: '/availity-reactstrap-validation',
  __experimentalThemes: [
    {
      resolve: '@availity/gatsby-theme-docs',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Reactstrap Validation',
        description: 'Form Validation Library built using Reactstrap',
        githubRepo: 'availity/availity-reactstrap-validation',
        contentDir: 'packages/docs/source',
        sidebarCategories: {
          null: ['index', 'getting-started'],
        }
      }
    }
  ]
};
