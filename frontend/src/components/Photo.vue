<script setup>
defineProps({
  // { src, alt, position, frame } — frame: 'phone' (a phone screenshot) or 'sprite' (pixel art); ratio: the phone's
  photo: { type: Object, required: true },
  ratio: { type: String, default: '16 / 10' }, // the slot's shape: landscape by default
  tilt: { type: String, default: '0deg' },
  eager: { type: Boolean, default: false },
})
</script>

<!-- One picture slot. Until it has a src it is a plain grey box (hidden from screen readers). A photo sits on a
     blurred copy of itself, so its own colours glow onto the page, and both fade out at the bottom. A phone
     screenshot stands in a phone in the middle of the slot; pixel art is drawn large and sharp on a stage. -->
<template>
  <figure
    class="ph"
    :class="[photo.shape === 'circle' && 'ph--circle', photo.frame && `ph--${photo.frame}`]"
    :style="{ '--ratio': ratio, '--tilt': tilt, '--pos': photo.position || '50% 50%', '--shot': photo.ratio || 'auto' }"
  >
    <template v-if="photo.src && photo.frame === 'phone'">
      <img class="ph__glow" :src="photo.src" alt="" aria-hidden="true" :loading="eager ? 'eager' : 'lazy'">
      <span class="ph__stage">
        <span class="ph__phone"><img :src="photo.src" :alt="photo.alt" :loading="eager ? 'eager' : 'lazy'"></span>
      </span>
    </template>
    <span v-else-if="photo.src && photo.frame === 'sprite'" class="ph__stage">
      <span class="ph__box" aria-hidden="true"></span>
      <img class="ph__sprite" :src="photo.src" :alt="photo.alt" :loading="eager ? 'eager' : 'lazy'">
    </span>
    <template v-else-if="photo.src">
      <img class="ph__glow" :src="photo.src" alt="" aria-hidden="true" :loading="eager ? 'eager' : 'lazy'">
      <img class="ph__img" :src="photo.src" :alt="photo.alt" :loading="eager ? 'eager' : 'lazy'">
    </template>
    <span v-else class="ph__box" aria-hidden="true"></span>
  </figure>
</template>
