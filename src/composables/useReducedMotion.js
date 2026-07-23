import { ref, onMounted, onUnmounted } from "vue";

export function useReducedMotion() {
  const reduced = ref(false);
  let media;

  onMounted(() => {
    media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.value = media.matches;
    media.addEventListener("change", onChange);
  });

  onUnmounted(() => {
    media?.removeEventListener("change", onChange);
  });

  function onChange(e) {
    reduced.value = e.matches;
  }

  return { reduced };
}
