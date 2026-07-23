<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { works, salonIntro } from "../data/content.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const emit = defineEmits(["open"]);

gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
const preview = ref(null);
const previewImg = ref("");
let ctx;

function onMove(e) {
  if (!preview.value) return;
  preview.value.style.left = `${e.clientX + 20}px`;
  preview.value.style.top = `${e.clientY - 120}px`;
}

function onEnter(item) {
  previewImg.value = item.image;
  preview.value?.classList.add("is-visible");
}

function onLeave() {
  preview.value?.classList.remove("is-visible");
}

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".vertical-title span", {
      y: "100%",
      duration: 0.8,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: root.value, start: "top 75%", toggleActions: "play none none reverse" },
    });

    gsap.utils.toArray(".work-row").forEach((row, i) => {
      gsap.from(row, {
        opacity: 0,
        x: -30,
        duration: 0.7,
        delay: i * 0.08,
        scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none reverse" },
      });
    });
  }, root);

  window.addEventListener("mousemove", onMove);
});

onUnmounted(() => {
  ctx?.revert();
  window.removeEventListener("mousemove", onMove);
});
</script>

<template>
  <section id="salon" ref="root" class="section">
    <div class="section__inner">
      <div class="works-header">
        <div class="vertical-title" aria-label="salon">
          <span v-for="(ch, i) in salonIntro.vertical" :key="i">{{ ch }}</span>
        </div>
        <div class="works-headlines">
          <h2>{{ salonIntro.titleA }}</h2>
          <h2>{{ salonIntro.titleB }}</h2>
        </div>
      </div>

      <div class="works-list">
        <article
          v-for="work in works"
          :key="work.num"
          class="work-row"
          @mouseenter="onEnter(work)"
          @mouseleave="onLeave"
          @click="emit('open', work)"
          @keydown.enter="emit('open', work)"
          tabindex="0"
          role="button"
        >
          <span class="work-row__num">{{ work.num }}</span>
          <h3 class="work-row__title">{{ work.title }}</h3>
          <p class="work-row__tagline">{{ work.tagline }}</p>
          <span class="work-row__explore">explore</span>
        </article>
      </div>

      <p style="margin-top:2rem;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-muted)">
        ( {{ works.length.toString().padStart(2, '0') }} ) · view all
      </p>
    </div>

    <div ref="preview" class="work-preview" aria-hidden="true">
      <img v-if="previewImg" :src="previewImg" alt="" />
    </div>
  </section>
</template>
