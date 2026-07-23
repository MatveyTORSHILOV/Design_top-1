<script setup>
import { prologue } from "../data/content.js";
</script>

<template>
  <section class="section section--dark">
    <div class="section__inner reveal-block">
      <p class="section-tag">{{ prologue.label }}</p>
      <h2 class="section__title perspective__title">{{ prologue.title }}</h2>
      <blockquote class="quote-block">
        <p>{{ prologue.quote }}</p>
        <cite>{{ prologue.cite }}</cite>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.section--dark .quote-block {
  border-color: rgba(255,255,255,0.12);
  color: var(--color-paper);
}
.section--dark .section-tag { color: rgba(255,255,255,0.4); }
</style>
