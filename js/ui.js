/* ==========================================
   ATGLANCE MANNEQUINS
   UI INTERACTIONS
========================================== */

let currentProduct = null;

/* ==========================================
   ELEMENTS
========================================== */

const navbar =
    document.getElementById("navbar");

const overlay =
    document.getElementById("overlay");

const cartSidebar =
    document.getElementById("cartSidebar");

const productModal =
    document.getElementById("productModal");

const checkoutModal =
    document.getElementById("checkoutModal");

const wishlistSidebar =
    document.getElementById("wishlistSidebar");

function openWishlist() {

    wishlistSidebar.classList.add(
        "active"
    );

    overlay.classList.add(
        "active"
    );

}

function closeWishlist() {

    wishlistSidebar.classList.remove(
        "active"
    );

    overlay.classList.remove(
        "active"
    );

}

/* ==========================================
   PRODUCT MODAL
========================================== */

function openModal(productId) {

    const product =
        products.find(
            item =>
            item.id === productId
        );

    if (!product) return;

    currentProduct = product;

    const modalContent =
        document.getElementById(
            "modalContent"
        );

    modalContent.innerHTML = `

    <button
        class="modal-close"
        onclick="closeModal()">

        ×

    </button>

    <div class="quick-view-grid">

        <div class="quick-view-image">

            <img
                src="${product.image}"
                alt="${product.name}">

        </div>

        <div class="quick-view-content">

            <span class="product-badge">

                ${product.badge || "Premium"}

            </span>

            <h2>
                ${product.name}
            </h2>

            <div class="price">

                ₹${product.price.toLocaleString("en-IN")}

            </div>

            <p>
                <strong>Material:</strong>
                ${product.material}
            </p>

            <p>
                <strong>Finish:</strong>
                ${product.finish}
            </p>

            <p>
                <strong>Dimensions:</strong>
                ${product.dimensions}
            </p>

            <br>

            <p>
                ${product.description}
            </p>

            <div class="qty-box">

                <button
                class="qty-btn"
                onclick="changeModalQty(-1)">
                    -
                </button>

                <span id="modalQty">
                    1
                </span>

                <button
                class="qty-btn"
                onclick="changeModalQty(1)">
                    +
                </button>

            </div>

            <div class="hero-buttons">

                <button
                class="btn btn-primary"
                onclick="addModalProduct()">

                    Add To Cart

                </button>

                <a
                href="https://wa.me/918188937077?text=Hi%20AtGlance%20Mannequins,%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}"
                target="_blank"
                class="btn btn-outline">

                    WhatsApp

                </a>

            </div>

        </div>

    </div>

    `;

    productModal.classList.add(
        "active"
    );

    overlay.classList.add(
        "active"
    );

}

function closeModal() {

    productModal.classList.remove(
        "active"
    );

    overlay.classList.remove(
        "active"
    );

}

function changeModalQty(delta) {

    const qtyElement =
        document.getElementById(
            "modalQty"
        );

    let qty =
        parseInt(
            qtyElement.innerText
        );

    qty += delta;

    if (qty < 1) qty = 1;

    if (qty > 99) qty = 99;

    qtyElement.innerText =
        qty;

}

function addModalProduct() {

    const qty =
        parseInt(
            document.getElementById(
                "modalQty"
            ).innerText
        );

    addToCart(
        currentProduct.id,
        qty
    );

    closeModal();

}

/* ==========================================
   CART SIDEBAR
========================================== */

function openCart() {

    cartSidebar.classList.add(
        "active"
    );

    overlay.classList.add(
        "active"
    );

}

function closeCart() {

    cartSidebar.classList.remove(
        "active"
    );

    overlay.classList.remove(
        "active"
    );

}

/* ==========================================
   CHECKOUT MODAL
========================================== */

function openCheckout() {

    closeCart();

    updateCheckoutSummary();

    checkoutModal.classList.add(
        "active"
    );

    overlay.classList.add(
        "active"
    );

}

function closeCheckout() {

    checkoutModal.classList.remove(
        "active"
    );

    overlay.classList.remove(
        "active"
    );

}

