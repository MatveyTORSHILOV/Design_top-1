<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { prologue } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const hillPathRef = ref(null);
const borderRectRef = ref(null);
const quoteBlockRef = ref(null);
const trees = ref([]);
const lineDrawn = ref(false);

const treeSlots = [
  { at: 0.22, flip: false },
  { at: 0.38, flip: true },
  { at: 0.52, flip: false },
  { at: 0.68, flip: true },
  { at: 0.82, flip: true },
];

let ctx;
let borderTween;
let played = false;

function placeTrees() {
  const path = hillPathRef.value;
  if (!path) return;

  const len = path.getTotalLength();
  trees.value = treeSlots.map((slot, i) => {
    const pt = path.getPointAtLength(len * slot.at);
    const ptNext = path.getPointAtLength(Math.min(len, len * slot.at + 2));
    const angle = (Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * 180) / Math.PI - 90;
    return { x: pt.x, y: pt.y, angle: slot.flip ? angle + 180 : angle, id: i };
  });
}

function showTrees() {
  lineDrawn.value = true;
  gsap.from(".perspective-tree", {
    opacity: 0,
    scale: 0,
    duration: 0.5,
    stagger: 0.12,
    ease: "back.out(2)",
    transformOrigin: "center bottom",
  });
}

function hideTrees() {
  lineDrawn.value = false;
  gsap.set(".perspective-tree", { opacity: 0, scale: 0 });
}

function startBorderAnimation() {
  const rect = borderRectRef.value;
  const block = quoteBlockRef.value;
  if (!rect || !block) return;

  const w = block.clientWidth;
  const h = block.clientHeight;
  rect.setAttribute("width", w - 2);
  rect.setAttribute("height", h - 2);

  const perimeter = 2 * (w + h);
  const segment = Math.min(120, perimeter * 0.22);

  borderTween?.kill();
  gsap.set(rect, {
    strokeDasharray: `${segment} ${perimeter}`,
    strokeDashoffset: 0,
  });

  borderTween = gsap.to(rect, {
    strokeDashoffset: -perimeter,
    duration: 5,
    ease: "none",
    repeat: -1,
  });
}

function playSequence() {
  if (played) return;
  played = true;

  const path = hillPathRef.value;
  if (!path) return;

  const len = path.getTotalLength();
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2.8,
    ease: "power2.inOut",
    onComplete: () => {
      placeTrees();
      showTrees();
      startBorderAnimation();
    },
  });

  gsap.from(".perspective__title, .section-tag", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.15,
    ease: "power2.out",
  });

  gsap.from(".quote-block__content", {
    opacity: 0,
    x: 40,
    duration: 1,
    delay: 0.4,
    ease: "power2.out",
  });
}

function resetSequence() {
  played = false;
  borderTween?.kill();
  hideTrees();

  const path = hillPathRef.value;
  if (path) {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDashoffset: len, opacity: 0 });
  }
}

onMounted(() => {
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: "top 70%",
      end: "bottom 20%",
      onEnter: playSequence,
      onEnterBack: playSequence,
      onLeave: resetSequence,
      onLeaveBack: resetSequence,
    });

    if (ScrollTrigger.isInViewport(sectionRef.value)) {
      playSequence();
    }
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
      class="perspective-hill"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="hill-glow">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        ref="hillPathRef"
        class="hill-line"
        d="M 0 100 L 18 78 L 38 62 L 58 42 L 78 22 L 100 6"
        fill="none"
        filter="url(#hill-glow)"
      />

      <g v-if="lineDrawn" class="perspective-trees">
        <g
          v-for="tree in trees"
          :key="tree.id"
          class="perspective-tree"
          :transform="`translate(${tree.x} ${tree.y}) rotate(${tree.angle})`"
        >
          <line x1="0" y1="0" x2="0" y2="-3.2" class="tree-stem" />
          <line x1="0" y1="-1.6" x2="-1.4" y2="-0.4" class="tree-branch" />
          <line x1="0" y1="-1.6" x2="1.4" y2="-0.4" class="tree-branch" />
          <line x1="0" y1="-2.4" x2="-1.1" y2="-1.2" class="tree-branch" />
          <line x1="0" y1="-2.4" x2="1.1" y2="-1.2" class="tree-branch" />
        </g>
      </g>

      <circle class="hill-origin-glow" cx="0" cy="100" r="1.8" />
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
  min-height: 85vh;
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
  stroke-width: 0.55;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
}

.hill-origin-glow {
  fill: #e8a020;
  opacity: 0.7;
  filter: blur(0.3px);
}

.tree-stem,
.tree-branch {
  stroke: #e8a020;
  stroke-width: 0.35;
  stroke-linecap: round;
}

.perspective__inner {
  position: relative;
  z-index: 2;
  min-height: 75vh;
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
