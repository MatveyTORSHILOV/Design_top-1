<script setup>
import { shallowRef, computed } from "vue";
import { useLoop } from "@tresjs/core";

const props = defineProps({
  progress: { type: Number, default: 0 },
});

const groupRef = shallowRef(null);

const tiers = [
  { w: 3.2, h: 1.4, d: 3.2, y: 0, color: "#1a1a1e", metal: 0.4, rough: 0.6 },
  { w: 2.6, h: 1.6, d: 2.6, y: 1.5, color: "#252528", metal: 0.45, rough: 0.55 },
  { w: 2.0, h: 1.8, d: 2.0, y: 3.2, color: "#2e2e32", metal: 0.5, rough: 0.5 },
  { w: 1.5, h: 2.0, d: 1.5, y: 5.1, color: "#3a3530", metal: 0.7, rough: 0.3 },
  { w: 1.0, h: 1.2, d: 1.0, y: 7.2, color: "#c9a227", metal: 0.85, rough: 0.15 },
];

const windows = computed(() =>
  Array.from({ length: 24 }, (_, n) => {
    const floor = Math.floor(n / 6);
    const col = n % 6;
    return {
      id: n,
      pos: [(col - 2.5) * 0.45, 0.3 + floor * 1.5, 1.65 - floor * 0.15],
      lit: n % 3 === 0,
    };
  })
);

const { onBeforeRender } = useLoop();

onBeforeRender(() => {
  if (!groupRef.value) return;
  const targetY = -14 + props.progress * 20;
  groupRef.value.position.y += (targetY - groupRef.value.position.y) * 0.08;
  groupRef.value.rotation.y += 0.002;
});
</script>

<template>
  <TresGroup ref="groupRef" :position="[0, -14, 0]" :scale="[0.85 + progress * 0.25, 0.85 + progress * 0.25, 0.85 + progress * 0.25]">
    <TresMesh v-for="(tier, i) in tiers" :key="'tier-' + i" :position="[0, tier.y, 0]">
      <TresBoxGeometry :args="[tier.w, tier.h, tier.d]" />
      <TresMeshStandardMaterial
        :color="tier.color"
        :metalness="tier.metal"
        :roughness="tier.rough"
        :emissive="i >= 4 ? '#c9a227' : '#000000'"
        :emissive-intensity="i >= 4 ? 0.35 : 0"
      />
    </TresMesh>

    <TresMesh v-for="win in windows" :key="'win-' + win.id" :position="win.pos">
      <TresPlaneGeometry :args="[0.12, 0.2]" />
      <TresMeshBasicMaterial
        :color="win.lit ? '#e4c76b' : '#1a1510'"
        :transparent="true"
        :opacity="win.lit ? 0.95 : 0.25"
      />
    </TresMesh>

    <TresMesh :position="[0, 8.6, 0]">
      <TresConeGeometry :args="[0.35, 1.8, 4]" />
      <TresMeshStandardMaterial color="#c9a227" :metalness="0.9" :roughness="0.1" />
    </TresMesh>
  </TresGroup>
</template>
