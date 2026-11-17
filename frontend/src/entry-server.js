import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'

// Used only at build time by prerender.js: renders the page to HTML so it ships complete.
export function render() {
  return renderToString(createSSRApp(App))
}
