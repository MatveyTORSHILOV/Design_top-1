<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars } from "../composables/useGsap.js";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const titleRef = ref(null);
const caveRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const paths = caveRef.value?.querySelectorAll(".cave-draw");
    const hand = caveRef.value?.querySelector(".cave-hand");

    if (paths?.length) {
      paths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.9 });
      });

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 2.5,
        stagger: 0.4,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top 55%",
          end: "center center",
          scrub: 1.5,
        },
      });
    }

    if (hand) {
      gsap.fromTo(
        hand,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        {
          scale: 1,
          opacity: 0.7,
          scrollTrigger: {
            trigger: sectionRef.value,
            start: "top 40%",
            end: "center 30%",
            scrub: 1,
          },
        }
      );
    }

    if (titleRef.value) {
      const chars = splitChars(titleRef.value);
      gsap.from(chars, {
        opacity: 0,
        y: 40,
        rotateY: 90,
        stagger: 0.03,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }

    gsap.from(".primal__verse", {
      opacity: 0,
      y: 30,
      duration: 1.2,
      stagger: 0.3,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
    });
  }, sectionRef);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="primal" ref="sectionRef" class="section primal">
    <div class="primal__glow" aria-hidden="true" />
    <div class="section__inner primal__inner">
      <div class="section__label">
        <span class="deco-diamond" aria-hidden="true" />
        <span>Зал −∞ · Исток</span>
        <span class="deco-line" style="flex: 1" />
      </div>

      <div class="primal__grid">
        <div ref="caveRef" class="primal__cave" aria-hidden="true">
          <svg viewBox="0 0 400 280" class="primal__svg">
            <rect width="400" height="280" fill="#1a1410" rx="4" />
            <path
              class="cave-draw"
              d="M60 200 Q90 160 120 180 T180 150 T240 170 T300 140 T360 160"
              fill="none"
              stroke="#8b6914"
              stroke-width="2"
            />
            <path
              class="cave-draw"
              d="M80 210 L100 190 L120 200 L140 175 L160 185 L180 160 L200 170"
              fill="none"
              stroke="#c9a227"
              stroke-width="3"
            />
            <ellipse class="cave-draw" cx="200" cy="175" rx="55" ry="35" fill="none" stroke="#b87333" stroke-width="2.5" />
            <path
              class="cave-draw"
              d="M145 175 L155 120 M255 175 L245 120 M200 140 L200 100"
              fill="none"
              stroke="#c9a227"
              stroke-width="2"
            />
            <circle class="cave-hand" cx="320" cy="220" r="18" fill="#6b1c2a" opacity="0.6" />
            <path
              class="cave-draw"
              d="M40 240 Q200 250 360 235"
              fill="none"
              stroke="#3a3028"
              stroke-width="1"
            />
          </svg>
        </div>

        <div class="primal__text">
          <h2 ref="titleRef" class="section__title">До слова было пятно</h2>
          <p class="section__lead primal__verse">
            Сорок тысяч лет назад рука коснулась стены. Не для красоты — чтобы
            <em>удержать</em> мамонта, страх, ночь. Первый художник не рисовал —
            он <em>заклинал</em> формой.
          </p>
          <p class="primal__verse">
            Ар-деко — не противоположность пещере. Это тот же жест через эпохи:
            человек оставляет след, чтобы сказать — <em>я был, я чувствовал, я формировал
            реальность</em>. Каждый заказчик, приходящий с болью и историей, несёт в себе
            эту древнюю искру.
          </p>
          <p class="primal__verse primal__verse--accent">
            Дизайн = глубина. Суть. Смысл. Место. У каждого действия — результат.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.primal {
  position: relative;
  background: radial-gradient(ellipse 70% 50% at 30% 50%, #1b1208 0%, #08080a 70%);
  overflow: hidden;
}

.primal__glow {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 20%;
  left: 10%;
  background: radial-gradient(circle, rgba(201, 162, 39, 0.08) 0%, transparent 70%);
  pointer-events: none;
  animation: primal-flicker 6s ease-in-out infinite;
}

@keyframes primal-flicker {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.primal__grid {
  display: grid;
  gap: var(--space-2xl);
  align-items: center;
}

@media (min-width: 900px) {
  .primal__grid {
    grid-template-columns: 1fr 1.2fr;
  }
}

.primal__cave {
  border: 1px solid var(--color-border);
  padding: var(--space-md);
  background: rgba(15, 12, 10, 0.8);
}

.primal__svg {
  width: 100%;
  height: auto;
  display: block;
}

.primal__verse {
  margin-top: var(--space-md);
  color: var(--color-cream);
  opacity: 0.9;
}

.primal__verse em {
  color: var(--color-gold);
  font-style: italic;
}

.primal__verse--accent {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold);
  border-left: 2px solid var(--color-gold);
  padding-left: var(--space-md);
  margin-top: var(--space-xl);
}
</style>
