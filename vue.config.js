module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'PassVault',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
  css: {
    sourceMap: process.env.NODE_ENV === 'production' ? false : true,
    loaderOptions: {
      scss: {
        additionalData: `
        @import "~@/app/assets/scss/abstracts/_variables.scss";
        @import "~@/app/assets/scss/abstracts/_functions.scss";
        @import "~@/app/assets/scss/abstracts/_mixins.scss";
        `,
      },
    },
  },
}
