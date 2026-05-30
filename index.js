const phoneNumber = "917857934298";

const treks = window.TREK_PACKAGES || [];

const profiles = [
  {
    name: "Rupesh Raj",
    title: "Director & Founder",
    image: "assets/profilepic/rupesh.webp",
    bio: "A mountaineering enthusiast with a passion for uncovering the sacred secrets of the Himalayas. Rupesh founded TrekHills to bring spiritual and adventurous souls closer to the peaks."
  },
  {
    name: "Arav Michael",
    title: "Team Head Operations",
    image: "assets/profilepic/arav.webp",
    bio: "The backbone of TrekHills' logistical excellence. Arav ensures that every pilgrimage and trek is executed with precision, safety, and utmost care for our trekkers."
  },
  {
    name: "Trishna Rajkonwar",
    title: "Head of Expeditions",
    image: "assets/profilepic/about_us_trishna_new.webp",
    bio: "An aerospace engineering graduate from Assam, professional mountaineer and accomplished alpinist. She brings discipline, resilience, and leadership from her tenure as an NCC cadet and national-level sportsperson. Committed to the highest standards of safety in high-altitude environments."
  }
];

const grid = document.querySelector("#trekGrid");
const foundersGrid = document.querySelector("#foundersGrid");
const modalRoot = document.querySelector("#modalRoot");
const body = document.body;

