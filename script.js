if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const toTop = () => scrollTo(0, 0);
addEventListener("load", toTop);
addEventListener("pageshow", toTop);

let n = 0, v = 0, last = 0, raf = 0, stop0 = 0, stopv = 0, go = 0;

const g = (id) => document.getElementById(id);
const L = g("l");
const S = g("s");

const add = (k = 16) => {
  const f = document.createDocumentFragment();
  for (let i = 0; i < k; i++) {
    const d = document.createElement("div");
    d.className = "i";
    d.textContent = String(++n);
    f.appendChild(d);
  }
  L.appendChild(f);
};

add();

new IntersectionObserver(
  (e) => e[0].isIntersecting && add(),
  { rootMargin: "900px 0px" }
).observe(S);

const vMax = 4000;
const a = 240;
const stopMs = 1400;
const eo = (t) => 1 - (1 - t) * (1 - t);

const frame = (t) => {
  if (!last) last = t;
  const dt = Math.min(0.05, (t - last) / 1000);
  last = t;

  if (go > 0) {
    v = Math.min(vMax, v + a * dt);
  } else if (go < 0) {
    if (!stop0) { stop0 = t; stopv = v; }
    const p = Math.min(1, (t - stop0) / stopMs);
    v = stopv * (1 - eo(p));
    if (p >= 1) { v = go = 0; raf = last = stop0 = 0; return; }
  }

  if (v) scrollBy(0, v * dt);
  raf = requestAnimationFrame(frame);
};

g("a").onclick = () => {
  go = 1;
  stop0 = 0;
  if (!raf) requestAnimationFrame(frame);
};

g("b").onclick = () => {
  if (!go) return;
  go = -1;
  stop0 = 0;
  if (!raf) requestAnimationFrame(frame);
};;
