import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import { astroImageTools } from 'astro-imagetools'

// https://astro.build/config
export default defineConfig({
  base: '/',
  compressHTML: false,
  integrations: [
    icon(),
    astroImageTools,
  ]
})
