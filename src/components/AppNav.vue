<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { navLinks } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navRef = ref(null);
const activeId = ref("hero");
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      start: 80,
      onUpdate: (self) => {
        navRef.value?.classList.toggle("nav--scrolled", self.scroll() > 80);
      },
    });

    navLinks.forEach((link) => {
      ScrollTrigger.create({
        trigger: `#${link.id}`,
        start: "top 40%",
        end: "bottom 60%",
        onToggle: (self) => {
          if (self.isActive) activeId.value = link.id;
        },
      });
    });
  });
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <nav ref="navRef" class="nav" aria-label="Навигация по залам">
    <a href="#hero" class="nav__brand">FORMË</a>
    <ul class="nav__halls">
      <li v-for="link in navLinks" :key="link.id">
        <a
          :href="`#${link.id}`"
          :class="{ 'is-active': activeId === link.id }"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>
    <a href="#epilogue" class="nav__ticket">Билет</a>
  </nav>
</template>
