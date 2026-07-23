<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { works, salonIntro } from "../data/content.js";

const emit = defineEmits(["open"]);

const preview = ref(null);
const previewImg = ref("");

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

onMounted(() => window.addEventListener("mousemove", onMove));
onUnmounted(() => window.removeEventListener("mousemove", onMove));
</script>

<template>
  <section id="salon" class="section">
    <div class="section__inner">
      <div class="works-header reveal-block">
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
          class="work-row reveal-block"
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

      <p class="reveal-block" style="margin-top:2rem;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-muted)">
        ( {{ works.length.toString().padStart(2, '0') }} ) · view all
      </p>
    </div>

    <div ref="preview" class="work-preview" aria-hidden="true">
      <img v-if="previewImg" :src="previewImg" alt="" />
    </div>
  </section>
</template>
