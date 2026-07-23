<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { heroPanels } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "../composables/useRevealBlocks.js";

gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
const part1 = ref(null);
const part2 = ref(null);
const part3 = ref(null);
const kineticChars = ref([]);
const activePanel = ref(-1);
let ctx;
let kineticTween;

function collectChars() {
  kineticChars.value = [
    ...splitWords(part1.value),
    ...splitWords(part2.value),
    ...splitWords(part3.value),
  ];
}

function onPanelEnter(i) {
  activePanel.value = i;
  const panel = root.value?.querySelectorAll(".hero__bg-panel")[i];
  if (!panel) return;
  gsap.to(panel, {
    opacity: 0.78,
    y: -20,
    scale: 1.04,
    duration: 0.65,
    ease: "power3.out",
  });
}

function onPanelLeave(i) {
  if (activePanel.value === i) activePanel.value = -1;
  const panel = root.value?.querySelectorAll(".hero__bg-panel")[i];
  if (!panel) return;
  gsap.to(panel, {
    opacity: 0.05,
    y: 0,
    scale: 1,
    duration: 0.7,
    ease: "power3.inOut",
  });
}

function onHeroMove(e) {
  if (!kineticChars.value.length) return;

  const rect = root.value.getBoundingClientRect();
  const nx = (e.clientX - rect.left) / rect.width - 0.5;
  const ny = (e.clientY - rect.top) / rect.height - 0.5;

  kineticChars.value.forEach((char, i) => {
    const wave = Math.sin(i * 0.45) * 4;
    gsap.to(char, {
      x: nx * 48 + wave,
      y: ny * 32,
      rotateZ: nx * 8 + wave * 0.5,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
}

function startKineticIdle() {
  if (!kineticChars.value.length) return;
  kineticTween = gsap.to(kineticChars.value, {
    y: "+=2.5",
    duration: 2,
    stagger: { each: 0.035, from: "random" },
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });
}

onMounted(() => {
  collectChars();

  ctx = gsap.context(() => {
    const panels = root.value.querySelectorAll(".hero__bg-panel");
    gsap.set(panels, { opacity: 0.05, y: 0, scale: 1 });

    gsap.from(panels, {
      scaleY: 0,
      transformOrigin: "bottom center",
      duration: 1.4,
      stagger: 0.1,
      ease: "power3.inOut",
    });

    gsap.from(kineticChars.value, {
      y: 100,
      opacity: 0,
      rotateX: -55,
      stagger: 0.018,
      duration: 1,
      ease: "power4.out",
      delay: 0.55,
      onComplete: startKineticIdle,
    });

    gsap.from([".hero__counter", ".hero__sub", ".hero__scroll"], {
      opacity: 0,
      y: 24,
      stagger: 0.15,
      duration: 0.9,
      delay: 1,
      ease: "power2.out",
    });

    gsap.to(".hero__scroll-line", {
      scaleX: 0,
      transformOrigin: "right",
      scrollTrigger: {
        trigger: root.value,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, root);

  root.value?.addEventListener("mousemove", onHeroMove);
});

onUnmounted(() => {
  kineticTween?.kill();
  root.value?.removeEventListener("mousemove", onHeroMove);
  ctx?.revert();
});
</script>

<template>
  <section id="hero" ref="root" class="hero">
    <div class="hero__bg" aria-hidden="true">
      <div
        v-for="(panel, i) in heroPanels"
        :key="i"
        class="hero__bg-panel"
        :class="{ 'is-lit': activePanel === i }"
        :style="{ backgroundImage: `url('${panel.image}')` }"
        @mouseenter="onPanelEnter(i)"
        @mouseleave="onPanelLeave(i)"
      />
    </div>
    <div class="hero__inner">
      <p class="hero__counter">1925</p>
      <h1 class="hero__statement kinetic-title">
        <span ref="part1" class="kinetic-line">Не стиль, а</span>
        <em ref="part2" class="kinetic-line kinetic-line--accent">перспектива</em><span ref="part3" class="kinetic-line">.</span>
      </h1>
      <p class="hero__sub">
        Потому что форма — это всё. Выставка о психологическом договоре между
        человеком, машиной и первым жестом в пещере.
      </p>
      <a href="#manifesto" class="hero__scroll">
        <span class="hero__scroll-line" aria-hidden="true" />
        scroll
      </a>
    </div>
  </section>
</template>
