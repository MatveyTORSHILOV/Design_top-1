<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { studio, epochPoints } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".studio-intro", {
      opacity: 0,
      y: 40,
      duration: 1,
      scrollTrigger: { trigger: root.value, start: "top 70%", toggleActions: "play none none reverse" },
    });
    gsap.from(".discipline-list li", {
      opacity: 0,
      x: -20,
      stagger: 0.08,
      duration: 0.6,
      scrollTrigger: { trigger: root.value, start: "top 65%", toggleActions: "play none none reverse" },
    });
  }, root);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="contact" ref="root" class="section section--dark">
    <div class="section__inner">
      <p class="section-tag">{{ studio.label }}</p>
      <p class="studio-intro">{{ studio.intro }}</p>

      <div class="studio-grid">
        <div>
          <h3 class="section__title" style="font-size:1.5rem;margin-bottom:1.5rem">Мы исследуем :</h3>
          <ul class="discipline-list">
            <li v-for="d in studio.disciplines" :key="d">{{ d }}</li>
          </ul>
        </div>
        <div>
          <h3 class="section__title" style="font-size:1.5rem;margin-bottom:1.5rem">Материалы</h3>
          <div class="palette-row">
            <div v-for="m in studio.materials" :key="m.name" class="palette-chip">
              <span :style="{ background: m.hex }" />
              <span>{{ m.name }}</span>
            </div>
          </div>
          <div class="epoch-mini">
            <div v-for="ep in epochPoints" :key="ep.year" class="epoch-mini__item">
              <span class="epoch-mini__year">{{ ep.year }}</span>
              <div>
                <strong>{{ ep.event }}</strong>
                <p style="opacity:0.55;margin-top:0.25rem">{{ ep.context }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="mailto:exposition@forme.art"
        style="display:inline-block;margin-top:3rem;font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;border-bottom:1px solid currentColor;padding-bottom:0.25rem"
      >
        Запросить просмотр →
      </a>
    </div>
  </section>
</template>
