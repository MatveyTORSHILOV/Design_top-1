<script setup>
import { marqueeText } from "../data/content.js";

const repeated = marqueeText.repeat(8);
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <span class="marquee__text">{{ repeated }}</span>
      <span class="marquee__text">{{ repeated }}</span>
    </div>
  </div>
</template>
