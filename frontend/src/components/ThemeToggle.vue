<script setup>
import { Moon, Sun } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

// The theme lives on <html data-theme>, set before the first paint by the script in index.html.
const dark = ref(false)
onMounted(() => { dark.value = document.documentElement.dataset.theme === 'dark' })

function remember(theme) {
  try {
    // picking the system's own theme again means "follow the system" from now on
    if (theme === window.__theme.system()) localStorage.removeItem('theme')
    else localStorage.setItem('theme', theme)
  } catch { /* private mode: the choice lasts for this page only */ }
}

function toggle(event) {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  const apply = () => { window.__theme.apply(next); dark.value = next === 'dark' }
  remember(next)

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduced) return apply()

  // the new theme opens as a circle from the button (or from the pointer, when it was a click)
  const box = event.currentTarget.getBoundingClientRect()
  const x = event.clientX || box.left + box.width / 2
  const y = event.clientY || box.top + box.height / 2
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const root = document.documentElement
  root.classList.add('vt-theme')
  const t = document.startViewTransition(apply)
  t.ready.then(() => root.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
    { duration: 560, easing: 'cubic-bezier(.2, .7, .2, 1)', pseudoElement: '::view-transition-new(root)' },
  )).catch(() => {})
  t.finished.finally(() => root.classList.remove('vt-theme'))
}
</script>

<template>
  <button class="theme-toggle" type="button" aria-label="Dark mode" :aria-pressed="dark ? 'true' : 'false'" @click="toggle">
    <Moon class="theme-toggle__moon" :size="18" :stroke-width="1.75" aria-hidden="true" />
    <Sun class="theme-toggle__sun" :size="18" :stroke-width="1.75" aria-hidden="true" />
    <span class="theme-toggle__label" aria-hidden="true">Dark mode</span>
  </button>
</template>
