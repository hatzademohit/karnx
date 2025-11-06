
module.exports = {
  distDir: '.next',
  env: {
    REACT_APP_API_BASE_URL: 'http://13.202.32.26/api/',
    FILE_STORAGE_URL: 'http://13.202.32.26/storage/',
    REACT_APP_API_WEB_URL: 'http://13.202.32.26'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '13.202.32.26', // replace with your actual domain
        pathname: '/storage/**',
      },
    ],
  },

  reactStrictMode: false,
}
