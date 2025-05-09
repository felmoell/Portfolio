import { defineConfig } from 'astro/config'
import { URL } from './src/data/constants'

import tunnel from 'astro-tunnel'
import icon from 'astro-icon'
import { astroImageTools } from 'astro-imagetools'
import sitemap from 'astro-sitemap'
import playformCompress from '@playform/compress'
import compressor from 'astro-compressor'

// https://astro.build/config
export default defineConfig({
  site: URL,
  server: {
    host: true
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  compressHTML: false,
  integrations: [
    tunnel(),
    icon(),
    astroImageTools,
    sitemap({
      canonicalURL: URL,
      lastmod: new Date(),
      createLinkInHead: false,
      xmlns: {
        xhtml: true,
        news: false,
        video: false,
        image: false
      },
      // Remove trailing slash
      serialize(item) {
        /* eslint-disable-next-line no-param-reassign */
        item.url = item.url.replace(/\/$/g, '')
        return item
      }
    }),
    playformCompress({
      HTML: {
        collapseBooleanAttributes: true,
        maxLineLength: 0,
        removeAttributeQuotes: false,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      },
      JavaScript: {
        compress: {
          ecma: 2022
        },
        format: {
          comments: false,
          ecma: 2022
        },
        ecma: 2022,
        module: true
      },
      Image: false,
      SVG: false
    }),
    compressor()
  ]
})
