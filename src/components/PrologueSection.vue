<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".prologue .section__title", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: { trigger: sectionRef.value, start: "top 70%", toggleActions: "play none none reverse" },
    });

    gsap.from(".prologue__quote", {
      opacity: 0,
      x: 60,
      rotateY: -15,
      duration: 1.2,
      scrollTrigger: { trigger: sectionRef.value, start: "top 60%", toggleActions: "play none none reverse" },
    });

    gsap.utils.toArray(".prologue__body p").forEach((p, i) => {
      gsap.from(p, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: i * 0.15,
        scrollTrigger: { trigger: p, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
  }, sectionRef);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="prologue" ref="sectionRef" class="section prologue">
    <div class="sunburst" style="top: 10%; right: 5%" />
    <div class="section__inner">
      <div class="section__label">
        <span class="deco-diamond" aria-hidden="true" />
        <span>Зал 00 · Пролог</span>
        <span class="deco-line" style="flex: 1" />
      </div>

      <div class="prologue__grid">
        <div>
          <h2 class="section__title">Форма — не украшение.<br />Форма — аргумент.</h2>
          <div class="prologue__body">
            <p class="section__lead">
              Этот салон создан для художника, который пишет в духе ар-деко не как
              стилизацию, а как <em>способ удержать мир после катастрофы</em>.
            </p>
            <p>
              Ар-деко родился не из декоративного каприза. Он — ответ нервной системы
              целого поколения. Красота здесь — терапия. Геометрия — попытка упорядочить
              хаос внутри.
            </p>
            <p>
              Сайт-выставка разбирает психологию стиля: что мы прячем за золотом, за
              ступенями, за египетским лотосом и хромированной дугой.
            </p>
          </div>
        </div>

        <blockquote class="prologue__quote">
          <p>
            «Дизайн не должен быть красивым, дизайн должен быть функциональным» —
            это ложь для тех, кто боится формы. Ар-деко доказал: декоративность может
            быть несущей конструкцией смысла.
          </p>
          <cite>Манифест зала · O.VERA.VERBER</cite>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prologue__body em {
  color: var(--color-gold);
  font-style: normal;
}
</style>
