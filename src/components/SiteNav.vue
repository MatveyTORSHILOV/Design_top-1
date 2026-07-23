<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { navLinks } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const activeId = ref("");
const navRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    navLinks.forEach((link) => {
      ScrollTrigger.create({
        trigger: `#${link.id}`,
        start: "top 45%",
        end: "bottom 55%",
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
  <header ref="navRef" class="nav">
    <div class="nav__left">
      <ul class="nav__links">
        <li v-for="link in navLinks" :key="link.id">
          <a
            :href="`#${link.id}`"
            :class="{ 'is-active': activeId === link.id }"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
      <p class="nav__meta">Выставка в Париже /</p>
    </div>
    <a href="#hero" class="nav__brand">FORMË</a>
    <div class="nav__right">
      <p>Ар-деко</p>
      <a href="mailto:exposition@forme.art" class="nav__email">exposition@forme.art</a>
    </div>
  </header>
</template>
