<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const emit = defineEmits(["done"]);
const count = ref(0);
const root = ref(null);

onMounted(() => {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: 1925,
    duration: 2.2,
    ease: "power2.inOut",
    onUpdate: () => {
      count.value = Math.floor(obj.val);
    },
    onComplete: () => {
      gsap.to(root.value, {
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        onComplete: () => emit("done"),
      });
    },
  });
});
</script>

<template>
  <div ref="root" class="loader">
    <span class="loader__num">{{ count.toString().padStart(4, "0") }}</span>
  </div>
</template>
