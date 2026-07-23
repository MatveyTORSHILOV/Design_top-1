<script setup>
import { shallowRef } from "vue";
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import ArtDecoTower from "./ArtDecoTower.vue";

defineProps({
  progress: { type: Number, default: 0 },
});

const towerRef = shallowRef(null);
</script>

<template>
  <TresCanvas
    clear-color="#08080a"
    :alpha="true"
    :antialias="true"
    class="tower-canvas"
  >
    <TresPerspectiveCamera :position="[0, 2, 14]" :fov="42" />
    <OrbitControls
      :enable-zoom="false"
      :enable-pan="false"
      :enable-rotate="false"
      :auto-rotate="false"
    />
    <TresAmbientLight :intensity="0.25" />
    <TresDirectionalLight :position="[5, 12, 8]" :intensity="1.2" color="#e4c76b" />
    <TresDirectionalLight :position="[-6, 4, -4]" :intensity="0.4" color="#6b1c2a" />
    <TresPointLight :position="[0, -4, 2]" :intensity="0.6" color="#c9a227" />

    <ArtDecoTower ref="towerRef" :progress="progress" />
  </TresCanvas>
</template>

<style scoped>
.tower-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
