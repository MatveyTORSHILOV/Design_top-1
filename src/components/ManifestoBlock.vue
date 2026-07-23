<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { manifesto } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".manifesto__headline span", {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: root.value,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".manifesto__body", {
      opacity: 0,
      x: 40,
      duration: 1,
      scrollTrigger: {
        trigger: root.value,
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    });
  }, root);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="manifesto" ref="root" class="manifesto">
    <div class="manifesto__inner">
      <p class="section-tag">{{ manifesto.label }}</p>
      <div class="manifesto__headline">
        <span>{{ manifesto.lineA }}</span>
        <span>{{ manifesto.lineB }}</span>
      </div>
      <p class="manifesto__body">{{ manifesto.body }}</p>
    </div>
  </section>
</template>
