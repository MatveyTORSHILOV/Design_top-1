<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { prologue } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".perspective__title", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: { trigger: root.value, start: "top 70%", toggleActions: "play none none reverse" },
    });
    gsap.from(".quote-block", {
      opacity: 0,
      x: 60,
      duration: 1,
      scrollTrigger: { trigger: root.value, start: "top 65%", toggleActions: "play none none reverse" },
    });
  }, root);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section ref="root" class="section section--dark">
    <div class="section__inner">
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
