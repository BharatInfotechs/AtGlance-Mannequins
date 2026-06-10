

/* ==========================================
   ATGLANCE MANNEQUINS
   CART + WISHLIST + LOCAL STORAGE
========================================== */

const STORAGE_KEYS = {
    CART: "atglance_cart",
    WISHLIST: "atglance_wishlist"
};

/* ==========================================
   STATE
========================================== */

let cart =
    JSON.parse(
        localStorage.getItem(
            STORAGE_KEYS.CART
        )
    ) || [];

let wishlist =
    JSON.parse(
        localStorage.getItem(
            STORAGE_KEYS.WISHLIST
        )
    ) || [];

/* ==========================================
   SAVE FUNCTIONS
========================================== */

function saveCart() {

    localStorage.setItem(
        STORAGE_KEYS.CART,
        JSON.stringify(cart)
    );

}

function saveWishlist() {

    localStorage.setItem(
        STORAGE_KEYS.WISHLIST,
        JSON.stringify(wishlist)
    );

}

/* ==========================================
   PRODUCT HELPERS
========================================== */

function getProduct(productId) {

    return products.find(
        product =>
        product.id === productId
    );

}

/* ==========================================
   CART FUNCTIONS
========================================== */

function addToCart(productId, qty = 1) {

    const existingItem =
        cart.find(
            item =>
            item.id === productId
        );

    if (existingItem) {

        existingItem.qty += qty;

    } else {

        cart.push({
            id: productId,
            qty
        });

    }

    saveCart();

    renderCart();
    updateCartBadge();

    showToast(
        "Product added to cart"
    );

}

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
            item.id !== productId
        );

    saveCart();

    renderCart();
    updateCartBadge();

}

function updateQty(
    productId,
    delta
) {

    const item =
        cart.find(
            item =>
            item.id === productId
        );

    if (!item) return;

    item.qty += delta;

    if (item.qty <= 0) {

        removeFromCart(productId);
        return;

    }

    saveCart();

    renderCart();
    updateCartBadge();

}

function clearCart() {

    cart = [];

    saveCart();

    renderCart();
    updateCartBadge();

}

/* ==========================================
   TOTALS
========================================== */

function getCartTotal() {

    let total = 0;

    cart.forEach(item => {

        const product =
            getProduct(item.id);

        if (product) {

            total +=
                product.price *
                item.qty;

        }

    });

    return total;

}

function getCartCount() {

    let count = 0;

    cart.forEach(item => {

        count += item.qty;

    });

    return count;

}

/* ==========================================
   CART RENDER
========================================== */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const totalElement =
        document.getElementById(
            "cartTotal"
        );

    if (!container) return;

    if (!cart.length) {

        container.innerHTML = `

        <div class="empty-cart">

            <h3>
                Your Cart Is Empty
            </h3>

            <p>
                Start shopping to add
                products.
            </p>

            <a href="#shop"
               class="btn btn-primary">

                Start Shopping

            </a>

        </div>

        `;

        if (totalElement) {

            totalElement.innerText =
                "₹0";

        }

        return;

    }

    container.innerHTML =
        cart.map(item => {

            const product =
                getProduct(item.id);

            if (!product) return "";

            return `

            <div class="cart-item">

                <img
                    src="${product.image}"
                    alt="${product.name}">

                <div class="cart-item-info">

                    <h4>
                        ${product.name}
                    </h4>

                    <p>
                        ₹${product.price.toLocaleString("en-IN")}
                    </p>

                    <div class="qty-controls">

                        <button
                        onclick="updateQty(${product.id},-1)">
                        -
                        </button>

                        <span>
                        ${item.qty}
                        </span>

                        <button
                        onclick="updateQty(${product.id},1)">
                        +
                        </button>

                    </div>

                </div>

                <button
                class="remove-item"
                onclick="removeFromCart(${product.id})">

                    ×

                </button>

            </div>

            `;

        }).join("");

    if (totalElement) {

        totalElement.innerText =
            "₹" +
            getCartTotal()
            .toLocaleString("en-IN");

    }

    updateCheckoutSummary();

}

/* ==========================================
   CHECKOUT SUMMARY
========================================== */

