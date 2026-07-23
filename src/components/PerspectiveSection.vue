<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { prologue } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const hillPathRef = ref(null);
const glowRef = ref(null);
const borderRectRef = ref(null);
const quoteBlockRef = ref(null);

let ctx;
let borderTween;
let lineTimeline;
let played = false;
let borderStarted = false;

function startBorderAnimation() {
  if (borderStarted) return;
  borderStarted = true;

  const rect = borderRectRef.value;
  const block = quoteBlockRef.value;
  if (!rect || !block) return;

  const w = block.clientWidth;
  const h = block.clientHeight;
  rect.setAttribute("width", Math.max(0, w - 2));
  rect.setAttribute("height", Math.max(0, h - 2));

  const perimeter = 2 * (w + h);
  const segment = Math.min(100, perimeter * 0.2);

  borderTween?.kill();
  gsap.set(rect, { strokeDasharray: `${segment} ${perimeter}`, strokeDashoffset: 0 });
  borderTween = gsap.to(rect, {
    strokeDashoffset: -perimeter,
    duration: 4.5,
    ease: "none",
    repeat: -1,
  });
}

function stopBorder() {
  borderStarted = false;
  borderTween?.kill();
}

function updateGlow(progress) {
  const path = hillPathRef.value;
  if (!path || !glowRef.value) return;

  const len = path.getTotalLength();
  const tip = path.getPointAtLength(len * progress);
  glowRef.value.setAttribute("cx", tip.x);
  glowRef.value.setAttribute("cy", tip.y);
  glowRef.value.setAttribute("opacity", progress > 0.02 && progress < 0.995 ? 0.9 : 0);
}

function playSequence() {
  if (played) return;
  played = true;

  const path = hillPathRef.value;
  if (!path) return;

  const len = path.getTotalLength();
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
  updateGlow(0);

  lineTimeline?.kill();
  lineTimeline = gsap.timeline();

  lineTimeline.to(path, {
    strokeDashoffset: 0,
    duration: 2.6,
    ease: "power1.inOut",
    onUpdate() {
      updateGlow(this.progress());
    },
    onComplete() {
      updateGlow(1);
      if (glowRef.value) glowRef.value.setAttribute("opacity", 0);
      startBorderAnimation();
    },
  });
}

function resetSequence() {
  played = false;
  lineTimeline?.kill();
  stopBorder();

  const path = hillPathRef.value;
  if (path) {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
  }
  if (glowRef.value) glowRef.value.setAttribute("opacity", 0);
}

function initPath() {
  const path = hillPathRef.value;
  if (!path) return;
  const len = path.getTotalLength();
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
  if (glowRef.value) glowRef.value.setAttribute("opacity", 0);
}

onMounted(() => {
  ctx = gsap.context(() => {
    initPath();

    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: "top 72%",
      end: "bottom 20%",
      onEnter: playSequence,
      onLeave: resetSequence,
      onLeaveBack: resetSequence,
    });

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
  }, sectionRef);
});

onUnmounted(() => {
  lineTimeline?.kill();
  borderTween?.kill();
  ctx?.revert();
});
</script>

<template>
  <section ref="sectionRef" class="section section--dark perspective-section">
    <svg
      class="perspective-hill"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref="hillPathRef"
        class="hill-line"
        d="M 8 92 L 22 76 L 40 58 L 58 40 L 76 22 L 87 12"
        fill="none"
      />

      <circle ref="glowRef" class="hill-tip-glow" r="1.5" cx="8" cy="92" opacity="0" />
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

.perspective-hill {
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
  stroke-linejoin: round;
  filter: drop-shadow(0 0 3px rgba(232, 160, 32, 0.5));
}

.hill-tip-glow {
  fill: #e8a020;
  filter: blur(0.5px) drop-shadow(0 0 2px rgba(232, 160, 32, 0.8));
  pointer-events: none;
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

@media (prefers-reduced-motion: reduce) {
  .hill-line {
    opacity: 1 !important;
    stroke-dashoffset: 0 !important;
  }
}
</style>
