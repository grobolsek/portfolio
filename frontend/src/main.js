import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import './style.css'

// The built page arrives prerendered (prerender.js) and Vue hydrates it; in dev it renders from scratch.
// Either way this runs before the kit's scripts (index.html loads them after it), so they see the finished page.
const el = document.getElementById('app')
;(el.firstElementChild ? createSSRApp : createApp)(App).mount(el)
