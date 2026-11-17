<script setup>
defineProps({ icons: { type: Array, required: true } })
</script>

<!-- The real logos of the tools a project uses, in their own colours (taste-skill icons.mjs), each on a light
     disc so dark and black marks read on either theme -->
<template>
  <span v-if="icons.length" class="icon-row">
    <span v-for="i in icons" :key="i.src" class="logo-disc" :title="i.alt">
      <img class="ic" :src="i.src" :alt="i.alt" width="18" height="18">
    </span>
  </span>
</template>
