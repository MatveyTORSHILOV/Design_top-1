import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function splitWords(el) {
  if (!el) return [];
  const text = el.textContent.trim();
  el.innerHTML = "";
  const words = [];

  text.split(/(\s+)/).forEach((part) => {
    if (/^\s+$/.test(part)) {
      el.appendChild(document.createTextNode(part));
      return;
    }
    const wrap = document.createElement("span");
    wrap.className = "kinetic-word";
    wrap.style.display = "inline-block";
    wrap.style.whiteSpace = "pre";
    [...part].forEach((char) => {
      const span = document.createElement("span");
      span.className = "kinetic-char";
      span.textContent = char;
      span.style.display = "inline-block";
      wrap.appendChild(span);
      words.push(span);
    });
    el.appendChild(wrap);
  });

  return words;
}

export function initRevealBlocks(root, selector = ".reveal-block") {
  if (!root) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elements = root.querySelectorAll(selector);

  if (reduced) {
    elements.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return () => {};
  }

  const triggers = [];

  elements.forEach((el) => {
    gsap.set(el, { opacity: 0, y: 48 });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        end: "bottom 12%",
        toggleActions: "play reverse play reverse",
      },
    });

    triggers.push(tween.scrollTrigger);
  });

  return () => {
    triggers.forEach((t) => t?.kill());
  };
}
