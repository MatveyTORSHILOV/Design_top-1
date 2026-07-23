<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { primal } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
const caveRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const paths = caveRef.value?.querySelectorAll(".cave-draw");
    if (paths?.length) {
      paths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.3,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: root.value,
          start: "top 60%",
          end: "center center",
          scrub: 1.2,
        },
      });
    }

    gsap.from(".primal-grid > *", {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.9,
      scrollTrigger: {
        trigger: root.value,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  }, root);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="exposition" ref="root" class="section">
    <div class="section__inner">
      <p class="section-tag">{{ primal.label }}</p>
      <div class="primal-grid">
        <div ref="caveRef" class="primal-cave" aria-hidden="true">
          <svg viewBox="0 0 400 280">
            <rect width="400" height="280" fill="#ebe4d6" />
            <path class="cave-draw" d="M60 200 Q120 160 180 150 T300 140" fill="none" stroke="#8b6914" stroke-width="2" />
            <path class="cave-draw" d="M80 210 L140 175 L200 160" fill="none" stroke="#a8841a" stroke-width="3" />
            <ellipse class="cave-draw" cx="200" cy="175" rx="55" ry="35" fill="none" stroke="#6b1c2a" stroke-width="2" />
            <path class="cave-draw" d="M155 175 L165 120 M245 175 L235 120" fill="none" stroke="#a8841a" stroke-width="2" />
          </svg>
        </div>
        <div>
          <h2 class="section__title">{{ primal.title }}</h2>
          <p class="section__lead">{{ primal.lead }}</p>
          <p style="margin-top:1.5rem;font-size:0.875rem;color:var(--color-muted);line-height:1.8">{{ primal.body }}</p>
          <p class="primal-accent">{{ primal.accent }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
