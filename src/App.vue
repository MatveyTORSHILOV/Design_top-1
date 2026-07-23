<script setup>
import { ref } from "vue";
import PageLoader from "./components/PageLoader.vue";
import SiteNav from "./components/SiteNav.vue";
import HeroEditorial from "./components/HeroEditorial.vue";
import ManifestoBlock from "./components/ManifestoBlock.vue";
import PrimalOrigin from "./components/PrimalOrigin.vue";
import PerspectiveSection from "./components/PerspectiveSection.vue";
import WorksSalon from "./components/WorksSalon.vue";
import TensionsEditorial from "./components/TensionsEditorial.vue";
import SkyscraperAscent from "./components/SkyscraperAscent.vue";
import StudioSection from "./components/StudioSection.vue";
import MarqueeBand from "./components/MarqueeBand.vue";
import SiteFooter from "./components/SiteFooter.vue";
import LightboxModal from "./components/LightboxModal.vue";

const loaded = ref(false);
const lightboxItem = ref(null);

function onLoaded() {
  loaded.value = true;
}

function openLightbox(item) {
  lightboxItem.value = item;
}

function closeLightbox() {
  lightboxItem.value = null;
}
</script>

<template>
  <PageLoader v-if="!loaded" @done="onLoaded" />
  <div class="page" :style="{ visibility: loaded ? 'visible' : 'hidden' }">
    <SiteNav />
    <HeroEditorial />
    <ManifestoBlock />
    <PrimalOrigin />
    <PerspectiveSection />
    <WorksSalon @open="openLightbox" />
    <TensionsEditorial />
    <SkyscraperAscent />
    <MarqueeBand />
    <StudioSection />
    <MarqueeBand />
    <SiteFooter />
    <LightboxModal :item="lightboxItem" @close="closeLightbox" />
  </div>
</template>
