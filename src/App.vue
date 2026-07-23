<script setup>
import { ref } from "vue";
import AppNav from "./components/AppNav.vue";
import HeroExhibition from "./components/HeroExhibition.vue";
import PrimalOrigin from "./components/PrimalOrigin.vue";
import PrologueSection from "./components/PrologueSection.vue";
import TensionsSection from "./components/TensionsSection.vue";
import SkyscraperAscent from "./components/SkyscraperAscent.vue";
import GallerySalon from "./components/GallerySalon.vue";
import MaterialsPalette from "./components/MaterialsPalette.vue";
import EpochTimeline from "./components/EpochTimeline.vue";
import EpilogueHall from "./components/EpilogueHall.vue";
import FloatingPhrases from "./components/FloatingPhrases.vue";
import LightboxModal from "./components/LightboxModal.vue";

const lightboxItem = ref(null);

function openLightbox(item) {
  lightboxItem.value = item;
}

function closeLightbox() {
  lightboxItem.value = null;
}
</script>

<template>
  <AppNav />
  <FloatingPhrases />
  <HeroExhibition />
  <main>
    <PrimalOrigin />
    <PrologueSection />
    <TensionsSection />
    <SkyscraperAscent />
    <GallerySalon @open="openLightbox" />
    <MaterialsPalette />
    <EpochTimeline />
    <EpilogueHall />
  </main>
  <footer class="footer">
    <p>FORMË · Выставка ар-деко · 40 000 до н.э. — 2026 · Все формы несут смысл</p>
  </footer>
  <LightboxModal :item="lightboxItem" @close="closeLightbox" />
</template>
