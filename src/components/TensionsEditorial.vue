<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { tensions } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".tension-cell", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      scrollTrigger: { trigger: root.value, start: "top 70%", toggleActions: "play none none reverse" },
    });
  }, root);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="tensions" ref="root" class="section">
    <div class="section__inner">
      <p class="section-tag">The tensions</p>
      <h2 class="section__title">Противоречия,<br />из которых собран стиль</h2>
      <div class="tension-grid" style="margin-top:3rem">
        <article v-for="t in tensions" :key="t.num" class="tension-cell">
          <p class="tension-cell__poles">{{ t.poleA }} / {{ t.poleB }}</p>
          <h3 class="tension-cell__title">{{ t.title }}</h3>
          <p class="tension-cell__text">{{ t.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
