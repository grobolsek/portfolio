<script setup>
import { person } from '../content.js'
import ThemeToggle from './ThemeToggle.vue'
</script>

<!-- nav-split: the words left, the name in the middle, the actions right. system.js runs the phone sheet. -->
<template>
  <header class="nav nav--split">
    <div class="wrap nav__bar">
      <a class="skip-link" href="#top">Skip to content</a>
      <a class="nav__logo" href="#top"><span class="mark" data-mark="stack" aria-hidden="true"></span>{{ person.name }}</a>
      <nav class="nav__links" aria-label="Main">
        <div class="nav__item"><a class="nav__link" href="#projects">Projects</a></div>
        <div class="nav__item"><a class="nav__link" href="#skills">Skills</a></div>
        <div class="nav__item"><a class="nav__link" href="#work">Experience</a></div>
        <div class="nav__item"><a class="nav__link" href="#about">About</a></div>
      </nav>
      <div class="nav__actions">
        <a class="nav__link" :href="person.github" target="_blank" rel="noopener">GitHub</a>
        <ThemeToggle />
        <a class="btn btn--primary" :href="`mailto:${person.email}`">Email me</a>
      </div>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
      </button>
    </div>
  </header>
</template>
