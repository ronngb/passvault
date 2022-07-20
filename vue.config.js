module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "~@/app/assets/scss/_variables.scss";
        @import "~@/app/assets/scss/_functions.scss";
        @import "~@/app/assets/scss/_mixins.scss";
        `,
      },
    },
  },
}
