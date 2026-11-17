<script setup>
import { CloudCog, Database, Plus, Server, Workflow } from 'lucide-vue-next'
import { nextTick, ref } from 'vue'
import { skills } from '../content.js'

const glyphs = { 'cloud-cog': CloudCog, database: Database, server: Server, workflow: Workflow }

// Which bubble is open (one at a time). Each bubble is a <details>, so without script they still open natively.
const open = ref(null)

function toggle(id, event) {
  event.preventDefault()
  const next = open.value === id ? null : id
  const root = document.documentElement
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduced) { open.value = next; return }
  // the bubbles and their group labels morph to their new places (style.css: html.vt-skills)
  root.classList.add('vt-skills')
  const t = document.startViewTransition(async () => { open.value = next; await nextTick() })
  t.finished.finally(() => root.classList.remove('vt-skills'))
}

function closeOnEscape(event) {
  if (event.key === 'Escape' && open.value) {
    const summary = event.currentTarget.querySelector('details[open] > summary')
    toggle(open.value, event)
    summary?.focus()
  }
}
</script>

<!-- Split: the heading left, three groups of bubbles right. A bubble opens in place to say what I did with it;
     grey bubbles are what I am learning now. -->
<template>
  <section class="section section--grow" id="skills" aria-labelledby="skills-h">
    <div class="wrap">
      <span class="orb orb--green sk__orb" aria-hidden="true"></span>
      <div class="grid grid--top">
        <div class="section-head span-5">
          <h2 id="skills-h">Skills</h2>
          <p>Open one to see where I used it.</p>
          <p class="sk__legend"><span class="sk__legend-chip" aria-hidden="true"></span>Still learning</p>
        </div>
        <div class="span-6 start-7 sk" @keydown="closeOnEscape">
          <div v-for="g in skills" :key="g.id" class="sk__group">
            <h3 class="sk__title" :style="{ '--vt': `skg-${g.id}` }">{{ g.title }}</h3>
            <ul class="sk__list">
              <li v-for="s in g.items" :key="s.id" :style="{ '--vt': `sk-${s.id}` }" :class="['skill', s.learning && 'skill--learning']">
                <details name="skills" :open="open === s.id">
                  <summary class="skill__pill" @click="toggle(s.id, $event)">
                    <span class="skill__logo" aria-hidden="true">
                      <img v-if="s.logo" :src="s.logo.src" alt="" width="18" height="18">
                      <component :is="glyphs[s.glyph]" v-else :size="16" :stroke-width="1.75" />
                    </span>
                    <span class="skill__name">{{ s.name }}</span>
                    <span v-if="s.learning" class="tw:sr-only">(learning now)</span>
                    <Plus class="skill__plus" :size="14" :stroke-width="2" aria-hidden="true" />
                  </summary>
                  <p class="skill__text">
                    <span v-if="s.learning" class="skill__badge">Learning now</span>
                    {{ s.text }}
                  </p>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
