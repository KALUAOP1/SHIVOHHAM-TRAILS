const phoneNumber = "917857934298";

const treks = window.TREK_PACKAGES || [];
const enrichedTreks = treks.map(enrichTrek);

const profiles = [
  {
    name: "Rupesh Raj",
    title: "Director & Founder",
    image: "assets/profilepic/rupesh.webp",
    bio: "A mountaineering enthusiast with a passion for uncovering the sacred secrets of the Himalayas. Rupesh founded SHIVOHHAM TRAILS to bring spiritual and adventurous souls closer to the peaks."
  },
  {
    name: "Arav Michael",
    title: "Team Head Operations",
    image: "assets/profilepic/arav.webp",
    bio: "The backbone of SHIVOHHAM TRAILS' logistical excellence. Arav ensures that every pilgrimage and trek is executed with precision, safety, and utmost care for our trekkers."
  },
  {
    name: "Trishna Rajkonwar",
    title: "Head of Expeditions",
    image: "assets/profilepic/about_us_trishna_new.webp",
    bio: "An aerospace engineering graduate from Assam, professional mountaineer and accomplished alpinist. She brings discipline, resilience, and leadership from her tenure as an NCC cadet and national-level sportsperson. Committed to the highest standards of safety in high-altitude environments."
  }
];

const featuredPackages = document.querySelector("#featuredPackages");
const packagesGrid = document.querySelector("#packagesGrid");
const packageSearch = document.querySelector("#packageSearch");
const priceRange = document.querySelector("#priceRange");
const priceRangeValue = document.querySelector("#priceRangeValue");
const filterCount = document.querySelector("#filterCount");
const packageResultCount = document.querySelector("#packageResultCount");
const packageResultNote = document.querySelector("#packageResultNote");
const emptyResults = document.querySelector("#emptyResults");
const foundersGrid = document.querySelector("#foundersGrid");
const modalRoot = document.querySelector("#modalRoot");
const body = document.body;
const filterState = {
  search: "",
  maxPrice: 20000,
  locations: new Set(),
  durations: new Set(),
  seasons: new Set(),
  difficulties: new Set(),
  types: new Set(),
  experiences: new Set()
};

const filterOptions = {
  locations: ["Uttarakhand", "Himachal Pradesh", "Kashmir", "Nepal", "Ladakh"],
  durations: ["1-3 Days", "4-6 Days", "7-10 Days", "10+ Days"],
  seasons: ["Summer", "Monsoon", "Autumn", "Winter", "Spring"],
  difficulties: ["Easy", "Moderate", "Difficult"],
  types: ["Latest", "Discount", "Popular", "Luxury", "Family Friendly"],
  experiences: ["Trekking", "Pilgrimage/Yatra", "Camping", "Adventure", "Luxury Retreat"]
};

