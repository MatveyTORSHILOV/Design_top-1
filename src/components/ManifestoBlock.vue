<script setup>
import { manifesto } from "../data/content.js";
</script>

<template>
  <section id="manifesto" class="manifesto">
    <div class="manifesto__inner reveal-block">
      <p class="section-tag">{{ manifesto.label }}</p>
      <div class="manifesto__headline">
        <span>{{ manifesto.lineA }}</span>
        <span>{{ manifesto.lineB }}</span>
      </div>
      <p class="manifesto__body">{{ manifesto.body }}</p>
    </div>
  </section>
</template>
