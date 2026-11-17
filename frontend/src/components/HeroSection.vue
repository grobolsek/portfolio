<script setup>
import { ArrowDown, GraduationCap } from 'lucide-vue-next'
import { ageOn, now, person, photos } from '../content.js'
import Portrait from './Portrait.vue'

// worked out where the page is read, so it stays right without a rebuild (the build's copy is corrected on load)
const age = ageOn()
const glyphs = { 'graduation-cap': GraduationCap }
</script>

<!-- A lit panel (orbs and a faint dot field) with the name, the line and the two actions; the portrait sits
     tilted at its right; three glass cards overlap its lower edge. It enters once on load (data-enter). -->
<template>
  <section class="hero hx" data-enter aria-labelledby="hero-h">
    <div class="wrap">
      <div class="hx__panel">
        <div class="hx__sky" aria-hidden="true">
          <span class="orb orb--blue"></span>
          <span class="orb orb--orange"></span>
          <span class="orb orb--yellow"></span>
        </div>
        <div class="hx__text">
          <h1 id="hero-h">{{ person.name }}</h1>
          <p class="hx__lead">{{ age }}-year-old CS student in Ljubljana, building web and CLI apps, focusing on open source, efficiency and minimal design.</p>
          <!-- Email me lives in the bar above, so the hero keeps only the way down the page -->
          <div class="btn-row">
            <a class="btn btn--secondary hx__down" href="#projects">See my projects<ArrowDown :size="16" :stroke-width="1.75" aria-hidden="true" /></a>
          </div>
        </div>
        <!-- your photo: photos.me in content.js (a cut-out PNG stands in front of the circle) -->
        <Portrait class="hx__me" :photo="photos.me" />
      </div>
      <ul class="hx__cards">
        <li v-for="c in now" :key="c.label">
          <a class="hx__card glass" :href="c.href">
            <span class="hx__tile" aria-hidden="true">
              <img v-if="c.logo" :src="c.logo.src" alt="" width="24" height="24">
              <component :is="glyphs[c.glyph]" v-else :size="22" :stroke-width="1.75" />
            </span>
            <span class="hx__label">{{ c.label }}</span>
            <span class="hx__title">{{ c.title }}</span>
            <span class="hx__meta">{{ c.meta }}</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