function updateCheckoutSummary() {

    const summary =
        document.getElementById(
            "checkoutSummary"
        );

    if (!summary) return;

    if (!cart.length) {

        summary.innerHTML = `
            <p>
                No items in cart.
            </p>
        `;

        return;

    }

    summary.innerHTML = "";

    cart.forEach(item => {

        const product =
            getProduct(item.id);

        if (!product) return;

        summary.innerHTML += `

        <div class="checkout-summary-item">

            <span>
                ${product.name}
                × ${item.qty}
            </span>

            <strong>
                ₹${(
                    product.price *
                    item.qty
                ).toLocaleString("en-IN")}
            </strong>

        </div>

        `;

    });

    summary.innerHTML += `

    <hr>

    <div class="checkout-summary-item">

        <span>Subtotal</span>

        <strong>
            ₹${getCartTotal()
                .toLocaleString("en-IN")}
        </strong>

    </div>

    <div class="checkout-summary-item">

        <span>Shipping</span>

        <span>
            Calculated on confirmation
        </span>

    </div>

    <div class="checkout-summary-item">

        <span>GST</span>

        <span>
            Included / Applicable
        </span>

    </div>

    `;

}

/* ==========================================
   BADGES
========================================== */

function updateCartBadge() {

    const badge =
        document.getElementById(
            "cartCount"
        );

    if (!badge) return;

    badge.innerText =
        getCartCount();
    const mobileCartCount =
        document.getElementById(
            "mobileCartCount"
        );

    if (mobileCartCount) {

        mobileCartCount.textContent =
            cart.reduce(
                (sum, item) =>
                    sum + item.qty,
                0
);

}

}

function updateWishlistBadge() {

    const badge =
        document.getElementById(
            "wishlistCount"
        );

    if (!badge) return;

    badge.innerText =
        wishlist.length;

}

const mobileWishlistCount =
document.getElementById(
    "mobileWishlistCount"
);

if(mobileWishlistCount){

    mobileWishlistCount.textContent =
    wishlist.length;

}

/* ==========================================
   WISHLIST
========================================== */

function toggleWishlist(
    productId
) {

    const exists =
        wishlist.includes(
            productId
        );

    if (exists) {

        wishlist =
            wishlist.filter(
                id =>
                id !== productId
            );

        showToast(
            "Removed from wishlist"
        );

    } else {

        wishlist.push(
            productId
        );

        showToast(
            "Added to wishlist"
        );

    }

    saveWishlist();

    updateWishlistBadge();

    refreshWishlistIcons();

    renderWishlist();

}

function refreshWishlistIcons() {

    document
        .querySelectorAll(
            ".wishlist-btn"
        )
        .forEach(btn => {

            const onclick =
                btn.getAttribute(
                    "onclick"
                );

            const match =
                onclick.match(
                    /\d+/
                );

            if (!match) return;

            const productId =
                parseInt(
                    match[0]
                );

            if (
                wishlist.includes(
                    productId
                )
            ) {

                btn.classList.add(
                    "active"
                );

            } else {

                btn.classList.remove(
                    "active"
                );

            }

        });

}

    

function addWishlistToCart(id){

    addToCart(id,1);

    wishlist =
    wishlist.filter(
        item => item !== id
    );

    saveWishlist();

    updateWishlistBadge();

    refreshWishlistIcons();

    renderWishlist();

    showToast(
        "Moved to cart"
    );

}

function renderWishlist(){

    const container =
    document.getElementById(
        "wishlistItems"
    );

    if(!container) return;

    if(!wishlist.length){

        container.innerHTML = `

        <div class="empty-cart">

            <h3>
                Wishlist Empty
            </h3>

        </div>

        `;

        return;

    }

    container.innerHTML =
    wishlist.map(id=>{

        const product =
        getProduct(id);

        if(!product) return "";

        return `

        <div class="wishlist-item">

            <img
            src="${product.image}">

            <div>

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button
                onclick="addWishlistToCart(${product.id})">

                    Move To Cart

                </button>

                <button
                onclick="toggleWishlist(${product.id})">

                    Remove

                </button>

            </div>

        </div>

        `;

    }).join("");

}



/* ==========================================
   TOAST
========================================== */

function showToast(message) {

    let toast =
        document.getElementById(
            "toast"
        );

    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id = "toast";

        toast.style.cssText = `
            position:fixed;
            bottom:30px;
            right:30px;
            background:#c9a84c;
            color:#000;
            padding:15px 20px;
            border-radius:8px;
            z-index:9999;
            font-weight:600;
        `;

        document.body.appendChild(
            toast
        );

    }

    toast.innerText =
        message;

    toast.style.display =
        "block";

    setTimeout(() => {

        toast.style.display =
            "none";

    }, 2500);

}

/* ==========================================
   INIT
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCart();

        updateCartBadge();

        updateWishlistBadge();

        renderWishlist();

        refreshWishlistIcons();

    }
);

/* ==========================================
   EXPORTS
========================================== */

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.getCartTotal = getCartTotal;
window.clearCart = clearCart;
window.toggleWishlist = toggleWishlist;
window.renderCart = renderCart;
window.updateCheckoutSummary =
    updateCheckoutSummary;
window.addWishlistToCart =
    addWishlistToCart;