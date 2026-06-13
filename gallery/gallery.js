const galleryImages = [
  { src: "../assets/reviews/travel1.jpeg", alt: "Travel Photo 1", layout: "tall" },
  { src: "../assets/reviews/travel2.jpeg", alt: "Travel Photo 2" },
  { src: "../assets/reviews/travel3.jpeg", alt: "Travel Photo 3", layout: "wide" },
  { src: "../assets/reviews/travel4.jpeg", alt: "Travel Photo 4" },
  { src: "../assets/reviews/travel5.jpeg", alt: "Travel Photo 5" },
  { src: "../assets/reviews/travel6.jpeg", alt: "Travel Photo 6", layout: "tall" },
  { src: "../assets/reviews/travel7.jpeg", alt: "Travel Photo 7" },
  { src: "../assets/reviews/travel8.jpeg", alt: "Travel Photo 8" },
  { src: "../assets/reviews/travel9.jpeg", alt: "Travel Photo 9", layout: "wide" },
  { src: "../assets/reviews/travel10.jpeg", alt: "Travel Photo 10" },
  { src: "../assets/reviews/travel11.jpeg", alt: "Travel Photo 11" },
  { src: "../assets/reviews/travel12.jpeg", alt: "Travel Photo 12" },
  { src: "../assets/reviews/travel13.jpeg", alt: "Travel Photo 13", layout: "tall" },
  { src: "../assets/reviews/travel14.jpeg", alt: "Travel Photo 14" },
  { src: "../assets/reviews/travel15.jpeg", alt: "Travel Photo 15", layout: "wide" },
  { src: "../assets/reviews/travel16.jpeg", alt: "Travel Photo 16" },
  { src: "../assets/packages/kedarkantha_trek.webp", alt: "Kedarkantha Trek" },
  { src: "../assets/packages/chopta_chandrashila_trek.webp", alt: "Chopta Chandrashila Trek" },
  { src: "../assets/packages/dayara_bugyal.webp", alt: "Dayara Bugyal", layout: "wide" },
  { src: "../assets/packages/kuari_pass.webp", alt: "Kuari Pass" },
  { src: "../assets/packages/triund_trek.webp", alt: "Triund Trek" },
  { src: "../assets/packages/winter_spiti.webp", alt: "Winter Spiti" }
];

const reviewImages = [
  { src: "../assets/reviews/r1.jpeg", alt: "Review 1" },
  { src: "../assets/reviews/r2.jpeg", alt: "Review 2" },
  { src: "../assets/reviews/r3.jpeg", alt: "Review 3" },
  { src: "../assets/reviews/r4.jpeg", alt: "Review 4" },
  { src: "../assets/reviews/r5.jpeg", alt: "Review 5" },
  { src: "../assets/reviews/r6.jpeg", alt: "Review 6" },
  { src: "../assets/reviews/r7.jpeg", alt: "Review 7" },
  { src: "../assets/reviews/r8.jpeg", alt: "Review 8" }
];

function createGalleryCard(image, overlayText, extraClass = "") {
  const link = document.createElement("a");
  const layoutClass = image.layout ? ` ${image.layout}` : "";
  const extra = extraClass ? ` ${extraClass}` : "";

  link.className = `image-card gallery-grid-card${layoutClass}${extra}`;
  link.href = "javascript:void(0)";
  link.dataset.imageSrc = image.src;

  const img = document.createElement("img");
  img.src = image.src;
  img.alt = image.alt;
  img.loading = "lazy";

  const overlay = document.createElement("div");
  overlay.className = "image-overlay";

  const label = document.createElement("span");
  label.textContent = overlayText;

  overlay.appendChild(label);
  link.append(img, overlay);

  return link;
}

function renderGalleryGrid(containerId, images, overlayText, extraClass = "") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.replaceChildren(
    ...images.map((image) => createGalleryCard(image, overlayText, extraClass))
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderGalleryGrid("galleryPicturesGrid", galleryImages, "View Image");
  renderGalleryGrid("galleryReviewsGrid", reviewImages, "View Review", "review-shot");
});
