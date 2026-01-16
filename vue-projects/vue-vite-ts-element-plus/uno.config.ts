// https://unocss.nodejs.cn/guide/config-file
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import fs from 'fs'

// 本地SVG图标目录
const iconsDir = './src/assets/icons'

// 读取本地 SVG 目录，自动生成 safelist
const generateSafeList = () => {
  try {
    return fs
      .readdirSync(iconsDir)
      .filter((file) => file.endsWith('.svg'))
      .map((file) => `i-svg:${file.replace('.svg', '')}`)
  } catch (error) {
    console.error('无法读取图标目录:', error)
    return []
  }
}

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      // 额外属性

      // 图表集合
      collections: {
        // svg 是图标集合名称，使用 `i-svg:图标名` 调用
        svg: FileSystemIconLoader(iconsDir, (svg) => {
          // 如果 `fill` 没有定义，则添加 `fill="currentColor"`
          return svg.includes('fill="') ? svg : svg.replace(/^<svg /, '<svg fill="currentColor" ')
        }),
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  safelist: generateSafeList(),
})
