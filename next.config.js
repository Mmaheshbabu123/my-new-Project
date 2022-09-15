const nextConfig = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US'
  },
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
}

module.exports = nextConfig
