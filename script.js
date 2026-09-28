const grid = document.getElementById("grid");
const sheet = document.getElementById("sheet");
const items = PRODUCTS.filter(p => p.category === grid.dataset.category);

// Фото товара: либо image: "img/a.webp", либо images: ["img/a.webp", "img/b.webp"]
const photos = p => p.images && p.images.length ? p.images : (p.image ? [p.image] : []);

function img(src, alt) {
  const i = document.createElement("img"); i.src = src; i.alt = alt; return i;
}
function placeholder() {
  const d = document.createElement("div"); d.className = "ph"; return d;
}

if (!items.length) grid.innerHTML = '<p class="empty">Скоро</p>';

items.forEach(p => {
  const b = document.createElement("button");
  b.className = "card";
  const w = document.createElement("div"); w.className = "pic";
  const list = photos(p);
  w.append(list.length ? img(list[0], p.name) : placeholder());
  const s = document.createElement("span"); s.textContent = p.name;
  b.append(w, s);
  b.onclick = () => open(p);
  grid.append(b);
});

function open(p) {
  const list = photos(p);
  const box = document.getElementById("s-pic");
  box.replaceChildren();
  if (!list.length) {
    box.append(placeholder());
  } else {
    const slider = document.createElement("div"); slider.className = "slider";
    list.forEach(src => {
      const sl = document.createElement("div"); sl.className = "slide";
      sl.append(img(src, p.name)); slider.append(sl);
    });
    box.append(slider);
    if (list.length > 1) {
      const dots = document.createElement("div"); dots.className = "dots";
      list.forEach(() => dots.append(document.createElement("i")));
      box.append(dots);
      const mark = () => {
        const n = Math.round(slider.scrollLeft / slider.clientWidth);
        [...dots.children].forEach((d, k) => d.classList.toggle("on", k === n));
      };
      slider.addEventListener("scroll", mark);
      slider.onclick = () => {
        const n = Math.round(slider.scrollLeft / slider.clientWidth);
        slider.scrollTo({ left: ((n + 1) % list.length) * slider.clientWidth, behavior: "smooth" });
      };
      mark();
    }
  }
  document.getElementById("s-price").textContent = p.price;
  document.getElementById("s-name").textContent = p.name;
  document.getElementById("s-desc").textContent = p.description;
  sheet.hidden = false;
}

document.getElementById("close").onclick = () => sheet.hidden = true;
document.addEventListener("keydown", e => { if (e.key === "Escape") sheet.hidden = true; });