/* ==========================================
   NAVBAR SCROLL
========================================== */

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 80
        ) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);

/* ==========================================
   MOBILE MENU
========================================== */
const hamburger =
document.getElementById("hamburger");

const sidebar =
document.getElementById("mobileSidebar");

const overlayMenu =
document.getElementById("menuOverlay");

const closeSidebar =
document.getElementById("closeSidebar");

function openSidebar(){

    sidebar.classList.add("active");

    overlayMenu.classList.add("active");

}

function closeSidebarMenu(){

    sidebar.classList.remove("active");

    overlayMenu.classList.remove("active");

}

hamburger?.addEventListener(
    "click",
    openSidebar
);

closeSidebar?.addEventListener(
    "click",
    closeSidebarMenu
);

overlayMenu?.addEventListener(
    "click",
    closeSidebarMenu
);
/* ==========================================
   SEARCH TOGGLE
========================================== */

const searchToggle =
    document.getElementById(
        "searchToggle"
    );

const searchExpand =
    document.getElementById(
        "searchExpand"
    );

if (searchToggle) {

    searchToggle.addEventListener(
        "click",
        () => {

            searchExpand.classList.toggle(
                "active"
            );

        }
    );

}

/* ==========================================
   FILTERS
========================================== */

let activeFilter = "all";

function applyFilter(category) {

    activeFilter = category;

    const sort =
        document.getElementById(
            "sortProducts"
        )?.value || "default";

    const search =
        document.getElementById(
            "productSearch"
        )?.value || "";

    renderProducts(
        category,
        sort,
        search
    );

}

/* ==========================================
   FILTER BUTTONS
========================================== */

document.addEventListener(
    "click",
    e => {

        if (
            e.target.classList.contains(
                "filter-btn"
            )
        ) {

            document
                .querySelectorAll(
                    ".filter-btn"
                )
                .forEach(btn =>
                    btn.classList.remove(
                        "active"
                    )
                );

            e.target.classList.add(
                "active"
            );

            applyFilter(
                e.target.dataset.filter
            );

        }

    }
);

/* ==========================================
   CATEGORY CLICK
========================================== */

