<script setup>
defineProps({ paper: { type: Object, required: true } }) // { href, title, abstract: [] }
</script>

<!-- A report shown as its own first page: a white sheet with the title and the start of the abstract in two columns,
     set like the paper (a serif, the "Povzetek—" lead-in), fading out at the foot. It opens the PDF in a new tab. -->
<template>
  <component
    :is="paper.href ? 'a' : 'div'"
    class="paper"
    v-bind="paper.href ? { href: paper.href, target: '_blank', rel: 'noopener', 'aria-label': 'Open the report (PDF, in Slovene)' } : { 'aria-hidden': 'true' }"
  >
    <span class="paper__sheet" lang="sl" aria-hidden="true">
      <span class="paper__title">{{ paper.title }}</span>
      <span class="paper__cols">
        <span v-for="(p, i) in paper.abstract" :key="i" class="paper__p"><template v-if="i === 0"><i>Povzetek</i>—</template>{{ p }}</span>
      </span>
    </span>
  </component>
</template>
