
const products = [
  {
    id: 1,
    name: "Vice City x Miami Heat",
    category: "Jersey",
    tag: "New",
    image: "images/1.jpg",
    description: "Inspired by Vice City and Miami Heat, featuring a bold Miami-inspired design with vibrant colors and a basketball streetwear aesthetic. Fully customizable with your team name, logo, player name and number."
  },
  {
    id: 2,
    name: "Matchday Red",
    category: "Jersey",
    tag: "New",
    image: "images/2.jpg",
    description: "A clean and stylish jersey design for teams, clubs and organizations. Fully customizable with your own colors, logo, name and number."
  },
  {
    id: 3,
    name: "Vice City x Varsity Jacket",
    category: "Varsity Jacket",
    tag: "New",
    image: "images/3.jpg",
    description: "Inspired by Vice City and Miami nightlife, featuring a bold retro streetwear design. Customize your logo, team name, text and colors."
  },
  {
    id: 4,
    name: "Customize Jersey",
    category: "Jersey",
    tag: "Popular",
    image: "images/4.jpg",
    description: "Create your own unique jersey design with custom colors, logos, player names and numbers."
  },
  {
    id: 5,
    name: "Street Varsity Concept",
    category: "Varsity Jacket",
    tag: "Custom",
    image: "images/5.jpg",
    description: "A stylish varsity-inspired jacket. Customize the body, sleeves, logo and accent colors."
  },
  {
    id: 6,
    name: "Street Varsity Concept",
    category: "Varsity Jacket",
    tag: "Custom",
    image: "images/6.jpg",
    description: "A modern streetwear varsity jacket concept, customizable with your own design and color combination."
  },
  {
    id: 7,
    name: "Customize Polo",
    category: "Polo",
    tag: "Custom",
    image: "images/7.jpg",
    description: "Stylish and comfortable custom polo, perfect for teams, businesses, and events. Customize with your own logo, name, and colors."
  },
  {
    id: 8,
    name: "Customize Polo",
    category: "Polo",
    tag: "Custom",
    image: "images/8.jpg",
    description: "A clean and comfortable polo design for uniforms, teams and organizations. Customize with your logo and colors."
  }
];

// ELEMENTS
const grid = document.getElementById("productGrid");
const chips = document.querySelectorAll(".chip");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

let activeCategory = "All";

// FACEBOOK PAGE LINK
const FACEBOOK_PAGE_LINK =
  "https://www.facebook.com/share/1E1KVutcP6/?mibextid=wwXIfr";

// RENDER PRODUCTS
function renderProducts() {
  const keyword = searchInput.value.trim().toLowerCase();

  let filtered = products.filter(product =>
    (activeCategory === "All" ||
      product.category === activeCategory) &&
    (
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    )
  );

  if (sortSelect.value === "az") {
    filtered.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  resultCount.textContent =
    `Showing ${filtered.length} ${
      filtered.length === 1 ? "mockup" : "mockups"
    }`;

  emptyState.hidden = filtered.length !== 0;

  grid.innerHTML = filtered.map(product => `
    <article class="product-card"
      data-id="${product.id}"
      tabindex="0"
      role="button"
      aria-label="View ${product.name}">

      <div class="product-image">
        <span class="product-tag ${
          product.tag === "Bestseller" ||
          product.tag === "Popular" ? "green" : ""
        }">${product.tag}</span>

        <img src="${product.image}"
          alt="${product.name} mockup"
          loading="lazy">
      </div>

      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3>${product.name}</h3>
        <p>Customizable • Made to order</p>

        <div class="product-bottom">
          <span>INQUIRE FOR PRICE</span>
          <b class="view-link">↗</b>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      openProduct(Number(card.dataset.id));
    });

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProduct(Number(card.dataset.id));
      }
    });
  });
}

// CATEGORY FILTER
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(item =>
      item.classList.remove("active")
    );

    chip.classList.add("active");
    activeCategory = chip.dataset.category;

    renderProducts();
  });
});

// SEARCH AND SORT
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

// SEARCH TOGGLE
const searchBox = document.getElementById("searchBox");

document.getElementById("searchToggle")
  .addEventListener("click", () => {
    searchBox.classList.toggle("visible");

    if (searchBox.classList.contains("visible")) {
      searchInput.focus();
    }
  });

// MOBILE MENU
document.getElementById("menuToggle")
  .addEventListener("click", () => {
    document.getElementById("mainNav")
      .classList.toggle("show");
  });

document.querySelectorAll(".nav-link")
  .forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("mainNav")
        .classList.remove("show");
    });
  });

// PRODUCT MODAL
const modal = document.getElementById("productModal");

function openProduct(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalImage").alt = product.name;

  document.getElementById("modalTitle").textContent =
    product.name;

  document.getElementById("modalCategory").textContent =
    product.category.toUpperCase() + " MOCKUP";

  document.getElementById("modalDescription").textContent =
    product.description;

  const inquiryButton =
    document.getElementById("modalInquiry");

  // DIRECT TO FACEBOOK PAGE
  inquiryButton.href = FACEBOOK_PAGE_LINK;
  inquiryButton.target = "_blank";
  inquiryButton.rel = "noopener noreferrer";

  // REMOVE OLD ORDER FORM ACTION
  inquiryButton.onclick = null;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

// CLOSE PRODUCT MODAL
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

document.getElementById("modalClose")
  .addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target.dataset.close) {
    closeModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// START ORDER BUTTON
// Directly opens Facebook Page
const startOrderBtn =
  document.getElementById("startOrderBtn");

if (startOrderBtn) {
  startOrderBtn.addEventListener("click", () => {
    window.open(
      FACEBOOK_PAGE_LINK,
      "_blank",
      "noopener,noreferrer"
    );
  });
}

// INITIAL DISPLAY
renderProducts();
