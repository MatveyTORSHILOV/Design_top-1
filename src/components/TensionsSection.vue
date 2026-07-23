<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { tensions } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.utils.toArray(".tension-card").forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        x: -80,
        clipPath: "inset(0 100% 0 0)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const poles = card.querySelectorAll(".tension-card__pole span");
      gsap.from(poles, {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, sectionRef);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="tensions" ref="sectionRef" class="section tensions">
    <div class="section__inner">
      <div class="section__label">
        <span class="deco-diamond" aria-hidden="true" />
        <span>Залы I–V · Пять напряжений</span>
        <span class="deco-line" style="flex: 1" />
      </div>

      <h2 class="section__title">Противоречия, из которых<br />собран стиль</h2>
      <p class="section__lead tensions__lead">
        Ар-деко — не гармония. Это удержание полюсов. Каждый зал — одна ось.
      </p>

      <article
        v-for="t in tensions"
        :key="t.num"
        class="tension-card"
        :data-num="t.num"
      >
        <div class="tension-card__pole">
          <span>{{ t.poleA }}</span>
          <span class="deco-chevron" aria-hidden="true" />
          <span>{{ t.poleB }}</span>
        </div>
        <div>
          <p class="tension-card__psych">{{ t.psych }}</p>
          <h3 class="tension-card__title">{{ t.title }}</h3>
          <p class="tension-card__text">{{ t.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.tensions__lead {
  margin-bottom: var(--space-2xl);
}
</style>
