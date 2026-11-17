<script setup>
import { ArrowUpRight, FileText, Globe } from 'lucide-vue-next'

defineProps({ links: { type: Array, required: true } })
</script>

<!-- Links to other sites and files: each opens in a new tab. A link with a kind (github, site, pdf) leads with its
     mark: GitHub's own, a globe for a website, a page for a document. -->
<template>
  <ul v-if="links.length" class="out-links">
    <li v-for="l in links" :key="l.href">
      <a class="out" :class="l.kind && 'out--chip'" :href="l.href" target="_blank" rel="noopener">
        <img v-if="l.kind === 'github'" class="out__mark ic-ink" src="/kit/icons/github.svg" alt="" width="16" height="16">
        <Globe v-else-if="l.kind === 'site'" class="out__mark" :size="16" :stroke-width="1.75" aria-hidden="true" />
        <FileText v-else-if="l.kind === 'pdf'" class="out__mark" :size="16" :stroke-width="1.75" aria-hidden="true" />
        {{ l.label }}<ArrowUpRight class="out__icon" :size="16" :stroke-width="1.75" aria-hidden="true" />
        <span class="tw:sr-only">(opens in a new tab)</span>
      </a>
    </li>
  </ul>
</template>
