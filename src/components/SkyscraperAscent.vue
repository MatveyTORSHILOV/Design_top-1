<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TowerScene = defineAsyncComponent(() => import("./three/TowerScene.vue"));

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const phraseRef = ref(null);
const progress = ref(0);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: "top top",
      end: "+=160%",
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        progress.value = self.progress;
      },
    });

    if (phraseRef.value) {
      gsap.fromTo(
        phraseRef.value,
        { opacity: 0, y: 50, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: sectionRef.value,
            start: "top 50%",
            end: "top 25%",
            scrub: 1,
          },
        }
      );
      gsap.to(phraseRef.value, {
        opacity: 0,
        y: -30,
        filter: "blur(4px)",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "55% top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, sectionRef);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="ascent" ref="sectionRef" class="ascent">
    <p ref="phraseRef" class="ascent__phrase">Вертикаль — молитва машинного века</p>
    <div class="ascent__canvas-wrap">
      <TowerScene :progress="progress" />
    </div>
  </section>
</template>
