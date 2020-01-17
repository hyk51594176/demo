const { override, fixBabelImports, overrideDevServer } = require('customize-cra')
module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    })
  ),
  devServer: overrideDevServer(function(config) {
    config.proxy = require('./utils/proxy')
    return config
  })
}
