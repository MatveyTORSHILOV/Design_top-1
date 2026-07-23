<script setup>
import { tensions } from "../data/content.js";
</script>

<template>
  <section id="tensions" class="section">
    <div class="section__inner reveal-block">
      <p class="section-tag">The tensions</p>
      <h2 class="section__title">Противоречия,<br />из которых собран стиль</h2>
      <div class="tension-grid" style="margin-top:3rem">
        <article v-for="t in tensions" :key="t.num" class="tension-cell reveal-block">
          <p class="tension-cell__poles">{{ t.poleA }} / {{ t.poleB }}</p>
          <h3 class="tension-cell__title">{{ t.title }}</h3>
          <p class="tension-cell__text">{{ t.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
