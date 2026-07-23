<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { galleryItems } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const emit = defineEmits(["open"]);

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.utils.toArray(".gallery__item").forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        scale: 0.92,
        y: 60,
        duration: 1,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      const img = item.querySelector("img");
      if (img) {
        gsap.to(img, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });
  }, sectionRef);
});

onUnmounted(() => ctx?.revert());

function open(item) {
  emit("open", item);
}
</script>

<template>
  <section id="gallery" ref="sectionRef" class="section gallery">
    <div class="section__inner">
      <div class="section__label">
        <span class="deco-diamond" aria-hidden="true" />
        <span>Зал VI · Салон живописи</span>
        <span class="deco-line" style="flex: 1" />
      </div>

      <div class="gallery__intro">
        <h2 class="section__title">Работы мастера</h2>
        <p class="section__lead">
          Полотна — не репродукции эпохи, а её продолжение. Каждая работа — экспозиция
          одного из напряжений зала.
        </p>
      </div>

      <div class="gallery__grid">
        <figure
          v-for="item in galleryItems"
          :key="item.src"
          class="gallery__item"
          :class="item.class"
          role="button"
          tabindex="0"
          @click="open(item)"
          @keydown.enter="open(item)"
        >
          <img :src="item.src" :alt="item.alt" loading="lazy" />
          <figcaption class="gallery__item-info">
            <p class="gallery__item-title">{{ item.title }}</p>
            <p class="gallery__item-desc">{{ item.desc }}</p>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery__intro {
  margin-bottom: var(--space-2xl);
}
</style>
