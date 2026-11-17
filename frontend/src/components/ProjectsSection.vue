<script setup>
import { moreProjects, projects } from '../content.js'
import Dropdown from './Dropdown.vue'
import IconRow from './IconRow.vue'
import OutLinks from './OutLinks.vue'
import PaperPreview from './PaperPreview.vue'
import Photo from './Photo.vue'
import TerminalPreview from './TerminalPreview.vue'

// the logo column is as wide as the project with the most logos (28px discs, 6px apart), so the columns line up
// from row to row and no row's logos run over its name
const most = Math.max(1, ...projects.map((p) => p.icons.length))
const iconsWidth = `${most * 28 + (most - 1) * 6}px`
</script>

<!-- The heading with the GitHub link across from it, then one glass container of rows that open to the details,
     a picture and the links -->
<template>
  <section class="section section--grow" id="projects" aria-labelledby="projects-h">
    <div class="wrap">
      <span class="orb orb--blue px__orb" aria-hidden="true"></span>
      <div class="sx-head">
        <h2 id="projects-h">Selected projects</h2>
        <OutLinks :links="[moreProjects]" />
      </div>
      <div class="proj glass" :style="{ '--icons-w': iconsWidth }">
        <Dropdown v-for="(p, i) in projects" :key="p.id">
          <template #head>
            <span class="proj__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="proj__name">{{ p.name }}</span>
            <span class="proj__line">{{ p.line }}</span>
            <span class="proj__icons"><IconRow :icons="p.icons" /></span>
          </template>
          <div class="proj__body">
            <div class="proj__text">
              <p v-for="t in p.text" :key="t">{{ t }}</p>
              <OutLinks :links="p.links" />
            </div>
            <!-- every project has a picture slot: its screenshot, a grey box until there is one, or the report's page -->
            <div class="proj__media">
              <PaperPreview v-if="p.paper" :paper="p.paper" />
              <TerminalPreview v-else-if="p.terminal" :terminal="p.terminal" />
              <Photo v-else-if="p.image" :photo="p.image" :tilt="i % 2 ? '-1.5deg' : '1.5deg'" />
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  </section>
</template>
