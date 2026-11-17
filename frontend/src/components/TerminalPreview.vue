<script setup>
defineProps({ terminal: { type: Object, required: true } }) // { title, lines: [[[colour, text], ...], ...] }
</script>

<!-- A terminal window drawn in HTML: the title bar with its three lights, then the session, coloured like a shell,
     ending on a blinking cursor. Real text, so it stays sharp and a screen reader can read it. The glow sits behind
     the window (.term::before), the window itself is .term__win. -->
<template>
  <figure class="term">
    <div class="term__win">
      <span class="term__bar" aria-hidden="true">
        <i></i><i></i><i></i>
        <span class="term__title">{{ terminal.title }}</span>
      </span>
      <pre class="term__body"><template v-for="(line, i) in terminal.lines" :key="i"><span v-for="(seg, j) in line" :key="j" :class="`t-${seg[0]}`">{{ seg[1] }}</span><span v-if="i === terminal.lines.length - 1" class="term__cursor" aria-hidden="true"></span>{{ i < terminal.lines.length - 1 ? '\n' : '' }}</template></pre>
    </div>
  </figure>
</template>
