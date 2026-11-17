<script setup>
defineProps({ photo: { type: Object, required: true } }) // { src, alt, cutout }
</script>

<!-- The portrait: a circle with the person standing in front of it, the head above the circle's edge, the body running
     down to the foot of the hero (where it fades). A cut-out photo (background removed) stands in front; a normal photo
     is cropped into the circle; with no photo yet, a grey head-and-shoulders stands in. -->
<template>
  <figure class="me" :class="photo.src && !photo.cutout && 'me--in'">
    <span class="me__disc" aria-hidden="true">
      <img v-if="photo.src && !photo.cutout" class="me__crop" :src="photo.src" :alt="photo.alt" fetchpriority="high">
    </span>
    <img v-if="photo.src && photo.cutout" class="me__cut" :src="photo.src" :alt="photo.alt" fetchpriority="high">
    <span v-else-if="!photo.src" class="me__ghost" aria-hidden="true"></span>
  </figure>
</template>
