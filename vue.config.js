module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "~@/app/assets/scss/_variables.scss";
        `,
      },
    },
  },
}
