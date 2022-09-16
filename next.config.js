const nextConfig = {
  reactStrictMode: false,
  serverRuntimeConfig: {
    // Will only be available on the server side
    // secretToken: process.env.REACT_APP_AUTHENTICATION_TOKEN, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
  images: {
    // domains: [process.env.CMS_BACKEND],
  },
  cssLoaderOptions: {
    url: false
  }
}

const withPWA = require('next-pwa')({
  dest: 'public'
})
module.exports = withPWA({ nextConfig })