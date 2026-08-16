import fs from 'node:fs'
import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' with { type: 'json' }

function stripUseDynamicUrl() {
  return {
    name: 'strip-use-dynamic-url',
    enforce: 'post',
    writeBundle() {
      const manifestPath = new URL('./dist/manifest.json', import.meta.url)
      if (!fs.existsSync(manifestPath)) return

      try {
        const fileText = fs.readFileSync(manifestPath, 'utf8')
        const parsedManifest = JSON.parse(fileText)

        if (!Array.isArray(parsedManifest.web_accessible_resources)) return

        parsedManifest.web_accessible_resources = parsedManifest.web_accessible_resources.map(
          (entry) => {
            if (!entry || typeof entry !== 'object') return entry

            const { use_dynamic_url: _useDynamicUrl, ...rest } = entry
            return rest
          }
        )

        fs.writeFileSync(manifestPath, `${JSON.stringify(parsedManifest, null, 2)}\n`)
      } catch {
        // Ignore invalid JSON; the generated manifest is still valid enough for Vite.
      }
    },
  }
}

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    crx({ manifest }),
    stripUseDynamicUrl(),
  ],
})