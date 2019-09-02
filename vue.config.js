const path = require('path');
module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/algorithm-practice/' : '/',
  pages: {
    ponding: {
      // page 的入口
      entry: 'src/views/ponding/main.js',
      // 模板来源
      template: 'public/ponding.html',
      // 在 dist/ponding.html 的输出
      filename: 'ponding.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'ponding',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'ponding']
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve('src/assets'),
        '@components': path.resolve('src/components')
      }
    }
  }
};
