<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const props = defineProps({
  item: { type: Object, default: null },
});

const emit = defineEmits(["close"]);
const overlayRef = ref(null);

watch(
  () => props.item,
  (item) => {
    if (!item || !overlayRef.value) return;
    gsap.fromTo(
      overlayRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }
);

function close() {
  if (overlayRef.value) {
    gsap.to(overlayRef.value, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => emit("close"),
    });
  } else {
    emit("close");
  }
}

function onKey(e) {
  if (e.key === "Escape" && props.item) close();
}

onMounted(() => document.addEventListener("keydown", onKey));
onUnmounted(() => document.removeEventListener("keydown", onKey));
</script>

<template>
  <div
    v-if="item"
    ref="overlayRef"
    class="lightbox is-open"
    role="dialog"
    aria-modal="true"
    aria-label="Просмотр работы"
    @click.self="close"
  >
    <button class="lightbox__close" type="button" @click="close">Закрыть</button>
    <div class="lightbox__content">
      <img :src="item.src" :alt="item.alt" />
      <p class="lightbox__caption">{{ item.caption }}</p>
    </div>
  </div>
</template>
