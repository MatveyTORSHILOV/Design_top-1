<script setup>
import { primal } from "../data/content.js";
</script>

<template>
  <section id="exposition" class="section">
    <div class="section__inner reveal-block">
      <p class="section-tag">{{ primal.label }}</p>
      <div class="primal-grid">
        <div class="primal-cave" aria-hidden="true">
          <svg viewBox="0 0 400 280">
            <rect width="400" height="280" fill="#ebe4d6" />
            <path class="cave-draw" d="M60 200 Q120 160 180 150 T300 140" fill="none" stroke="#8b6914" stroke-width="2" />
            <path class="cave-draw" d="M80 210 L140 175 L200 160" fill="none" stroke="#a8841a" stroke-width="3" />
            <ellipse class="cave-draw" cx="200" cy="175" rx="55" ry="35" fill="none" stroke="#6b1c2a" stroke-width="2" />
            <path class="cave-draw" d="M155 175 L165 120 M245 175 L235 120" fill="none" stroke="#a8841a" stroke-width="2" />
          </svg>
        </div>
        <div>
          <h2 class="section__title">{{ primal.title }}</h2>
          <p class="section__lead">{{ primal.lead }}</p>
          <p style="margin-top:1.5rem;font-size:0.875rem;color:var(--color-muted);line-height:1.8">{{ primal.body }}</p>
          <p class="primal-accent">{{ primal.accent }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
