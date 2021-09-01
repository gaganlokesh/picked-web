module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: [
      // Development
      'picked-dev.s3.ap-south-1.amazonaws.com',
      'loremflickr.com',
    ],
  },
  reactStrictMode: true,
};