document.addEventListener(
    "click",
    e => {

        const card =
            e.target.closest(
                ".category-card"
            );

        if (!card) return;

        const category =
            card.dataset.category;

        applyFilter(category);

        document
            .getElementById("shop")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

/* ==========================================
   PRODUCT SEARCH
========================================== */

document.addEventListener(
    "input",
    e => {

        if (
            e.target.id ===
            "productSearch"
        ) {

            const sort =
                document.getElementById(
                    "sortProducts"
                ).value;

            renderProducts(
                activeFilter,
                sort,
                e.target.value
            );

        }

    }
);

/* ==========================================
   PRODUCT SORT
========================================== */

document.addEventListener(
    "change",
    e => {

        if (
            e.target.id ===
            "sortProducts"
        ) {

            const search =
                document.getElementById(
                    "productSearch"
                ).value;

            renderProducts(
                activeFilter,
                e.target.value,
                search
            );

        }

    }
);

/* ==========================================
   SMOOTH LINKS
========================================== */

document
.querySelectorAll(
    'a[href^="#"]'
)
.forEach(link => {

    link.addEventListener(
        "click",
        e => {

            const target =
                document.querySelector(
                    link.getAttribute(
                        "href"
                    )
                );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

});

/* ==========================================
   COUNTER ANIMATION
========================================== */

const counterObserver =
new IntersectionObserver(
entries => {

    entries.forEach(
        entry => {

            if (
                !entry.isIntersecting
            ) return;

            const counter =
                entry.target;

            const target =
                parseInt(
                    counter.dataset.target
                );

            let count = 0;

            const speed =
                target / 60;

            const update =
                () => {

                    count += speed;

                    if (
                        count < target
                    ) {

                        counter.innerText =
                            Math.floor(
                                count
                            );

                        requestAnimationFrame(
                            update
                        );

                    } else {

                        counter.innerText =
                            target + "+";

                    }

                };

            update();

            counterObserver.unobserve(
                counter
            );

        }
    );

});

document
.querySelectorAll(
    ".counter"
)
.forEach(counter => {

    counterObserver.observe(
        counter
    );

});

/* ==========================================
   TESTIMONIAL CAROUSEL
========================================== */

function initTestimonials() {

    if (
        window.innerWidth > 768
    ) return;

    const slider =
        document.getElementById(
            "testimonialSlider"
        );

    if (!slider) return;

    const cards =
        slider.querySelectorAll(
            ".testimonial-card"
        );

    let current = 0;

    cards.forEach(
        (card, index) => {

            if (
                index !== 0
            ) {

                card.style.display =
                    "none";

            }

        }
    );

    setInterval(() => {

        cards[current].style.display =
            "none";

        current++;

        if (
            current >= cards.length
        ) {

            current = 0;

        }

        cards[current].style.display =
            "block";

    }, 4000);

}

initTestimonials();

/* ==========================================
   OVERLAY CLICK
========================================== */

if (overlay) {

    overlay.addEventListener(
        "click",
        () => {

            closeModal();
            closeCart();
            closeCheckout();

        }
    );

}

/* ==========================================
   ESC KEY
========================================== */

document.addEventListener(
    "keydown",
    e => {

        if (
            e.key === "Escape"
        ) {

            closeModal();
            closeCart();
            closeCheckout();

        }

    }
);

/* ==========================================
   BUTTON EVENTS
========================================== */

document
.getElementById("cartBtn")
?.addEventListener(
    "click",
    openCart
);

document
.getElementById("closeCart")
?.addEventListener(
    "click",
    closeCart
);

document
.getElementById("checkoutBtn")
?.addEventListener(
    "click",
    openCheckout
);

document
.getElementById("backToCartBtn")
?.addEventListener(
    "click",
    () => {

        closeCheckout();

        openCart();

    }
);

document
.getElementById("cancelCheckoutBtn")
?.addEventListener(
    "click",
    () => {

        if(
            confirm(
                "Are you sure you want to cancel checkout?"
            )
        ){

            closeCheckout();

        }

    }
);

/* ==========================================
   EXPORTS
========================================== */

window.openModal = openModal;
window.closeModal = closeModal;
window.openCart = openCart;
window.closeCart = closeCart;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.applyFilter = applyFilter;




/* ==========================================
   CHAT ASSISTANT
========================================== */

const chatToggle =
document.getElementById("chatToggle");

const chatBox =
document.getElementById("chatBox");

chatToggle.addEventListener(
"click",
() => {

    chatBox.classList.toggle(
        "active"
    );

});

document
.getElementById("sendChat")
.addEventListener(
"click",
sendMessage
);

function sendMessage(){

    const input =
    document.getElementById(
        "chatInput"
    );

    const text =
    input.value.trim();

    if(!text) return;

    const body =
    document.getElementById(
        "chatBody"
    );

    body.innerHTML +=

    `<div class="user-message">
        ${text}
    </div>`;

    let reply =
    "Please contact us on WhatsApp for detailed assistance.";

    const q =
    text.toLowerCase();

    if(q.includes("price")){

        reply =
        "Male mannequins start from ₹9,000 and Female mannequins from ₹9,500.";

    }

    if(q.includes("bulk")){

        reply =
        "Bulk orders above 10 units receive special pricing.";

    }

    if(q.includes("delivery")){

        reply =
        "We provide Pan India shipping.";

    }

    if(q.includes("gst")){

        reply =
        "GST invoices are available for all orders.";

    }

    body.innerHTML +=

    `<div class="bot-message">
        ${reply}
    </div>`;

    input.value = "";

    body.scrollTop =
    body.scrollHeight;

}


document
.getElementById(
    "closeCheckoutBtn"
)
?.addEventListener(
    "click",
    closeCheckout
);

document
.getElementById(
    "mobileWishlistBtn"
)
?.addEventListener(
    "click",
    openWishlist
);

document
.getElementById(
    "wishlistBtn"
)
?.addEventListener(
    "click",
    openWishlist
);

document
.getElementById(
    "closeWishlist"
)
?.addEventListener(
    "click",
    closeWishlist
);