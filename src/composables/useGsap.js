import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapContext(scope, setup) {
  let ctx;

  onMounted(() => {
    ctx = gsap.context(setup, scope);
  });

  onUnmounted(() => {
    ctx?.revert();
  });

  return { gsap, ScrollTrigger };
}

export function splitChars(el) {
  if (!el) return [];
  const text = el.textContent;
  el.textContent = "";
  return [...text].map((char) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    el.appendChild(span);
    return span;
  });
}
