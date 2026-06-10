/* ==========================================
   ATGLANCE QUOTATION SYSTEM
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       PRICE MAP
    ========================== */

    const priceMap = {

        male: {
            white: 9000,
            silver: 12000,
            golden: 13500,
            black: 15000
        },

        female: {
            white: 9500,
            silver: 12500,
            golden: 13500,
            black: 15000
        },

        child: {
            white: 6500,
            silver: 7500,
            golden: 8500,
            black: 9500
        },

        "half-body": {
            white: 4500,
            silver: 5500,
            golden: 6500,
            black: 7500
        },

        abstract: {
            white: 10000,
            silver: 11500,
            golden: 12500,
            black: 13500
        }

    };

    /* ==========================
       STEP WIZARD
    ========================== */

    const steps =
        document.querySelectorAll(
            ".quote-step"
        );

    const indicators =
        document.querySelectorAll(
            ".quote-progress .step"
        );

    let currentStep = 0;

    document
        .querySelectorAll(".next-btn")
        .forEach(btn => {

            btn.addEventListener(
                "click",
                () => {

                    if (
                        currentStep >=
                        steps.length - 1
                    ) return;

                    steps[currentStep]
                        .classList.remove(
                            "active"
                        );

                    indicators[currentStep]
                        .classList.remove(
                            "active"
                        );

                    currentStep++;

                    steps[currentStep]
                        .classList.add(
                            "active"
                        );

                    indicators[currentStep]
                        .classList.add(
                            "active"
                        );

                }
            );

        });

    /* ==========================
       PRICE ESTIMATION
    ========================== */

    function updateEstimate() {

        let total = 0;

        document
            .querySelectorAll(".product-item")
            .forEach(item => {

                const category =
                    item.querySelector(
                        ".product-category"
                    ).value;

                const finish =
                    item.querySelector(
                        ".product-finish"
                    ).value;

                const qty =
                    Number(
                        item.querySelector(
                            ".product-qty"
                        ).value
                    );

                const price =
                    priceMap?.[
                    category
                    ]?.[
                    finish
                    ] || 0;

                total +=
                    price * qty;

            });

        const estimate =
            document.getElementById(
                "estimatedPrice"
            );

        if (estimate) {

            estimate.innerHTML =

                `Estimated Total: ₹${total.toLocaleString("en-IN")}`;
            updateProforma(total);

        }

    }

    /* ==========================
       ADD PRODUCT
    ========================== */

    document
        .getElementById(
            "addProductBtn"
        )
        ?.addEventListener(
            "click",
            () => {

                const container =
                    document.getElementById(
                        "productContainer"
                    );

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "product-item";

                div.innerHTML = `

<select class="product-category">

<option value="male">Male</option>

<option value="female">Female</option>

<option value="child">Child</option>

<option value="half-body">Half Body</option>

<option value="abstract">Abstract</option>

</select>

<select class="product-finish">

<option value="white">White</option>

<option value="silver">Silver</option>

<option value="golden">Golden</option>

<option value="black">Black</option>

</select>

<input
type="number"
class="product-qty"
value="1"
min="1">

<button
type="button"
class="remove-product">

✕

</button>
`;

                container.appendChild(
                    div
                );


                updateEstimate();



                function updateProforma(total) {

                    const container =
                        document.getElementById(
                            "proformaContent"
                        );

                    if (!container) return;

                    let html = "";

                    document
                        .querySelectorAll(".product-item")
                        .forEach(item => {

                            const category =
                                item.querySelector(
                                    ".product-category"
                                ).value;

                            const finish =
                                item.querySelector(
                                    ".product-finish"
                                ).value;

                            const qty =
                                item.querySelector(
                                    ".product-qty"
                                ).value;

                            const price =
                                priceMap?.[
                                category
                                ]?.[
                                finish
                                ] || 0;

                            const amount =
                                price * qty;

                            html += `

<div class="proforma-item">

<div>
${category.toUpperCase()}
MANNEQUIN
(${finish})
</div>

<div>
Qty: ${qty}
</div>

<div>
₹${price.toLocaleString("en-IN")}
</div>

<div>
₹${amount.toLocaleString("en-IN")}
</div>

</div>
`;

                        });

                    container.innerHTML = html;

                    document.getElementById(
                        "proformaTotal"
                    ).innerText =
                        `₹${total.toLocaleString("en-IN")}`;

                }

            }
        );

    /* ==========================
       REMOVE PRODUCT
    ========================== */

    document.addEventListener(
        "click",
        function (e) {

            if (

                e.target.classList.contains(
                    "remove-product"
                )

            ) {

                e.target
                    .closest(
                        ".product-item"
                    )
                    .remove();

                updateEstimate();

            }

        }
    );

    /* ==========================
       LIVE UPDATE
    ========================== */

    document.addEventListener(
        "input",
        function (e) {

            if (

                e.target.classList.contains(
                    "product-category"
                ) ||

                e.target.classList.contains(
                    "product-finish"
                ) ||

                e.target.classList.contains(
                    "product-qty"
                )

            ) {

                updateEstimate();

            }

        }
    );


    updateEstimate();

});

