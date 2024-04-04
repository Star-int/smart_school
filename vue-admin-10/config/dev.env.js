'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  //默认地址
  // BASE_API: '"http://localhost:9002"',//nginx地址
  BASE_API: '"http://localhost:8222"',//gateway地址

  OSS_PATH: '"https://guili-wenjian.oss-cn-guangzhou.aliyuncs.com"',
  lintOnSave: false

})
