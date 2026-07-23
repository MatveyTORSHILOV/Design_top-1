<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { heroPanels } from "../data/content.js";
import gsap from "gsap";
import { splitChars } from "../composables/useGsap.js";

const rootRef = ref(null);
const titleRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const panels = rootRef.value.querySelectorAll(".hero__panel-inner");
    const nums = rootRef.value.querySelectorAll(".hero__panel-num");
    const epoch = rootRef.value.querySelector(".hero__epoch");
    const subtitle = rootRef.value.querySelector(".hero__subtitle");
    const scroll = rootRef.value.querySelector(".hero__scroll");

    gsap.set(panels, { scaleY: 0, transformOrigin: "bottom center" });
    gsap.set([epoch, subtitle, scroll], { opacity: 0, y: 30 });

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.to(panels, {
      scaleY: 1,
      duration: 1.4,
      stagger: 0.12,
    })
      .to(nums, { opacity: 1, duration: 0.6, stagger: 0.08 }, "-=0.8")
      .to(epoch, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");

    if (titleRef.value) {
      const chars = splitChars(titleRef.value);
      gsap.set(chars, { opacity: 0, y: 80, rotateX: -90 });
      tl.to(
        chars,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.06,
          ease: "power4.out",
        },
        "-=0.5"
      );
    }

    tl.to(subtitle, { opacity: 0.85, y: 0, duration: 0.9 }, "-=0.6").to(
      scroll,
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.4"
    );

    gsap.to(".hero__title", {
      backgroundPosition: "200% center",
      duration: 4,
      repeat: -1,
      ease: "none",
    });
  }, rootRef);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <header id="hero" ref="rootRef" class="hero">
    <div class="hero__panels" aria-hidden="true">
      <div v-for="(panel, i) in heroPanels" :key="i" class="hero__panel">
        <div
          class="hero__panel-inner"
          :style="{ backgroundImage: `url('${panel.image}')` }"
        />
        <div class="hero__panel-overlay" />
        <span class="hero__panel-num">{{ panel.num }}</span>
      </div>
    </div>

    <div class="hero__content">
      <p class="hero__epoch">Paris · 1925 · Exposition Internationale</p>
      <h1 ref="titleRef" class="hero__title shimmer-text">FORMË</h1>
      <p class="hero__subtitle">
        Выставка о форме как психологическом договоре между человеком и машиной.
        Живопись. Ар-деко. Противоречие как метод.
      </p>
      <a href="#primal" class="hero__scroll" aria-label="Войти в выставку">
        <span>Войти</span>
        <span class="hero__scroll-line" aria-hidden="true" />
      </a>
    </div>
  </header>
</template>