/* ==========================
   FORM SUBMIT
========================== */


document
    .getElementById("quoteForm")
    ?.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const products = [];

            document
                .querySelectorAll(".product-item")
                .forEach(item => {

                    products.push({

                        category:
                            item.querySelector(
                                ".product-category"
                            ).value,

                        finish:
                            item.querySelector(
                                ".product-finish"
                            ).value,

                        qty:
                            item.querySelector(
                                ".product-qty"
                            ).value

                    });

                });

            const data = {

                name:
                    document.getElementById(
                        "quoteName"
                    ).value,

                phone:
                    document.getElementById(
                        "quotePhone"
                    ).value,

                business:
                    document.getElementById(
                        "quoteBusiness"
                    ).value,

                notes:
                    document.getElementById(
                        "quoteNotes"
                    ).value,

                products

            };
            let estimatedTotal = 0;

            const productDetails = data.products.map((p, i) => {

                const priceMap = {

                    male: {
                        white: 9000,
                        silver: 12000,
                        golden: 13500,
                        black: 15000
                    },

                    female: {
                        white: 9500,
                        silver: 12500,
                        golden: 13500,
                        black: 15000
                    },

                    child: {
                        white: 6500,
                        silver: 7500,
                        golden: 8500,
                        black: 9500
                    },

                    "half-body": {
                        white: 4500,
                        silver: 5500,
                        golden: 6500,
                        black: 7500
                    },

                    abstract: {
                        white: 10000,
                        silver: 11500,
                        golden: 12500,
                        black: 13500
                    }

                };

                const rate =
                    priceMap[p.category]?.[p.finish] || 0;

                const total =
                    rate * Number(p.qty);

                estimatedTotal += total;

                return `${i + 1}. ${p.category.toUpperCase()} MANNEQUIN

Finish: ${p.finish}

Quantity: ${p.qty}

Unit Price: ₹${rate.toLocaleString("en-IN")}

Amount: ₹${total.toLocaleString("en-IN")}`;

            }).join("\n\n");

            const message =

                `🏢 ATGLANCE MANNEQUINS

NEW CUSTOMER ENQUIRY

━━━━━━━━━━━━━━━━━━━━━━

👤 CUSTOMER DETAILS

Name:
${data.name}

Phone:
${data.phone}

Business:
${data.business || "N/A"}

━━━━━━━━━━━━━━━━━━━━━━

🛒 PRODUCT REQUIREMENTS

${productDetails}

━━━━━━━━━━━━━━━━━━━━━━

💰 ESTIMATED TOTAL

₹${estimatedTotal.toLocaleString("en-IN")}

━━━━━━━━━━━━━━━━━━━━━━

📝 CUSTOMER NOTES

${data.notes || "No Notes"}

━━━━━━━━━━━━━━━━━━━━━━

📍 AtGlance Mannequins
Near Nayara Petrol Pump,
Deva Road, Matiyari,
Lucknow, Uttar Pradesh - 226028`;

            window.open(
                `https://wa.me/918840751012?text=${encodeURIComponent(message)}`,
                "_blank"
            );
        }
    );