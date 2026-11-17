// After `vite build` (the client) and `vite build --ssr` (the server entry), put the rendered page into
// dist/index.html, so it is complete without script; Vue then hydrates it.
import { readFile, rm, writeFile } from 'node:fs/promises'

const { render } = await import('./dist-ssr/entry-server.js')
const file = new URL('./dist/index.html', import.meta.url)
const html = await readFile(file, 'utf8')
if (!html.includes('<div id="app"></div>')) throw new Error('prerender: <div id="app"></div> not found in dist/index.html')
await writeFile(file, html.replace('<div id="app"></div>', `<div id="app">${await render()}</div>`))
await rm(new URL('./dist-ssr', import.meta.url), { recursive: true, force: true })
console.log('prerendered dist/index.html')
