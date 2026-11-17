<script setup>
import { person } from '../content.js'

const year = new Date().getFullYear()
</script>

<!-- footer.closing: row 1 the close in a lit panel, row 2 the contacts and links -->
<template>
  <footer class="footer closing" id="contact" aria-labelledby="close-h">
    <div class="wrap">
      <div class="closing__cta close--type ft__panel">
        <div class="hx__sky" aria-hidden="true">
          <span class="orb orb--orange"></span>
          <span class="orb orb--blue"></span>
        </div>
        <div class="section-head">
          <h2 id="close-h">Write to me about a job or a project</h2>
          <p>Email reaches me at {{ person.email }}.</p>
        </div>
        <a class="btn btn--primary btn--xl" :href="`mailto:${person.email}`">Email me<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8" /><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" /></svg></a>
      </div>
      <div class="closing__links">
        <div class="grid">
          <div class="span-4 stack-4">
            <a class="nav__logo" href="#top"><span class="mark" data-mark="stack" aria-hidden="true"></span>{{ person.name }}</a>
            <p class="footer__lede">Computer science student and developer.</p>
          </div>
          <div class="span-2 footer__col">
            <h3>Contact</h3>
            <ul>
              <li><a :href="`mailto:${person.email}`">Email</a></li>
              <li><a :href="person.github" target="_blank" rel="noopener">GitHub</a></li>
            </ul>
          </div>
          <div class="span-2 footer__col">
            <h3>Page</h3>
            <ul>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#work">Experience</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__legal">
          <span>&copy; {{ year }} {{ person.name }}</span>
          <span>Product names and logos are trademarks of their owners</span>
        </div>
      </div>
    </div>
  </footer>
</template>
