import { defineConfig, presetUno, presetIcons } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        svg: FileSystemIconLoader('./src/assets/icons', (svg) => {
          const match = svg.match(/<path[^>]*d="([^"]*)"[^>]*\/>/)
          if (match && match[1]) {
            return match[1]
          }
          return svg
        }),
      },
      scale: 1,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  shortcuts: {
    'i-svg': 'i-svg',
  },
})
