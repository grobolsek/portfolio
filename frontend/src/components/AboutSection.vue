<script setup>
import { about } from '../content.js'
import Photo from './Photo.vue'
</script>

<!-- The text, then the three hobby photos scattered a little crooked, each with its tag; orbs glow behind -->
<template>
  <section class="section section--grow" id="about" aria-labelledby="about-h">
    <div class="wrap">
      <div class="ab">
        <div class="ab__text">
          <h2 id="about-h">About me</h2>
          <p v-for="t in about.text" :key="t">{{ t }}</p>
        </div>
        <div class="ab__stage">
          <span class="orb orb--blue ab__orb" aria-hidden="true"></span>
          <span class="orb orb--orange ab__orb ab__orb--2" aria-hidden="true"></span>
          <ul class="ab__pics">
            <li v-for="h in about.hobbies" :key="h.name" class="ab__pic reveal" :style="{ '--tilt': h.tilt }">
              <Photo :photo="h.photo" />
              <span class="tag" :class="`tag--${h.tone}`">{{ h.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
