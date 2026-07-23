<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { materials } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".materials__swatch", {
      opacity: 0,
      y: 40,
      scale: 0.9,
      stagger: 0.1,
      duration: 0.7,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  }, sectionRef);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="materials" ref="sectionRef" class="section materials">
    <div class="section__inner">
      <div class="section__label">
        <span class="deco-diamond" aria-hidden="true" />
        <span>Зал VII · Палитра материалов</span>
        <span class="deco-line" style="flex: 1" />
      </div>

      <h2 class="section__title">Хром, лак, золото</h2>
      <p class="section__lead materials__lead">
        Материалы ар-деко — психологические маркеры: власть, скорость, вечность.
      </p>

      <div class="materials__grid">
        <div v-for="m in materials" :key="m.name" class="materials__swatch">
          <div class="materials__swatch-block" :style="{ background: m.bg }" />
          <p class="materials__swatch-name">{{ m.name }}</p>
          <p class="materials__swatch-hex">{{ m.hex }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.materials__lead {
  margin-bottom: var(--space-2xl);
}
</style>
