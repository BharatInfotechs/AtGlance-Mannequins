/* ==========================================
   ATGLANCE MANNEQUINS
   PRODUCTS DATA + RENDERING
========================================== */

const products = [

    {
        id: 1,
        name: "Classic Male White",
        category: "male",
        finish: "Matte White",
        material: "Fibreglass",
        price: 9000,
        badge: "Best Seller",
        dimensions: '6ft | Base: 12"',
        description: "Elegant upright pose ideal for fashion retail displays.",
        image: "images/white-male.png"
    },

    {
        id: 2,
        name: "Classic Male Silver",
        category: "male",
        finish: "Silver Chrome",
        material: "Fibreglass",
        price: 12000,
        badge: "Premium",
        dimensions: '6ft | Base: 12"',
        description: "Luxury silver finish for premium store displays.",
        image: "images/silver-male.png"

    },

    {
        id: 3,
        name: "Classic Male Golden",
        category: "male",
        finish: "Golden Chrome",
        material: "Fibreglass",
        price: 15000,
        badge: "Trending",
        dimensions: '6ft | Base: 12"',
        description: "Gold chrome display mannequin for luxury collections.",
        image: "images/golden-male.png"
    },

    {
        id: 4,
        name: "Classic Male Black",
        category: "male",
        finish: "Matte Black",
        material: "Fibreglass",
        price: 11500,
        badge: "Premium",
        dimensions: '6ft | Base: 12"',
        description: "Elegant black mannequin with luxury matte finish.",
        image: "images/black-male.png"

    },

    {
        id: 5,
        name: "Female White Display",
        category: "female",
        finish: "White Gloss",
        material: "Fibreglass",
        price: 9500,
        badge: "Best Seller",
        dimensions: '5.8ft | Base: 10"',
        description: "Perfect female display mannequin for boutiques.",
        image: "images/white-female.png"

    },

    {
        id: 6,
        name: "Female Silver Display",
        category: "female",
        finish: "Silver Chrome",
        material: "Fibreglass",
        price: 12500,
        badge: "New",
        dimensions: '5.8ft | Base: 10"',
        description: "Modern silver finish for premium retail stores.",
        image: "images/silver-female.png"
    },

    {
        id: 7,
        name: "Female Golden Display",
        category: "female",
        finish: "Golden Chrome",
        material: "Fibreglass",
        price: 15500,
        badge: "Trending",
        dimensions: '5.8ft | Base: 10"',
        description: "Golden luxury mannequin designed for window displays.",
        image: "images/golden-female.png"

    },

    {
        id: 8,
        name: "Female Black Display",
        category: "female",
        finish: "Matte Black",
        material: "Fibreglass",
        price: 13000,
        badge: "Premium",
        dimensions: '5.8ft | Base: 10"',
        description: "Luxury matte black female mannequin.",
        image: "images/black-female.png"

    },

    {
        id: 9,
        name: "Child Neutral Pose",
        category: "child",
        finish: "White Matte",
        material: "Fibreglass",
        price: 9500,
        badge: "Popular",
        dimensions: '3.5ft',
        description: "Child mannequin suitable for kids fashion stores.",
        image: "images/child-white.png"

    },

    {
        id: 10,
        name: "Female Half Body Bust",
        category: "half-body",
        finish: "Fabric Covered",
        material: "Foam + Fabric",
        price: 5500,
        badge: "",
        dimensions: '2ft Torso',
        description: "Perfect for jewelry, tops and accessories.",
        image: "images/half-bust-female.png"

    },

    {
        id: 11,
        name: "Abstract Headless",
        category: "abstract",
        finish: "Rose Gold",
        material: "Fibreglass",
        price: 13000,
        badge: "Trending",
        dimensions: '5.7ft',
        description: "Luxury abstract mannequin with modern aesthetics.",
        image: "images/rose-gold-abstract.png"

    },

    {
        id: 12,
        name: "Premium Abstract Black",
        category: "abstract",
        finish: "Black Matte",
        material: "Fibreglass",
        price: 16500,
        badge: "Premium",
        dimensions: '5.7ft',
        description: "Elegant headless mannequin for luxury brands.",
        image: "images/Premium-abstract-black.png"
    }

];

