<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".epilogue__ornament", {
      scaleX: 0,
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".epilogue__title", {
      opacity: 0,
      letterSpacing: "0.6em",
      duration: 1.5,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  }, sectionRef);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="epilogue" ref="sectionRef" class="section epilogue">
    <div class="section__inner">
      <div class="epilogue__ornament">
        <span class="deco-line" style="width: 80px" />
        <span class="deco-diamond" aria-hidden="true" />
        <span class="deco-line" style="width: 80px" />
      </div>
      <h2 class="epilogue__title">Выход из зала</h2>
      <p class="epilogue__text">
        Выставка не завершается на последнем полотне. Ар-деко — способ смотреть на
        противоречие и не отводить глаз. Запишитесь на частный просмотр работ художника.
      </p>
      <a href="mailto:exposition@forme.art" class="epilogue__contact">
        Запросить просмотр
      </a>
    </div>
  </section>
</template>
