<script setup>
import { work } from '../content.js'
import Dropdown from './Dropdown.vue'
import IconRow from './IconRow.vue'

// how far each card sits from the line: a little uneven on purpose
const offsets = ['0px', '72px', '28px']
</script>

<!-- A timeline: one line down the left, a dated mark for each job, and its card set out from the line -->
<template>
  <section class="section section--grow" id="work" aria-labelledby="work-h">
    <div class="wrap">
      <div class="sx-head">
        <h2 id="work-h">Work experience</h2>
      </div>
      <ol class="tl">
        <li v-for="(r, i) in work" :key="r.role + r.org" class="tl__item" :style="{ '--offset': offsets[i % offsets.length] }">
          <span class="tl__when">{{ r.when }}</span>
          <Dropdown class="tl__card glass reveal">
            <template #head>
              <span class="tl__what">
                <span class="tl__role">{{ r.role }}</span>
                <span class="tl__org">{{ r.org }}</span>
              </span>
            </template>
            <div class="tl__body">
              <p>{{ r.text }}</p>
              <IconRow :icons="r.icons" />
            </div>
          </Dropdown>
        </li>
      </ol>
    </div>
  </section>
</template>
