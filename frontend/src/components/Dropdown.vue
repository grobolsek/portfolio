<script setup>
import { ChevronDown } from 'lucide-vue-next'
</script>

<!-- One row that opens to show more. A native <details>, so it works by keyboard and without script;
     the open and close animate in browsers that support ::details-content (style.css). -->
<template>
  <details class="dd">
    <summary class="dd__head">
      <slot name="head" />
      <ChevronDown class="dd__chev" :size="20" :stroke-width="1.5" aria-hidden="true" />
    </summary>
    <div class="dd__body">
      <slot />
    </div>
  </details>
</template>
