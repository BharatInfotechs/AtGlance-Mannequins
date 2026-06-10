/* ==========================================
   ATGLANCE MANNEQUINS
   CHECKOUT + WHATSAPP INTEGRATION
========================================== */

/* ==========================================
   INDIAN STATES
========================================== */
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
        }

    };
const indianStates = [

    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",

    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"

];

/* ==========================================
   POPULATE STATES
========================================== */

function loadStates() {

    const select =
        document.getElementById(
            "stateSelect"
        );

    if (!select) return;

    select.innerHTML = `
        <option value="">
            Select State
        </option>
    `;

    indianStates.forEach(state => {

        select.innerHTML += `
            <option value="${state}">
                ${state}
            </option>
        `;

    });

}

/* ==========================================
   VALIDATION
========================================== */

function showFieldError(
    field,
    message
) {

    field.style.border =
        "1px solid #ff4d4d";

    field.focus();

    showToast(message);

}

function clearFieldError(field) {

    field.style.border =
        "";

}

function validateForm(formData) {

    const phoneRegex =
        /^[6-9]\d{9}$/;

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const pinRegex =
        /^\d{6}$/;

    const name =
        formData.get("name");

    const phone =
        formData.get("phone");

    const email =
        formData.get("email");

    const address =
        formData.get("address");

    const city =
        formData.get("city");

    const pincode =
        formData.get("pincode");

    if (!name.trim()) {

        showToast(
            "Enter Full Name"
        );

        return false;

    }

    if (
        !phoneRegex.test(phone)
    ) {

        showToast(
            "Enter valid 10 digit phone number"
        );

        return false;

    }

    if (
        !emailRegex.test(email)
    ) {

        showToast(
            "Enter valid email address"
        );

        return false;

    }

    if (!address.trim()) {

        showToast(
            "Enter address"
        );

        return false;

    }

    if (!city.trim()) {

        showToast(
            "Enter city"
        );

        return false;

    }

    if (
        !pinRegex.test(
            pincode
        )
    ) {

        showToast(
            "Enter valid 6 digit pincode"
        );

        return false;

    }

    return true;

}

/* ==========================================
   WHATSAPP MESSAGE
========================================== */

function buildWhatsAppMessage(
    formData,
    cartItems
) {

    let itemList = "";

    cartItems.forEach(item => {

        const product =
            products.find(
                p =>
                p.id === item.id
            );

        if (!product) return;

        itemList +=

`${product.name}
Qty: ${item.qty}
Price: ₹${product.price.toLocaleString("en-IN")}

`;

    });

    const message =

`Hi AtGlance Mannequins!

I'd like to place an order.

Name: ${formData.get("name")}
Business: ${formData.get("business") || "-"}

Phone: ${formData.get("phone")}
Email: ${formData.get("email")}

Address:
${formData.get("address")}

City: ${formData.get("city")}
State: ${document.getElementById("stateSelect").value}
Pincode: ${formData.get("pincode")}

--------------------------------

ORDER ITEMS

${itemList}

--------------------------------

TOTAL:
₹${getCartTotal().toLocaleString("en-IN")}

Notes:
${formData.get("notes") || "-"}

Thank You
`;

    return `https://wa.me/918188937077?text=${encodeURIComponent(message)}`;

}

/* ==========================================
   ORDER SUCCESS
========================================== */

function showSuccessMessage(name) {

    showToast(
        `Thank you ${name}! We'll contact you within 24 hours.`
    );

}

/* ==========================================
   CHECKOUT SUBMIT
========================================== */

function handleSubmit(e) {

    e.preventDefault();

    const form =
        e.target;

    const formData =
        new FormData(form);

    if (
        !validateForm(
            formData
        )
    ) {

        return;

    }

    if (
        !cart.length
    ) {

        showToast(
            "Cart is empty"
        );

        return;

    }

    const whatsappURL =
        buildWhatsAppMessage(
            formData,
            cart
        );

    showSuccessMessage(
        formData.get("name")
    );

    clearCart();

    form.reset();

    closeCheckout();

    setTimeout(() => {

        window.open(
            whatsappURL,
            "_blank"
        );

    }, 500);

}

/* ==========================================
   BULK ORDER FORM
========================================== */

function initBulkOrderForm() {

    const form =
        document.getElementById(
            "bulkOrderForm"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const fields =
                form.querySelectorAll(
                    "input"
                );

            const name =
                fields[0].value;

            const phone =
                fields[1].value;

            const type =
                fields[2].value;

            const qty =
                fields[3].value;

            const msg =

`Hi AtGlance Mannequins,

I need a bulk quotation.

Name: ${name}
Phone: ${phone}
Mannequin Type: ${type}
Quantity: ${qty}

Please share pricing and delivery details.`;

            window.open(

                `https://wa.me/918188937077?text=${encodeURIComponent(msg)}`,

                "_blank"

            );

        }
    );

}

/* ==========================================
   CONTACT FORM
========================================== */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const name =
                form.querySelector(
                    'input[type="text"]'
                ).value;

            const phone =
                form.querySelector(
                    'input[type="tel"]'
                ).value;

            const message =
                form.querySelector(
                    "textarea"
                ).value;

            const text =

`Hi AtGlance Mannequins,

Name: ${name}
Phone: ${phone}

Message:
${message}`;

            window.open(

                `https://wa.me/918188937077?text=${encodeURIComponent(text)}`,

                "_blank"

            );

            form.reset();

        }
    );

}

/* ==========================================
   CHECKOUT INIT
========================================== */

function initCheckout() {

    const checkoutForm =
        document.getElementById(
            "checkoutForm"
        );

    if (!checkoutForm) return;

    checkoutForm.addEventListener(
        "submit",
        handleSubmit
    );

}

/* ==========================================
   LOAD
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadStates();

        initCheckout();

        initBulkOrderForm();

        initContactForm();

    }
);



/* ==========================================
   EXPORTS
========================================== */

window.validateForm =
    validateForm;

window.showFieldError =
    showFieldError;

window.buildWhatsAppMessage =
    buildWhatsAppMessage;

window.handleSubmit =
    handleSubmit;





