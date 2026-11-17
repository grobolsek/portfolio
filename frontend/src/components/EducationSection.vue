<script setup>
import { education, photos } from '../content.js'
import Dropdown from './Dropdown.vue'
import OutLinks from './OutLinks.vue'
import Photo from './Photo.vue'
</script>

<!-- The schools in glass cards, the university's photo beside them, tilted -->
<template>
  <section class="section section--grow" id="education" aria-labelledby="education-h">
    <div class="wrap">
      <span class="orb orb--purple edu__orb" aria-hidden="true"></span>
      <div class="grid grid--top">
        <div class="span-6">
          <div class="sx-head">
            <h2 id="education-h">Education</h2>
          </div>
          <div class="edu">
            <Dropdown v-for="r in education" :key="r.role" class="edu__card glass">
              <template #head>
                <span class="edu__what">
                  <span class="edu__role">{{ r.role }}</span>
                  <span class="edu__org">{{ r.org }}</span>
                </span>
                <span class="edu__when">{{ r.when }}</span>
              </template>
              <div class="edu__body">
                <p>{{ r.text }}</p>
                <OutLinks :links="[r.link]" />
              </div>
            </Dropdown>
          </div>
        </div>
        <div class="span-5 start-8 edu__pic">
          <Photo class="reveal" :photo="photos.university" tilt="3deg" />
        </div>
      </div>
    </div>
  </section>
</template>
