<script setup>
import AboutSection from './components/AboutSection.vue'
import EducationSection from './components/EducationSection.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteNav from './components/SiteNav.vue'
import SkillsSection from './components/SkillsSection.vue'
import WorkSection from './components/WorkSection.vue'
</script>

<template>
  <SiteNav />
  <main id="top">
    <HeroSection />
    <ProjectsSection />
    <SkillsSection />
    <WorkSection />
    <EducationSection />
    <AboutSection />
  </main>
  <SiteFooter />
</template>
