import type { App } from 'vue'

import { setupElIcons } from './icons'

export default {
  install(app: App<Element>) {
    setupElIcons(app)
  },
}
