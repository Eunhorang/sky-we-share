const galleryGrid = document.querySelector("#gallery-grid");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxAlt = document.querySelector("#lightbox-alt");
const lightboxCounter = document.querySelector("#lightbox-counter");
const closeButton = document.querySelector(".close-button");
const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");

let artworks = [];
let currentIndex = 0;
let lastTrigger = null;

function updateCounts(count) {
  ["artwork-count", "hero-count", "nav-count"].forEach((id) => {
    const node = document.getElementById(id);
    if (node) node.textContent = String(count);
  });
}

function createGalleryCard(artwork, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "gallery-card";
  button.setAttribute("aria-label", `${artwork.alt} 크게 보기`);
  button.dataset.index = String(index);

  const image = document.createElement("img");
  image.src = artwork.src;
  image.alt = artwork.alt;
  if (artwork.width && artwork.height) {
    image.width = artwork.width;
    image.height = artwork.height;
  }
  image.loading = index < 5 ? "eager" : "lazy";
  image.decoding = "async";

  button.append(image);
  button.addEventListener("click", () => openLightbox(index, button));
  return button;
}

function renderGallery() {
  const fragment = document.createDocumentFragment();
  artworks.forEach((artwork, index) => fragment.append(createGalleryCard(artwork, index)));
  galleryGrid.replaceChildren(fragment);
  galleryGrid.setAttribute("aria-busy", "false");
  updateCounts(artworks.length);
}

function showArtwork(index) {
  if (!artworks.length) return;
  currentIndex = (index + artworks.length) % artworks.length;
  const artwork = artworks[currentIndex];
  lightboxImage.src = artwork.src;
  lightboxImage.alt = artwork.alt;
  lightboxAlt.textContent = artwork.alt;
  lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(artworks.length).padStart(2, "0")}`;
}

function openLightbox(index, trigger) {
  lastTrigger = trigger;
  showArtwork(index);
  lightbox.showModal();
  closeButton.focus();
}

function closeLightbox() {
  lightbox.close();
}

closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", () => showArtwork(currentIndex - 1));
nextButton.addEventListener("click", () => showArtwork(currentIndex + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightbox.addEventListener("close", () => {
  if (lastTrigger) lastTrigger.focus();
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showArtwork(currentIndex - 1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    showArtwork(currentIndex + 1);
  }
});

fetch("gallery.json")
  .then((response) => {
    if (!response.ok) throw new Error(`Gallery manifest request failed: ${response.status}`);
    return response.json();
  })
  .then((data) => {
    artworks = data;
    renderGallery();
  })
  .catch((error) => {
    console.error(error);
    galleryGrid.setAttribute("aria-busy", "false");
    const message = document.createElement("p");
    message.className = "load-message";
    message.textContent = "그림을 불러오지 못했습니다. 잠시 뒤 다시 시도해 주세요.";
    galleryGrid.replaceChildren(message);
  });
