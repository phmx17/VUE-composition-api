const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// this would have been a proxy server to defeat cors
// module.exports = {
//   devServer: {
//     proxy: {
//       '^/users': {
//         target: 'http://127.0.0.1:3000/',
//         ws: true,
//         changeOrigin: true
//       },
//     }
//   }
// }
module.exports = {
  devServer: {
    proxy: 'http://api.back.end', // purely fictional; no implementation
  }
}