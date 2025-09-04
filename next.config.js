
module.exports = {
  env: {
    REACT_APP_API_BASE_URL: 'http://127.0.0.1:8000/api',
    FILE_STORAGE_URL: 'http://127.0.0.1:8000/storage/',
    REACT_APP_API_WEB_URL: 'https://vmmtapi.valethi.com' 
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1', // replace with your actual domain
      },
    ],
  },
    
  reactStrictMode: false,
}
