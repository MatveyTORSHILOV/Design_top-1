<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { epochPoints } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.utils.toArray(".epoch__point").forEach((point) => {
      gsap.from(point, {
        opacity: 0,
        x: -40,
        duration: 0.9,
        scrollTrigger: {
          trigger: point,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      const year = point.querySelector(".epoch__year");
      if (year) {
        gsap.from(year, {
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: point,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });
  }, sectionRef);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="epoch" ref="sectionRef" class="section epoch">
    <div class="section__inner">
      <div class="section__label">
        <span class="deco-diamond" aria-hidden="true" />
        <span>Зал VIII · Хронология</span>
        <span class="deco-line" style="flex: 1" />
      </div>

      <h2 class="section__title">От пещеры до небоскрёба</h2>

      <div class="epoch__track">
        <article v-for="point in epochPoints" :key="point.year" class="epoch__point">
          <p class="epoch__year">{{ point.year }}</p>
          <p class="epoch__event">{{ point.event }}</p>
          <p class="epoch__context">{{ point.context }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
