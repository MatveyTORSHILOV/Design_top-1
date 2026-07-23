<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const dotRef = ref(null);
const glowRef = ref(null);
const ringRef = ref(null);

let x = 0;
let y = 0;
let tx = 0;
let ty = 0;
let raf = 0;
let active = false;

function onMove(e) {
  tx = e.clientX;
  ty = e.clientY;
  if (!active) {
    active = true;
    if (dotRef.value) dotRef.value.style.opacity = "1";
    if (glowRef.value) glowRef.value.style.opacity = "1";
    if (ringRef.value) ringRef.value.style.opacity = "1";
  }
}

function onLeave() {
  active = false;
  if (dotRef.value) dotRef.value.style.opacity = "0";
  if (glowRef.value) glowRef.value.style.opacity = "0";
  if (ringRef.value) ringRef.value.style.opacity = "0";
}

function onDown() {
  dotRef.value?.classList.add("is-pressed");
}

function onUp() {
  dotRef.value?.classList.remove("is-pressed");
}

function tick() {
  x += (tx - x) * 0.18;
  y += (ty - y) * 0.18;

  const dot = dotRef.value;
  const glow = glowRef.value;
  const ring = ringRef.value;

  if (dot) {
    dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }
  if (glow) {
    glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }
  if (ring) {
    ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }

  raf = requestAnimationFrame(tick);
}

function bindHover() {
  const targets = document.querySelectorAll("a, button, .work-row, .hero__bg-panel, [role='button']");
  targets.forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

onMounted(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  if (reduced || coarse) return;

  document.body.classList.add("custom-cursor");
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseleave", onLeave);
  window.addEventListener("mousedown", onDown);
  window.addEventListener("mouseup", onUp);
  raf = requestAnimationFrame(tick);
  setTimeout(bindHover, 500);
});

onUnmounted(() => {
  document.body.classList.remove("custom-cursor", "cursor-hover");
  window.removeEventListener("mousemove", onMove);
  window.removeEventListener("mouseleave", onLeave);
  window.removeEventListener("mousedown", onDown);
  window.removeEventListener("mouseup", onUp);
  cancelAnimationFrame(raf);
});
</script>

<template>
  <div class="cursor-system" aria-hidden="true">
    <div ref="glowRef" class="cursor-glow" />
    <div ref="ringRef" class="cursor-ring" />
    <div ref="dotRef" class="cursor-dot" />
  </div>
</template>

<style scoped>
.cursor-system {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10000;
}

.cursor-glow,
.cursor-ring,
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  will-change: transform;
}

.cursor-glow {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(201, 162, 39, 0.35) 0%,
    rgba(201, 162, 39, 0.12) 35%,
    rgba(168, 132, 26, 0.04) 55%,
    transparent 70%
  );
  filter: blur(8px);
  transition: width 0.35s ease, height 0.35s ease, opacity 0.25s ease;
}

.cursor-ring {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(201, 162, 39, 0.45);
  box-shadow:
    0 0 20px rgba(201, 162, 39, 0.25),
    inset 0 0 12px rgba(201, 162, 39, 0.08);
  transition: width 0.35s ease, height 0.35s ease, opacity 0.25s ease;
}

.cursor-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-gold, #a8841a);
  box-shadow: 0 0 10px rgba(201, 162, 39, 0.8);
  transition: transform 0.15s ease, opacity 0.25s ease;
}
</style>
