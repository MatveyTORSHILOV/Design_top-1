<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { floatingPhrases } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rootRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const phrases = rootRef.value.querySelectorAll(".floating-phrase");

    phrases.forEach((phrase, i) => {
      gsap.fromTo(
        phrase,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 0.35,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: phrase,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      gsap.to(phrase, {
        opacity: 0,
        y: -30,
        filter: "blur(4px)",
        scrollTrigger: {
          trigger: phrase,
          start: "top 30%",
          end: "top 5%",
          scrub: 1,
        },
      });
    });
  }, rootRef);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <div ref="rootRef" class="floating-phrases" aria-hidden="true">
    <p
      v-for="(text, i) in floatingPhrases"
      :key="i"
      class="floating-phrase"
      :style="{ top: `${20 + i * 22}%`, left: i % 2 === 0 ? '8%' : 'auto', right: i % 2 === 1 ? '8%' : 'auto' }"
    >
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
.floating-phrases {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}

.floating-phrase {
  position: absolute;
  font-family: var(--font-display);
  font-size: clamp(0.75rem, 1.5vw, 1rem);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gold);
  white-space: nowrap;
  opacity: 0;
}
</style>
