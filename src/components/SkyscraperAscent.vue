<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TowerScene = defineAsyncComponent(() => import("./three/TowerScene.vue"));

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const phraseRef = ref(null);
const progress = ref(0);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: "top top",
      end: "+=180%",
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        progress.value = self.progress;
      },
    });

    if (phraseRef.value) {
      gsap.fromTo(
        phraseRef.value,
        { opacity: 0, y: 60, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: sectionRef.value,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      gsap.to(phraseRef.value, {
        opacity: 0,
        y: -40,
        filter: "blur(6px)",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "60% top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, sectionRef);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="ascent" ref="sectionRef" class="ascent">
    <div class="ascent__veil" aria-hidden="true" />
    <div class="ascent__content">
      <p ref="phraseRef" class="ascent__phrase">
        Вертикаль — это молитва машинного века
      </p>
      <div class="ascent__canvas-wrap">
        <TowerScene :progress="progress" />
      </div>
      <div class="ascent__floor" aria-hidden="true">
        <div class="ascent__floor-line" />
        <span class="ascent__floor-label">Paris · 1925</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ascent {
  position: relative;
  height: 100vh;
  background: radial-gradient(ellipse 80% 60% at 50% 100%, #1b3b2f 0%, #08080a 55%);
  overflow: hidden;
}

.ascent__veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(8, 8, 10, 0.9) 100%);
  pointer-events: none;
  z-index: 2;
}

.ascent__content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 4rem;
  z-index: 1;
}

.ascent__phrase {
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 3vw, 2rem);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-gold);
  text-align: center;
  white-space: nowrap;
  z-index: 3;
  text-shadow: 0 0 40px rgba(201, 162, 39, 0.4);
}

.ascent__canvas-wrap {
  width: min(520px, 90vw);
  height: min(70vh, 640px);
  margin-bottom: 2rem;
}

.ascent__floor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  z-index: 3;
}

.ascent__floor-line {
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
}

.ascent__floor-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--color-muted);
  text-transform: uppercase;
}
</style>