/* ==========================================
   CATEGORY DATA
========================================== */

const categories = [

    {
        title: "Male Mannequins",
        slug: "male",
        image: "https://placehold.co/500x500/111111/c9a84c?text=Male"
    },

    {
        title: "Female Mannequins",
        slug: "female",
        image: "https://placehold.co/500x500/111111/c9a84c?text=Female"
    },

    {
        title: "Child Mannequins",
        slug: "child",
        image: "https://placehold.co/500x500/111111/c9a84c?text=Child"
    },

    {
        title: "Half Body / Busts",
        slug: "half-body",
        image: "https://placehold.co/500x500/111111/c9a84c?text=Bust"
    },

    {
        title: "Abstract / Headless",
        slug: "abstract",
        image: "https://placehold.co/500x500/111111/c9a84c?text=Abstract"
    }

];

/* ==========================================
   RENDER CATEGORIES
========================================== */

function renderCategories() {

    const container =
        document.getElementById("categoryGrid");

    if (!container) return;

    container.innerHTML =
        categories.map(category => `

        <div class="category-card"
            data-category="${category.slug}">

            <img src="${category.image}"
                alt="${category.title}">

            <div class="category-content">

                <h3>${category.title}</h3>

            </div>

        </div>

    `).join("");

}

/* ==========================================
   PRODUCT CARD TEMPLATE
========================================== */

function productTemplate(product) {

    return `

    <div class="product-card">

        <div class="product-image">

            <img src="${product.image}"
                alt="${product.name}">

            ${product.badge
                ? `<span class="product-badge">${product.badge}</span>`
                : ""
            }

            <div class="product-overlay">

                <button
                    class="quick-view-btn"
                    onclick="openModal(${product.id})">

                    Quick View

                </button>

            </div>

        </div>

        <div class="product-info">

            <h3 class="product-title">
                ${product.name}
            </h3>

            <p class="product-spec">
                ${product.material}
                •
                ${product.finish}
            </p>

            <div class="product-rating">

                ★★★★★

            </div>

            <div class="product-price">

                ₹${product.price.toLocaleString("en-IN")}

            </div>

            <div class="product-actions">

                <button
                    class="wishlist-btn"
                    onclick="toggleWishlist(${product.id})">

                    <i class="fa-regular fa-heart"></i>

                </button>

                <button
                    class="add-cart-btn"
                    onclick="addToCart(${product.id},1)">

                    Add To Cart

                </button>

            </div>

        </div>

    </div>

    `;

}

/* ==========================================
   RENDER PRODUCTS
========================================== */

function renderProducts(
    filter = "all",
    sort = "default",
    searchQuery = ""
) {

    const grid =
        document.getElementById("productsGrid");

    if (!grid) return;

    let filteredProducts =
        [...products];

    /* FILTER */

    if (filter !== "all") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                product.category === filter
            );

    }

    /* SEARCH */

    if (searchQuery.trim()) {

        const query =
            searchQuery.toLowerCase();

        filteredProducts =
            filteredProducts.filter(product =>

                product.name
                .toLowerCase()
                .includes(query)

                ||

                product.finish
                .toLowerCase()
                .includes(query)

                ||

                product.material
                .toLowerCase()
                .includes(query)

            );

    }

    /* SORT */

    switch (sort) {

        case "low":

            filteredProducts.sort(
                (a, b) =>
                a.price - b.price
            );

            break;

        case "high":

            filteredProducts.sort(
                (a, b) =>
                b.price - a.price
            );

            break;

        case "newest":

            filteredProducts.sort(
                (a, b) =>
                b.id - a.id
            );

            break;

    }

    /* EMPTY */

    if (!filteredProducts.length) {

        grid.innerHTML = `

        <div class="empty-state">

            <h3>
                No Products Found
            </h3>

        </div>

        `;

        return;

    }

    /* RENDER */

    grid.innerHTML =
        filteredProducts
        .map(productTemplate)
        .join("");

}

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCategories();
        renderProducts();

    }
);

/* ==========================================
   GLOBAL EXPORTS
========================================== */

window.products = products;
window.renderProducts = renderProducts;
window.renderCategories = renderCategories;