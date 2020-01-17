const urls = {
  development: 'https://risk-dev.st-creditech.com', // 开发
  test: 'https://risk-test.st-creditech.com', // 测试
  preissue: 'https://risk-stage.st-creditech.com', // 预发
  production: 'https://risk.st-creditech.com' // 生产
}
const poxy = Object.entries(urls).reduce((obj, [key, target]) => {
  obj[`/${key}`] = {
    target,
    changeOrigin: true,
    // logLevel: 'debug',
    pathRewrite: {
      [`^/${key}/services`]: key === 'mock' ? '' : '/services',
      [`^/${key}/files`]: '/files',
      [`^/${key}/nodeapi`]: '/nodeapi',
      [`^/${key}/apies`]: '/apies'
    },
    cookieDomainRewrite: {
      '*': ''
    }
  }
  return obj
}, {})
module.exports = poxy
