const { when } = require('@craco/craco')
const CracoLessPlugin = require('craco-less')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // config less variable here
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    plugins: [
      ...when(
        process.env.NETWORK === 'main',
        () => [
          new TerserPlugin({
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: process.env.NODE_ENV === 'production',
                drop_debugger: true,
                pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log'] : '',
              },
            },
          }),
        ],
        []
      ),
    ],
  },
}
