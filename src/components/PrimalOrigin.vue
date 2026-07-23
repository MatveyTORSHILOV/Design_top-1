<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { primal } from "../data/content.js";
import { caveArtSprites } from "../data/caveArts.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const floatLayerRef = ref(null);
const artRefs = ref([]);

const sprites = [];
let active = false;
let raf = 0;
let scrollTrigger = null;
let showTween = null;

function setArtRef(el, i) {
  if (el) artRefs.value[i] = el;
}

function initSprites() {
  const section = sectionRef.value;
  if (!section) return;

  const w = section.offsetWidth;
  const h = section.offsetHeight;

  caveArtSprites.forEach((art, i) => {
    const el = artRefs.value[i];
    if (!el) return;

    const sprite = {
      el,
      x: Math.random() * (w - art.width),
      y: Math.random() * (h - art.width),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      width: art.width,
      phase: Math.random() * Math.PI * 2,
    };

    gsap.set(el, { x: sprite.x, y: sprite.y, opacity: 0, scale: 0.6 });
    sprites.push(sprite);
  });
}

function showPaintings() {
  active = true;
  showTween?.kill();
  showTween = gsap.to(sprites.map((s) => s.el), {
    opacity: 0.88,
    scale: 1,
    duration: 0.9,
    stagger: 0.07,
    ease: "power2.out",
  });
  if (!raf) raf = requestAnimationFrame(tick);
}

function hidePaintings() {
  active = false;
  showTween?.kill();
  gsap.to(sprites.map((s) => s.el), {
    opacity: 0,
    scale: 0.5,
    duration: 0.55,
    stagger: 0.03,
    ease: "power2.in",
  });
}

function onMouseMove(e) {
  if (!active) return;

  sprites.forEach((sprite) => {
    const rect = sprite.el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - e.clientX;
    const dy = cy - e.clientY;
    const dist = Math.hypot(dx, dy);

    if (dist < 130 && dist > 0) {
      const force = ((130 - dist) / 130) * 1.8;
      sprite.vx += (dx / dist) * force;
      sprite.vy += (dy / dist) * force;
    }
  });
}

function tick() {
  if (!active || !sectionRef.value) {
    raf = 0;
    return;
  }

  const w = sectionRef.value.offsetWidth;
  const h = sectionRef.value.offsetHeight;
  const t = performance.now() * 0.001;

  sprites.forEach((sprite) => {
    sprite.vx += Math.sin(t * 0.7 + sprite.phase) * 0.008;
    sprite.vy += Math.cos(t * 0.5 + sprite.phase) * 0.008;

    sprite.x += sprite.vx;
    sprite.y += sprite.vy;

    sprite.vx *= 0.985;
    sprite.vy *= 0.985;

    const pad = 12;
    if (sprite.x < pad) {
      sprite.x = pad;
      sprite.vx = Math.abs(sprite.vx) * 0.8;
    }
    if (sprite.x > w - sprite.width - pad) {
      sprite.x = w - sprite.width - pad;
      sprite.vx = -Math.abs(sprite.vx) * 0.8;
    }
    if (sprite.y < pad) {
      sprite.y = pad;
      sprite.vy = Math.abs(sprite.vy) * 0.8;
    }
    if (sprite.y > h - sprite.width - pad) {
      sprite.y = h - sprite.width - pad;
      sprite.vy = -Math.abs(sprite.vy) * 0.8;
    }

    sprite.el.style.transform = `translate(${sprite.x}px, ${sprite.y}px)`;
  });

  raf = requestAnimationFrame(tick);
}

onMounted(() => {
  requestAnimationFrame(() => {
    initSprites();

    scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.value,
      start: "top 75%",
      end: "bottom 25%",
      onEnter: showPaintings,
      onLeave: hidePaintings,
      onEnterBack: showPaintings,
      onLeaveBack: hidePaintings,
    });

    if (scrollTrigger.isActive) showPaintings();
  });

  sectionRef.value?.addEventListener("mousemove", onMouseMove);
});

onUnmounted(() => {
  active = false;
  cancelAnimationFrame(raf);
  scrollTrigger?.kill();
  showTween?.kill();
  sectionRef.value?.removeEventListener("mousemove", onMouseMove);
});
</script>

<template>
  <section id="exposition" ref="sectionRef" class="section primal-section">
    <div ref="floatLayerRef" class="primal-float-layer" aria-hidden="true">
      <div
        v-for="(art, i) in caveArtSprites"
        :key="art.id"
        :ref="(el) => setArtRef(el, i)"
        class="cave-art"
        :style="{ width: `${art.width}px` }"
      >
        <svg :viewBox="art.viewBox" class="cave-art__svg">
          <path
            v-for="(path, pi) in art.paths"
            :key="pi"
            :d="path.d"
            :fill="path.fill ?? 'none'"
            :stroke="path.stroke ?? 'none'"
            :stroke-width="path.strokeWidth ?? 0"
            :opacity="path.opacity ?? 1"
          />
        </svg>
      </div>
    </div>

    <div class="section__inner reveal-block">
      <p class="section-tag">{{ primal.label }}</p>
      <div class="primal-grid">
        <div class="primal-cave" aria-hidden="true">
          <svg viewBox="0 0 400 280">
            <rect width="400" height="280" fill="#ebe4d6" />
            <path class="cave-draw" d="M60 200 Q120 160 180 150 T300 140" fill="none" stroke="#8b6914" stroke-width="2" />
            <path class="cave-draw" d="M80 210 L140 175 L200 160" fill="none" stroke="#a8841a" stroke-width="3" />
            <ellipse class="cave-draw" cx="200" cy="175" rx="55" ry="35" fill="none" stroke="#6b1c2a" stroke-width="2" />
            <path class="cave-draw" d="M155 175 L165 120 M245 175 L235 120" fill="none" stroke="#a8841a" stroke-width="2" />
          </svg>
        </div>
        <div class="primal-text">
          <h2 class="section__title primal-title">
            До слова было пятно<span class="ink-blot" aria-hidden="true" />
          </h2>
          <p class="section__lead">{{ primal.lead }}</p>
          <p class="primal-body">{{ primal.body }}</p>
          <p class="primal-accent">{{ primal.accent }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.primal-section {
  position: relative;
  overflow: hidden;
  min-height: 70vh;
}

.primal-float-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.cave-art {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  will-change: transform, opacity;
  opacity: 0;
}

.cave-art__svg {
  width: 100%;
  height: auto;
  display: block;
}

.section__inner {
  position: relative;
  z-index: 2;
}

.primal-title {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0;
}

.ink-blot {
  display: inline-block;
  width: 0.42em;
  height: 0.42em;
  margin-left: 0.06em;
  background: #0a0a0a;
  border-radius: 46% 54% 58% 42% / 52% 48% 52% 48%;
  transform: translateY(0.12em) rotate(-8deg);
  box-shadow:
    0 0 0 1px rgba(10, 10, 10, 0.15),
    2px 3px 0 rgba(10, 10, 10, 0.08);
  flex-shrink: 0;
}

.primal-body {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.8;
}

.primal-text {
  position: relative;
}
</style>