function getNumericCost(trek) {
  const value = Number(trek.cost.replace(/\D/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

const defaultReviews = [
  {
    id: 1,
    name: "Rahul S.",
    rating: 5,
    date: "October 2025",
    text: "Absolutely loved this trek! The arrangements were perfect and the views were breathtaking."
  },
  {
    id: 2,
    name: "Priya M.",
    rating: 4.5,
    date: "November 2025",
    text: "Great experience with TrekHills. The guides were very helpful and food was surprisingly good."
  },
  {
    id: 3,
    name: "Amit K.",
    rating: 5,
    date: "December 2025",
    text: "A life-changing experience. Highly recommend booking through them!"
  }
];

function displayCost(cost) {
  return cost.replace("Rs. ", "₹");
}

function starText(rating) {
  const fullStars = Math.floor(Number(rating));
  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function renderCards() {
  grid.innerHTML = treks.map((trek) => `
    <article class="trek-card" tabindex="0" role="button" data-trek-id="${trek.id}" aria-label="Open ${escapeHtml(trek.name)} details">
      <img class="trek-image" src="${trek.image}" alt="${escapeHtml(trek.name)}" />
      <div class="trek-info">
        <div class="trek-meta">
          <span class="trek-meta-item trek-location">${escapeHtml(trek.location)}</span>
          <span class="trek-meta-item trek-duration">${escapeHtml(trek.duration)}</span>
        </div>
        <h3 class="trek-name">${escapeHtml(trek.name)}</h3>
        <p class="trek-description">${escapeHtml(trek.description)}</p>
        <div class="trek-card-footer">
          <div class="trek-price">${trek.cost === "Contact Us" ? "Contact Us" : `From ${escapeHtml(trek.cost.replace("Rs. ", "₹"))}`}</div>
          <span class="trek-details">Details →</span>
        </div>
      </div>
    </article>
  `).join("");
}

function renderProfiles() {
  foundersGrid.innerHTML = profiles.map((profile) => `
    <article class="founder-card">
      <div class="founder-img-wrapper">
        <img class="founder-img" src="${profile.image}" alt="${escapeHtml(profile.name)}" />
      </div>
      <div class="founder-info">
        <h3>${escapeHtml(profile.name)}</h3>
        <p class="founder-title">${escapeHtml(profile.title)}</p>
        <p class="founder-bio">${escapeHtml(profile.bio)}</p>
      </div>
    </article>
  `).join("");
}

function openTrekModal(trek) {
  const reviews = trek.reviews || defaultReviews;
  const averageRating = reviews.length
    ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1)
    : "5.0";
  const pricingEntries = trek.pricing ? Object.entries(trek.pricing) : [];

  modalRoot.innerHTML = `
    <div class="modal-overlay" data-close-modal>
      <article class="modal-content" role="dialog" aria-modal="true" aria-labelledby="trekModalTitle">
        <button class="close-btn" type="button" data-close-modal aria-label="Close modal">×</button>
        <img class="modal-header-img" src="${trek.image}" alt="${escapeHtml(trek.name)}" />
        <div class="modal-body">
          <div class="modal-header-info">
            <div>
              <h2 class="modal-title" id="trekModalTitle">${escapeHtml(trek.name)}</h2>
              <div class="modal-rating">
                <span class="modal-stars">${starText(averageRating)}</span>
                <span>${averageRating} (${reviews.length} reviews)</span>
              </div>
              <p class="modal-meta-line">${escapeHtml(trek.location)} • ${escapeHtml(trek.duration)} • ${escapeHtml(trek.difficulty)}${trek.altitude ? ` • ${escapeHtml(trek.altitude)}` : ""}</p>
            </div>
            <div class="modal-pricing-info">
              <p>Pricing</p>
              ${pricingEntries.length ? `
                <div class="modal-price-list">
                  ${pricingEntries.map(([label, price]) => `
                    <div class="modal-price-row">
                      <span>${escapeHtml(label)}</span>
                      <strong>${escapeHtml(displayCost(price))}</strong>
                    </div>
                  `).join("")}
                </div>
              ` : `<strong class="modal-single-price">${escapeHtml(displayCost(trek.cost))}</strong>`}
              ${trek.note ? `<small>*${escapeHtml(trek.note)}</small>` : ""}
            </div>
          </div>

          <section class="modal-section">
            <h3>Detailed Itinerary</h3>
          ${trek.itinerary.map((item, index) => `
            <div class="itinerary-day">
              <div class="day-title">Day ${index + 1}: ${escapeHtml(item[0])}</div>
              <p>${escapeHtml(item[1])}</p>
            </div>
          `).join("")}
          </section>

          <section class="modal-section">
            <h3>Traveler Reviews</h3>
            <div class="reviews-list">
              ${reviews.map((review) => `
                <article class="review-card">
                  <div>
                    <strong>${escapeHtml(review.name)}</strong>
                    <span>${starText(review.rating)}</span>
                  </div>
                  <p>${escapeHtml(review.text)}</p>
                  <small>${escapeHtml(review.date)}</small>
                </article>
              `).join("")}
            </div>
            <div class="review-form-card">
              <h4>Write a Review</h4>
              <form class="review-form">
                <div class="review-form-inputs">
                  <input type="text" placeholder="Your Name" required />
                  <input type="tel" placeholder="Phone Number" />
                </div>
                <div class="review-rating-input">
                  <span>Rating:</span>
                  <select>
                    <option>5 Stars ★★★★★</option>
                    <option>4 Stars ★★★★☆</option>
                    <option>3 Stars ★★★☆☆</option>
                    <option>2 Stars ★★☆☆☆</option>
                    <option>1 Star ★☆☆☆☆</option>
                  </select>
                </div>
                <textarea rows="4" placeholder="Describe your experience..." required></textarea>
                <button type="submit">Submit Review</button>
              </form>
            </div>
          </section>

          <section class="modal-bottom-card">
            <div class="modal-details-grid">
              <div>
                <h3 class="inclusion-title">Inclusions</h3>
                <ul>
                  <li>Stay (Tents / Homestays / Hotels)</li>
                  <li>Two Meals Everyday</li>
                  <li>Travel & Transportation</li>
                  <li>Expert Trek Leaders & Guides</li>
                </ul>
              </div>
              <div>
                <h3 class="exclusion-title">Exclusions</h3>
                <ul>
                  <li>Any extra meals not mentioned</li>
                  <li>Personal expenses & shopping</li>
                  <li>Offloading charges (porters/mules)</li>
                  <li>Anything not explicitly included</li>
                </ul>
              </div>
            </div>
            <div class="refund-card">
              <h4>Refund & Cancellation Policy</h4>
              <p>Cancellations made 30 days before departure qualify for a 50% refund. 15-29 days before gets a 25% refund. No refunds for cancellations made less than 15 days prior. Full details in our Terms of Service.</p>
            </div>
            <a class="cta-button" target="_blank" rel="noopener noreferrer" href="${whatsappLink(`Hi! I'm interested in the ${trek.name} (${trek.duration}) package for ${displayCost(trek.cost)}. Please share more details.`)}">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.49-8.42"/></svg>
              Inquire via WhatsApp
            </a>
          </section>
        </div>
      </article>
    </div>
  `;
  body.classList.add("modal-open");
  modalRoot.querySelector(".review-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

function openTextModal(type) {
  const content = {
    privacy: `
      <h2>Privacy Policy</h2>
      <p>At TrekHills Adventures, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or use our services.</p>
      <h3>1. Information We Collect</h3>
      <p>When you inquire about a trek via WhatsApp or contact us through our website, we may collect personal information such as your name, phone number, email address, and travel preferences. We only collect information that is necessary to provide you with our services.</p>
      <h3>2. How We Use Your Information</h3>
      <p>The information we collect is used to:</p>
      <ul>
        <li>Process your trekking inquiries and bookings.</li>
        <li>Communicate with you regarding your itinerary, safety guidelines, and updates.</li>
        <li>Improve our website and customer service.</li>
        <li>Send you promotional offers (only if you have opted in).</li>
      </ul>
      <h3>3. Data Security</h3>
      <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.</p>
      <h3>4. Third-Party Services</h3>
      <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or conducting our business (such as WhatsApp for communication), so long as those parties agree to keep this information confidential.</p>
      <h3>5. Contact Us</h3>
      <p>If you have any questions or concerns about this Privacy Policy, please contact us at privacy@trekhills.com or via WhatsApp at +91 78579 34298.</p>
    `,
    terms: `
      <h2>Terms & Conditions</h2>
      <h3>General Terms</h3>
      <p>By booking with TrekHills, you agree to follow safety guidelines and trek leader instructions. Itineraries may be modified due to weather, roadblocks, or safety concerns.</p>
      <h3>Payment Policy</h3>
      <p>A 100% advance payment is required to confirm your booking.</p>
      <h3>Cancellation & Refund Policy</h3>
      <ul>
        <li>30 days or more before departure: 50% refund.</li>
        <li>15 to 29 days before departure: 25% refund.</li>
        <li>Less than 15 days before departure: no refund.</li>
        <li>No show: no refund.</li>
      </ul>
    `,
    contact: `
      <h2>Contact Us</h2>
      <p>We're here to help you plan your next Himalayan adventure. Reach out to us via WhatsApp for the fastest response!</p>
      <a class="cta-button contact-cta" target="_blank" rel="noopener noreferrer" href="${whatsappLink("Hi TrekHills! I'd like to get more information.")}">
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.49-8.42"/></svg>
        Chat with Us
      </a>
      <div class="contact-details">
        <p><strong>Address:</strong> Parmanand Trek Hills, Mukherjee Nagar, PIN code 110009, F block 33</p>
        <p><strong>Phone:</strong> +91 78579 34298</p>
        <p><strong>Email:</strong> info@trekhills.com</p>
      </div>
    `
  };

  modalRoot.innerHTML = `
    <div class="modal-overlay" data-close-modal>
      <article class="modal-content text-modal ${type === "contact" ? "contact-modal" : ""}" role="dialog" aria-modal="true">
        <button class="close-btn" type="button" data-close-modal aria-label="Close modal">×</button>
        ${content[type]}
      </article>
    </div>
  `;
  body.classList.add("modal-open");
}

function closeModal() {
  modalRoot.innerHTML = "";
  body.classList.remove("modal-open");
}

function whatsappLink(message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function addParticles() {
  const particles = document.querySelector(".particles");
  particles.innerHTML = Array.from({ length: 34 }, (_, index) => {
    const size = 3 + Math.random() * 5;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 8;
    return `<span class="particle" style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s"></span>`;
  }).join("");
}

function setupTheme() {
  const toggle = document.querySelector(".theme-toggle");
  toggle.addEventListener("click", () => {
    const light = body.classList.toggle("light-mode");
    body.classList.toggle("dark-mode", !light);
    toggle.setAttribute("aria-label", light ? "Toggle dark mode" : "Toggle light mode");
  });
}

function setupChat() {
  const toggle = document.querySelector(".chat-toggle-btn");
  const windowEl = document.querySelector(".chat-window");
  const chatBody = document.querySelector("#chatBody");
  let step = 0;
  const answers = {};

  function scrollChat() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function bot(text) {
    chatBody.insertAdjacentHTML("beforeend", `<div class="chat-bubble bot-bubble">${escapeHtml(text)}</div>`);
    scrollChat();
  }

  function user(text) {
    chatBody.insertAdjacentHTML("beforeend", `<div class="chat-bubble user-bubble">${escapeHtml(text)}</div>`);
    scrollChat();
  }

  function options(items) {
    chatBody.insertAdjacentHTML("beforeend", `
      <div class="chat-options">
        ${items.map((item) => `<button class="chat-opt-btn" type="button">${escapeHtml(item)}</button>`).join("")}
      </div>
    `);
    scrollChat();
  }

  function showResults() {
    let filtered = [...treks];
    if (answers.location && answers.location !== "Anywhere") {
      filtered = filtered.filter((trek) => trek.location.includes(answers.location));
    }
    if (answers.budget === "Under Rs. 10,000") {
      filtered = filtered.filter((trek) => {
        const cost = getNumericCost(trek);
        return cost !== null && cost < 10000;
      });
    }
    if (answers.budget === "Above Rs. 10,000") {
      filtered = filtered.filter((trek) => {
        const cost = getNumericCost(trek);
        return cost !== null && cost >= 10000;
      });
    }
    if (answers.difficulty === "Easy / Leisure") {
      filtered = filtered.filter((trek) => trek.difficulty.toLowerCase().includes("easy") || trek.difficulty.toLowerCase().includes("driving"));
    }
    if (answers.difficulty === "Moderate / Trekking") {
      filtered = filtered.filter((trek) => trek.difficulty.toLowerCase().includes("moderate"));
    }
    if (answers.difficulty === "Difficult / Spiritual") {
      filtered = filtered.filter((trek) => {
        const text = `${trek.difficulty} ${trek.description} ${trek.name}`.toLowerCase();
        return text.includes("difficult") || text.includes("spiritual") || text.includes("dham") || text.includes("yatra");
      });
    }

    const recommendations = filtered.slice(0, 4);
    bot(recommendations.length
      ? `Here are ${recommendations.length} amazing options that match your vibe.`
      : "I could not find an exact match, but these popular options are a good place to start.");
    chatBody.insertAdjacentHTML("beforeend", `
      <div class="chat-results">
        ${(recommendations.length ? recommendations : treks.slice(0, 4)).map((trek) => `
          <button class="chat-trek-card" type="button" data-chat-trek="${trek.id}">
            <img src="${trek.image}" alt="${escapeHtml(trek.name)}" />
            <span>
              <h4>${escapeHtml(trek.name)}</h4>
              <p>${escapeHtml(trek.duration)} - ${escapeHtml(trek.cost)}</p>
            </span>
          </button>
        `).join("")}
      </div>
    `);
    options(["Start Over"]);
  }

  function resetChat() {
    step = 0;
    answers.location = "";
    answers.budget = "";
    answers.difficulty = "";
    chatBody.innerHTML = "";
    bot("Namaste! I'm your TrekHills virtual guide. Where are you dreaming of going?");
    options(["Uttarakhand", "Himachal Pradesh", "Anywhere"]);
  }

  toggle.addEventListener("click", () => {
    const opening = windowEl.hidden;
    windowEl.hidden = !opening;
    toggle.classList.toggle("active", opening);
    if (opening && !chatBody.children.length) {
      resetChat();
    }
  });

  chatBody.addEventListener("click", (event) => {
    const option = event.target.closest(".chat-opt-btn");
    const result = event.target.closest("[data-chat-trek]");

    if (result) {
      windowEl.hidden = true;
      toggle.classList.remove("active");
      openTrekModal(treks.find((trek) => trek.id === Number(result.dataset.chatTrek)));
      return;
    }

    if (!option) return;

    const value = option.textContent;
    option.closest(".chat-options").remove();

    if (value === "Start Over") {
      resetChat();
      return;
    }

    user(value);

    if (step === 0) {
      answers.location = value;
      step = 1;
      setTimeout(() => {
        bot("Awesome! What's your approximate budget per person?");
        options(["Under Rs. 10,000", "Above Rs. 10,000", "Doesn't matter"]);
      }, 400);
      return;
    }

    if (step === 1) {
      answers.budget = value;
      step = 2;
      setTimeout(() => {
        bot("Got it. Finally, what kind of experience are you looking for?");
        options(["Easy / Leisure", "Moderate / Trekking", "Difficult / Spiritual"]);
      }, 400);
      return;
    }

    answers.difficulty = value;
    step = 3;
    setTimeout(showResults, 600);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  renderProfiles();
  addParticles();
  setupTheme();
  setupChat();

  document.querySelector(".header").classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", () => {
    document.querySelector(".header").classList.toggle("scrolled", window.scrollY > 10);
  });

  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-trek-id]");
    if (card) openTrekModal(treks.find((trek) => trek.id === Number(card.dataset.trekId)));
  });

  grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-trek-id]");
    if (!card) return;
    event.preventDefault();
    openTrekModal(treks.find((trek) => trek.id === Number(card.dataset.trekId)));
  });

  document.addEventListener("click", (event) => {
    const modalButton = event.target.closest("[data-modal]");
    if (modalButton) openTextModal(modalButton.dataset.modal);
    if (event.target.matches("[data-close-modal]")) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
});
