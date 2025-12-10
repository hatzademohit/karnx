
let hostname = 'localhost:3000';//'13.202.32.26'
let backEnd = '127.0.0.1:8000';
module.exports = {
  env: {
    REACT_APP_API_BASE_URL: 'http://' + backEnd + '/api',
    FILE_STORAGE_URL: 'http://127.0.0.1:8000/storage/',
    REACT_APP_API_WEB_URL: 'http://' + hostname + '/api',
    RAZORPAY_KEY: 'rzp_test_PfUUSYbitNukEH',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1', // replace with your actual domain
        pathname: '/storage/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/i,
      type: "asset/resource",
    });

    return config;
  },

  reactStrictMode: false,
}
