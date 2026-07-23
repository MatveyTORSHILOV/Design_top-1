<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { heroPanels } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars } from "../composables/useGsap.js";

gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
const statementRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".hero__bg-panel", {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 1.4,
      stagger: 0.1,
      ease: "power3.inOut",
    });

    if (statementRef.value) {
      const chars = splitChars(statementRef.value);
      gsap.from(chars, {
        y: 80,
        opacity: 0,
        rotateX: -40,
        stagger: 0.025,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.6,
      });
    }

    gsap.from([".hero__counter", ".hero__sub", ".hero__scroll"], {
      opacity: 0,
      y: 24,
      stagger: 0.15,
      duration: 0.9,
      delay: 1.2,
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
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="hero" ref="root" class="hero">
    <div class="hero__bg" aria-hidden="true">
      <div
        v-for="(panel, i) in heroPanels"
        :key="i"
        class="hero__bg-panel"
        :style="{ backgroundImage: `url('${panel.image}')` }"
      />
    </div>
    <div class="hero__inner">
      <p class="hero__counter">1925</p>
      <h1 ref="statementRef" class="hero__statement">
        Не стиль, а <em>перспектива</em>.
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
