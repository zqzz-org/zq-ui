import postcssPxtorem from 'postcss-pxtorem'

/**
 * PostCSS 配置
 * px → rem 自动转换，基于 1920 设计稿，1rem = 16px
 * exclude: 排除 node_modules
 */
export default {
  plugins: [
    postcssPxtorem({
      rootValue: 16,
      propList: ['*'],
      minPixelValue: 4,  // ≤4px 不转换（边框、细线等保留 px）
      exclude: /node_modules/i,
    }),
  ],
}
