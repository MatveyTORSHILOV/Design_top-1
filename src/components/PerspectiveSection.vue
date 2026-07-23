<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { prologue } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const borderRectRef = ref(null);
const quoteBlockRef = ref(null);

let ctx;
let borderTween;

function startBorderAnimation() {
  const rect = borderRectRef.value;
  const block = quoteBlockRef.value;
  if (!rect || !block) return;

  const w = block.clientWidth;
  const h = block.clientHeight;
  rect.setAttribute("width", Math.max(0, w - 2));
  rect.setAttribute("height", Math.max(0, h - 2));

  const perimeter = 2 * (w + h);
  const segment = Math.min(100, perimeter * 0.22);

  borderTween?.kill();
  gsap.set(rect, { strokeDasharray: `${segment} ${perimeter}`, strokeDashoffset: 0 });
  borderTween = gsap.to(rect, {
    strokeDashoffset: -perimeter,
    duration: 4,
    ease: "none",
    repeat: -1,
  });
}

function stopBorderAnimation() {
  borderTween?.kill();
}

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".perspective__title, .section-tag", {
      opacity: 0,
      y: 24,
      duration: 0.9,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".quote-block__content", {
      opacity: 0,
      x: 30,
      duration: 0.9,
      scrollTrigger: {
        trigger: quoteBlockRef.value,
        start: "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });

    ScrollTrigger.create({
      trigger: quoteBlockRef.value,
      start: "top 92%",
      onEnter: startBorderAnimation,
      onEnterBack: startBorderAnimation,
      onLeave: stopBorderAnimation,
      onLeaveBack: stopBorderAnimation,
    });
  }, sectionRef);
});

onUnmounted(() => {
  borderTween?.kill();
  ctx?.revert();
});
</script>

<template>
  <section ref="sectionRef" class="section section--dark perspective-section">
    <svg
      class="perspective-line"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        class="hill-line"
        x1="8"
        y1="92"
        x2="87"
        y2="12"
      />
    </svg>

    <div class="section__inner perspective__inner">
      <p class="section-tag">{{ prologue.label }}</p>
      <h2 class="section__title perspective__title">{{ prologue.title }}</h2>

      <blockquote ref="quoteBlockRef" class="quote-block quote-block--run">
        <svg class="quote-border-svg" aria-hidden="true">
          <rect
            ref="borderRectRef"
            class="quote-border__rect"
            x="1"
            y="1"
            width="100"
            height="100"
            fill="none"
          />
        </svg>
        <div class="quote-block__content">
          <p>{{ prologue.quote }}</p>
          <cite>{{ prologue.cite }}</cite>
        </div>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.perspective-section {
  position: relative;
  overflow: hidden;
  min-height: 90vh;
  background: #0a0a0a;
}

.perspective-line {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.hill-line {
  stroke: #e8a020;
  stroke-width: 0.5;
  stroke-linecap: round;
}

.perspective__inner {
  position: relative;
  z-index: 2;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.perspective__title {
  max-width: 14ch;
  margin-top: var(--space-md);
}

.quote-block--run {
  position: relative;
  margin-top: auto;
  margin-left: auto;
  margin-right: 0;
  max-width: 28rem;
  padding: var(--space-xl);
  border: none;
  background: transparent;
}

.quote-border-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.quote-border__rect {
  stroke: #e8a020;
  stroke-width: 2;
}

.quote-block__content {
  position: relative;
  z-index: 1;
}

.quote-block__content p {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-style: italic;
  line-height: 1.5;
  color: var(--color-paper);
}

.quote-block__content cite {
  display: block;
  margin-top: var(--space-md);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-style: normal;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.1em;
}

.section--dark .section-tag {
  color: rgba(255, 255, 255, 0.4);
}
</style>