function getNumericCost(trek) {
  const value = Number(trek.cost.replace(/\D/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

function getDurationDays(duration) {
  const match = String(duration).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function includesText(value, text) {
  return String(value).toLowerCase().includes(text);
}

function enrichTrek(trek) {
  const text = `${trek.name} ${trek.location} ${trek.description} ${trek.difficulty}`.toLowerCase();
  const days = getDurationDays(trek.duration);
  const price = getNumericCost(trek);
  const difficulty = includesText(trek.difficulty, "difficult")
    ? "Difficult"
    : includesText(trek.difficulty, "moderate")
      ? "Moderate"
      : "Easy";
  const seasons = [];
  if (text.includes("winter") || text.includes("snow") || text.includes("kedarkantha") || text.includes("spiti")) seasons.push("Winter");
  if (text.includes("bugyal") || text.includes("meadow") || text.includes("valley") || text.includes("chopta")) seasons.push("Summer", "Spring");
  if (text.includes("dham") || text.includes("yatra") || text.includes("kedarnath") || text.includes("badrinath")) seasons.push("Summer", "Autumn");
  if (!seasons.length) seasons.push("Summer", "Autumn");

  const types = [];
  if ([1, 2, 3, 4, 5, 6].includes(trek.id)) types.push("Latest");
  if (price !== null && price <= 7000) types.push("Discount");
  if ([1, 3, 4, 10, 12, 15].includes(trek.id)) types.push("Popular");
  if (text.includes("royal") || text.includes("retreat") || text.includes("spiti") || price >= 12000) types.push("Luxury");
  if (difficulty === "Easy" || text.includes("tour") || text.includes("retreat")) types.push("Family Friendly");

  const experiences = [];
  if (text.includes("trek") || text.includes("pass") || text.includes("bugyal") || text.includes("triund") || text.includes("kheerganga")) experiences.push("Trekking");
  if (text.includes("dham") || text.includes("yatra") || text.includes("temple") || text.includes("kedarnath") || text.includes("badrinath")) experiences.push("Pilgrimage/Yatra");
  if (text.includes("camp") || text.includes("chopta") || text.includes("kheerganga")) experiences.push("Camping");
  if (text.includes("expedition") || text.includes("paragliding") || text.includes("spiti") || difficulty !== "Easy") experiences.push("Adventure");
  if (text.includes("retreat") || text.includes("royal") || text.includes("tour") || text.includes("spiti")) experiences.push("Luxury Retreat");
  if (!experiences.length) experiences.push("Adventure");

  const badges = [];
  if (types.includes("Latest")) badges.push("New");
  if (types.includes("Popular")) badges.push("Best Seller");
  if (types.includes("Discount")) badges.push("Discount");

  return {
    ...trek,
    days,
    price,
    normalizedDifficulty: difficulty,
    seasons: [...new Set(seasons)],
    types: [...new Set(types)],
    experiences: [...new Set(experiences)],
    badges,
    rating: [4.9, 4.8, 4.7, 4.9, 4.6][trek.id % 5]
  };
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
    text: "Great experience with SHIVOHHAM TRAILS. The guides were very helpful and food was surprisingly good."
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
  return cost;
}

function starText(rating) {
  const fullStars = Math.floor(Number(rating));
  return "*".repeat(fullStars) + "-".repeat(5 - fullStars);
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

function packageCard(trek, compact = false) {
  return `
    <a class="trek-card package-card ${compact ? "featured-card" : ""}" href="package-detail.html?id=${trek.id}" aria-label="Open ${escapeHtml(trek.name)} details">
      <div class="package-media">
      <img class="trek-image" src="${trek.image}" alt="${escapeHtml(trek.name)}" />
        <div class="package-badges">
          ${trek.badges.slice(0, compact ? 1 : 3).map((badge) => `<span>${escapeHtml(badge)}</span>`).join("")}
          <span class="difficulty-badge ${trek.normalizedDifficulty.toLowerCase()}">${escapeHtml(trek.normalizedDifficulty)}</span>
        </div>
      </div>
      <div class="trek-info">
        <div class="trek-meta">
          <span class="trek-meta-item trek-location">${escapeHtml(trek.location)}</span>
          <span class="trek-meta-item trek-duration">${escapeHtml(trek.duration)}</span>
        </div>
        <h3 class="trek-name">${escapeHtml(trek.name)}</h3>
        <div class="package-rating"><span>${starText(trek.rating)}</span><strong>${trek.rating.toFixed(1)}</strong></div>
        <p class="trek-description">${escapeHtml(trek.description)}</p>
        <div class="trek-card-footer">
          <div class="trek-price">${trek.cost === "Contact Us" ? "Contact Us" : `From ${escapeHtml(trek.cost)}`}</div>
          <span class="trek-details">View Details</span>
        </div>
      </div>
    </a>
  `;
}

function renderFeaturedPackages() {
  if (!featuredPackages) return;
  const groups = [
    ["Latest Packages", enrichedTreks.filter((trek) => trek.types.includes("Latest")).slice(0, 2)],
    ["Discount Packages", enrichedTreks.filter((trek) => trek.types.includes("Discount")).slice(0, 2)],
    ["Popular Packages", enrichedTreks.filter((trek) => trek.types.includes("Popular")).slice(0, 2)]
  ];

  featuredPackages.innerHTML = groups.map(([title, items]) => `
    <div class="featured-column">
      <div class="featured-column-head">
        <span>${escapeHtml(title)}</span>
        <small>${items.length} picks</small>
      </div>
      <div class="featured-stack">
        ${items.map((trek) => packageCard(trek, true)).join("")}
      </div>
    </div>
  `).join("");
}

function renderFilterOptions() {
  Object.entries(filterOptions).forEach(([group, options]) => {
    const container = document.querySelector(`[data-filter-group="${group}"]`);
    if (!container) return;
    container.innerHTML = options.map((option) => `
      <label class="filter-chip">
        <input type="checkbox" value="${escapeHtml(option)}" data-filter="${group}" />
        <span>${escapeHtml(option)}</span>
      </label>
    `).join("");
  });
}

function matchesDuration(trek, value) {
  if (value === "1-3 Days") return trek.days >= 1 && trek.days <= 3;
  if (value === "4-6 Days") return trek.days >= 4 && trek.days <= 6;
  if (value === "7-10 Days") return trek.days >= 7 && trek.days <= 10;
  return trek.days >= 10 || trek.name.toLowerCase().includes("char dham");
}

function selectedMatches(set, predicate) {
  if (!set.size) return true;
  return [...set].some(predicate);
}

function filterPackages() {
  const query = filterState.search.trim().toLowerCase();
  return enrichedTreks.filter((trek) => {
    const searchable = `${trek.name} ${trek.location} ${trek.description} ${trek.duration} ${trek.difficulty} ${trek.types.join(" ")} ${trek.experiences.join(" ")}`.toLowerCase();
    if (query && !searchable.includes(query)) return false;
    if (trek.price !== null && trek.price > filterState.maxPrice) return false;
    if (!selectedMatches(filterState.locations, (value) => trek.location === value)) return false;
    if (!selectedMatches(filterState.durations, (value) => matchesDuration(trek, value))) return false;
    if (!selectedMatches(filterState.seasons, (value) => trek.seasons.includes(value))) return false;
    if (!selectedMatches(filterState.difficulties, (value) => trek.normalizedDifficulty === value)) return false;
    if (!selectedMatches(filterState.types, (value) => trek.types.includes(value))) return false;
    if (!selectedMatches(filterState.experiences, (value) => trek.experiences.includes(value))) return false;
    return true;
  });
}

function activeFilterTotal() {
  const checkboxTotal = ["locations", "durations", "seasons", "difficulties", "types", "experiences"]
    .reduce((total, group) => total + filterState[group].size, 0);
  const searchTotal = filterState.search.trim() ? 1 : 0;
  const priceTotal = filterState.maxPrice < 20000 ? 1 : 0;
  return checkboxTotal + searchTotal + priceTotal;
}

function updatePriceLabel() {
  if (!priceRangeValue) return;
  priceRangeValue.textContent = filterState.maxPrice >= 20000
    ? "Rs. 20,000+"
    : `Rs. ${filterState.maxPrice.toLocaleString("en-IN")}`;
}

function renderPackages() {
  if (!packagesGrid) return;
  const filtered = filterPackages();
  packagesGrid.innerHTML = filtered.map((trek) => packageCard(trek)).join("");
  if (packageResultCount) packageResultCount.textContent = filtered.length;
  if (filterCount) filterCount.textContent = activeFilterTotal();
  if (packageResultNote) {
    packageResultNote.textContent = filtered.length === enrichedTreks.length
      ? "Showing every available SHIVOHHAM TRAILS package."
      : "Updated for your selected filters.";
  }
  if (emptyResults) emptyResults.hidden = filtered.length > 0;
}

function setupPackageFilters() {
  renderFilterOptions();
  updatePriceLabel();
  renderPackages();

  packageSearch?.addEventListener("input", (event) => {
    filterState.search = event.target.value;
    renderPackages();
  });

  priceRange?.addEventListener("input", (event) => {
    filterState.maxPrice = Number(event.target.value);
    updatePriceLabel();
    renderPackages();
  });

  document.querySelector(".filter-panel")?.addEventListener("change", (event) => {
    const input = event.target.closest("[data-filter]");
    if (!input) return;
    const group = input.dataset.filter;
    if (input.checked) {
      filterState[group].add(input.value);
    } else {
      filterState[group].delete(input.value);
    }
    renderPackages();
  });

  document.querySelector("#clearFilters")?.addEventListener("click", () => {
    filterState.search = "";
    filterState.maxPrice = 20000;
    ["locations", "durations", "seasons", "difficulties", "types", "experiences"].forEach((group) => filterState[group].clear());
    if (packageSearch) packageSearch.value = "";
    if (priceRange) priceRange.value = "20000";
    document.querySelectorAll("[data-filter]").forEach((input) => {
      input.checked = false;
    });
    updatePriceLabel();
    renderPackages();
  });
}

function renderProfiles() {
  if (!foundersGrid) return;
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

function renderPackageDetail() {
  const detailRoot = document.querySelector("#packageDetailRoot");
  if (!detailRoot) return;

  const params = new URLSearchParams(window.location.search);
  const requestedId = Number(params.get("id"));
  const trek = enrichedTreks.find((item) => item.id === requestedId) || enrichedTreks[0];

  if (!trek) {
    detailRoot.innerHTML = `
      <section class="detail-loading">
        <h1>Package not found</h1>
        <p>Please return to the packages page and choose another trip.</p>
        <a class="hero-cta primary" href="packages.html">View Packages</a>
      </section>
    `;
    return;
  }

  document.title = `${trek.name} | SHIVOHHAM TRAILS`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", trek.description);

  detailRoot.innerHTML = `
    <section class="detail-hero">
      <img src="${trek.image}" alt="${escapeHtml(trek.name)}" />
      <div class="detail-hero-content">
        <p class="eyebrow">${escapeHtml(trek.location)}</p>
        <h1>${escapeHtml(trek.name)}</h1>
        <p>${escapeHtml(trek.description)}</p>
        <div class="detail-hero-actions">
          <a class="hero-cta primary" target="_blank" rel="noopener noreferrer" href="${whatsappLink(`Hi! I want to book ${trek.name}. Please share more details.`)}">Book Now</a>
          <a class="hero-cta ghost" href="packages.html">Back to Packages</a>
        </div>
      </div>
    </section>

    <section class="detail-shell">
      <aside class="detail-summary">
        <div class="detail-price">${trek.cost === "Contact Us" ? "Contact Us" : escapeHtml(trek.cost)}</div>
        <dl>
          <div><dt>Duration</dt><dd>${escapeHtml(trek.duration)}</dd></div>
          <div><dt>Difficulty</dt><dd>${escapeHtml(trek.normalizedDifficulty)}</dd></div>
          <div><dt>Season</dt><dd>${escapeHtml(trek.seasons.join(", "))}</dd></div>
          <div><dt>Rating</dt><dd>${trek.rating.toFixed(1)} / 5</dd></div>
        </dl>
        <a class="cta-button detail-book" target="_blank" rel="noopener noreferrer" href="${whatsappLink(`Hi! I want to book ${trek.name} (${trek.duration}) for ${trek.cost}.`)}">Book Now</a>
      </aside>

      <div class="detail-content">
        <section class="detail-card">
          <h2>Overview</h2>
          <p>${escapeHtml(trek.description)}</p>
        </section>

        <section class="detail-card">
          <h2>Itinerary</h2>
          <div class="detail-itinerary">
            ${trek.itinerary.map((item, index) => `
              <article class="itinerary-day">
                <div class="day-title">Day ${index + 1}: ${escapeHtml(item[0])}</div>
                <p>${escapeHtml(item[1])}</p>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="detail-card">
          <h2>Included / Excluded</h2>
          <div class="modal-details-grid">
            <div>
              <h3>Included</h3>
              <ul>
                <li>Stay in selected tents, homestays, or hotels</li>
                <li>Two meals every travel day</li>
                <li>Travel and local transportation support</li>
                <li>Experienced trek leaders and local guides</li>
              </ul>
            </div>
            <div>
              <h3>Excluded</h3>
              <ul>
                <li>Personal expenses and shopping</li>
                <li>Meals or activities not listed in the itinerary</li>
                <li>Porter, mule, or offloading charges</li>
                <li>Anything not explicitly included</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  `;
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
        <button class="close-btn" type="button" data-close-modal aria-label="Close modal">x</button>
        <img class="modal-header-img" src="${trek.image}" alt="${escapeHtml(trek.name)}" />
        <div class="modal-body">
          <div class="modal-header-info">
            <div>
              <h2 class="modal-title" id="trekModalTitle">${escapeHtml(trek.name)}</h2>
              <div class="modal-rating">
                <span class="modal-stars">${starText(averageRating)}</span>
                <span>${averageRating} (${reviews.length} reviews)</span>
              </div>
              <p class="modal-meta-line">${escapeHtml(trek.location)} / ${escapeHtml(trek.duration)} / ${escapeHtml(trek.difficulty)}${trek.altitude ? ` / ${escapeHtml(trek.altitude)}` : ""}</p>
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
                    <option>5 Stars</option>
                    <option>4 Stars</option>
                    <option>3 Stars</option>
                    <option>2 Stars</option>
                    <option>1 Star</option>
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
      <p>At SHIVOHHAM TRAILS Adventures, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or use our services.</p>
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
      <p>If you have any questions or concerns about this Privacy Policy, please contact us at privacy@shivohhamtrails.com or via WhatsApp at +91 78579 34298.</p>
    `,
    terms: `
      <h2>Terms & Conditions</h2>
      <h3>General Terms</h3>
      <p>By booking with SHIVOHHAM TRAILS, you agree to follow safety guidelines and trek leader instructions. Itineraries may be modified due to weather, roadblocks, or safety concerns.</p>
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
      <a class="cta-button contact-cta" target="_blank" rel="noopener noreferrer" href="${whatsappLink("Hi SHIVOHHAM TRAILS! I'd like to get more information.")}">
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.49-8.42"/></svg>
        Chat with Us
      </a>
      <div class="contact-details">
        <p><strong>Address:</strong> Parmanand Trek Hills, Mukherjee Nagar, PIN code 110009, F block 33</p>
        <p><strong>Phone:</strong> +91 78579 34298</p>
        <p><strong>Email:</strong> info@shivohhamtrails.com</p>
      </div>
    `
  };

  modalRoot.innerHTML = `
    <div class="modal-overlay" data-close-modal>
      <article class="modal-content text-modal ${type === "contact" ? "contact-modal" : ""}" role="dialog" aria-modal="true">
        <button class="close-btn" type="button" data-close-modal aria-label="Close modal">x</button>
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
  if (!particles) return;
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
  if (!toggle) return;
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
          <a class="chat-trek-card" href="package-detail.html?id=${trek.id}">
            <img src="${trek.image}" alt="${escapeHtml(trek.name)}" />
            <span>
              <h4>${escapeHtml(trek.name)}</h4>
              <p>${escapeHtml(trek.duration)} - ${escapeHtml(trek.cost)}</p>
            </span>
          </a>
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
    bot("Namaste! I'm your SHIVOHHAM TRAILS virtual guide. Where are you dreaming of going?");
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
  renderFeaturedPackages();
  setupPackageFilters();
  renderPackageDetail();
  renderProfiles();
  addParticles();
  setupTheme();
  setupChat();

  document.querySelector(".header").classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", () => {
    document.querySelector(".header").classList.toggle("scrolled", window.scrollY > 10);
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
