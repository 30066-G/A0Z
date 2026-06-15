// ===================================
// NL.TEAM CHECKOUT
// ===================================
const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );
const checkoutModal =
    document.getElementById(
        "checkoutModal"
    );
const closeCheckout =
    document.getElementById(
        "closeCheckout"
    );
const placeOrderButton =
    document.getElementById(
        "placeOrderButton"
    );
const successScreen =
    document.getElementById(
        "successScreen"
    );
const orderNumber =
    document.getElementById(
        "orderNumber"
    );
// ===================================
// OPEN CHECKOUT
// ===================================
checkoutButton?.addEventListener(
    "click",
    () => {
        const items =
            window.getCartItems();
        if (!items.length) {
            alert(
                "Je winkelwagen is leeg."
            );
            return;
        }
        checkoutModal.classList.add(
            "active"
        );
    }
);
// ===================================
// CLOSE CHECKOUT
// ===================================
closeCheckout?.addEventListener(
    "click",
    () => {
        checkoutModal.classList.remove(
            "active"
        );
    }
);
// ===================================
// STEPS
// ===================================
const nextButtons =
    document.querySelectorAll(
        ".next-step"
    );
nextButtons.forEach(button => {
    button.addEventListener(
        "click",
        () => {
            const next =
                button.dataset.next;
            goToStep(next);
        }
    );
});
function goToStep(stepId) {
    document
        .querySelectorAll(
            ".checkout-step"
        )
        .forEach(step => {
            step.classList.remove(
                "active-step"
            );
        });
    document
        .getElementById(stepId)
        ?.classList.add(
            "active-step"
        );
}
// ===================================
// VALIDATION
// ===================================
function validateCustomerData() {
    const customerName =
        document.getElementById(
            "customerName"
        ).value.trim();
    const customerPhone =
        document.getElementById(
            "customerPhone"
        ).value.trim();
    if (
        !customerName ||
        !customerPhone
    ) {
        alert(
            "Vul alle gegevens in."
        );
        return false;
    }
    return true;
}
function validateAddress() {
    const street =
        document.getElementById(
            "street"
        ).value.trim();
    const houseNumber =
        document.getElementById(
            "houseNumber"
        ).value.trim();
    const postcode =
        document.getElementById(
            "postcode"
        ).value.trim();
    const city =
        document.getElementById(
            "city"
        ).value.trim();
    if (
        !street ||
        !houseNumber ||
        !postcode ||
        !city
    ) {
        alert(
            "Vul je adres volledig in."
        );
        return false;
    }
    return true;
}
// ===================================
// INTERCEPT STEP BUTTONS
// ===================================
document
    .querySelector(
        '[data-next="step2"]'
    )
    ?.addEventListener(
        "click",
        (e) => {
            if (
                !validateCustomerData()
            ) {
                e.preventDefault();
                return;
            }
        }
    );
document
    .querySelector(
        '[data-next="step3"]'
    )
    ?.addEventListener(
        "click",
        (e) => {
            if (
                !validateAddress()
            ) {
                e.preventDefault();
                return;
            }
        }
    );
// ===================================
// ORDER NUMBER
// ===================================
function generateOrderNumber() {
    const random =
        Math.floor(
            100000 +
            Math.random() * 900000
        );
    return `NL-${random}`;
}
// ===================================
// PLACE ORDER
// ===================================
placeOrderButton?.addEventListener(
    "click",
    async () => {
        const items =
            window.getCartItems();
        if (!items.length) {
            alert(
                "Geen producten gevonden."
            );
            return;
        }
        placeOrderButton.disabled =
            true;
        placeOrderButton.innerText =
            "Verwerken...";
        try {
            // ===================================
            // HIER KOMT LATER:
            // MOLLIE / iDEAL
            // FIREBASE SAVE
            // ===================================
            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        1500
                    )
            );
            const orderId =
                generateOrderNumber();
            orderNumber.innerHTML =
                `
                Bestelnummer:
                <br>
                <strong>${orderId}</strong>
                `;
            checkoutModal.classList.remove(
                "active"
            );
            successScreen.classList.add(
                "active"
            );
        } catch (error) {
            console.error(error);
            alert(
                "Er ging iets mis."
            );
        } finally {
            placeOrderButton.disabled =
                false;
            placeOrderButton.innerText =
                "Betaal met iDEAL";
        }
    }
);
const aboutButton =
    document.getElementById("aboutButton");

const aboutModal =
    document.getElementById("aboutModal");

const closeAbout =
    document.getElementById("closeAbout");

aboutButton?.addEventListener(
    "click",
    () => {

        aboutModal.classList.add(
            "active"
        );

    }
);

closeAbout?.addEventListener(
    "click",
    () => {

        aboutModal.classList.remove(
            "active"
        );

    }
);