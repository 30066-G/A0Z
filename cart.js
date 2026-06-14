// ===================================
// NL.TEAM CART SYSTEM
// ===================================
const cart = [];
const DELIVERY_FEE = 2.50;
// عناصر الصفحة
const cartSidebar =
    document.getElementById("cartSidebar");
const cartButton =
    document.getElementById("cartButton");
const closeCart =
    document.getElementById("closeCart");
const overlay =
    document.getElementById("overlay");
const cartItems =
    document.getElementById("cartItems");
const cartCount =
    document.getElementById("cartCount");
const subtotalPrice =
    document.getElementById("subtotalPrice");
const totalPrice =
    document.getElementById("totalPrice");
// ===================================
// OPEN / CLOSE CART
// ===================================
function openCart() {
    cartSidebar.classList.add("open");
    overlay.classList.add("active");
}
function closeCartSidebar() {
    cartSidebar.classList.remove("open");
    overlay.classList.remove("active");
}
cartButton?.addEventListener(
    "click",
    openCart
);
closeCart?.addEventListener(
    "click",
    closeCartSidebar
);
overlay?.addEventListener(
    "click",
    closeCartSidebar
);
// ===================================
// ADD PRODUCT
// ===================================
window.addToCart = function(product) {
    const existingItem = cart.find(
        item => item.id === product.id
    );
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    renderCart();
    openCart();
};
// ===================================
// CHANGE QUANTITY
// ===================================
function increaseQuantity(id) {
    const item = cart.find(
        p => p.id === id
    );
    if (!item) return;
    item.quantity++;
    renderCart();
}
function decreaseQuantity(id) {
    const item = cart.find(
        p => p.id === id
    );
    if (!item) return;
    item.quantity--;
    if (item.quantity <= 0) {
        const index =
            cart.findIndex(
                p => p.id === id
            );
        cart.splice(index, 1);
    }
    renderCart();
}
// ===================================
// TOTALS
// ===================================
function calculateSubtotal() {
    return cart.reduce(
        (total, item) => {
            return (
                total +
                item.price *
                item.quantity
            );
        },
        0
    );
}
function calculateTotal() {
    if (cart.length === 0) {
        return 0;
    }
    return (
        calculateSubtotal() +
        DELIVERY_FEE
    );
}
// ===================================
// RENDER CART
// ===================================
function renderCart() {
    if (!cartItems) return;
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">
                    🛒
                </div>
                <p>
                    Je winkelwagen is leeg
                </p>
            </div>
        `;
    } else {
        cartItems.innerHTML = "";
        cart.forEach(item => {
            const element =
                document.createElement("div");
            element.classList.add(
                "cart-item"
            );
            element.innerHTML = `
                <div class="cart-item-top">
                    <div>
                        <div class="cart-item-title">
                            ${item.name}
                        </div>
                        <div class="cart-item-price">
                            €${item.price.toFixed(2)}
                        </div>
                    </div>
                </div>
                <div class="quantity-controls">
                    <button
                        class="qty-btn decrease-btn"
                        data-id="${item.id}"
                    >
                        -
                    </button>
                    <span>
                        ${item.quantity}
                    </span>
                    <button
                        class="qty-btn increase-btn"
                        data-id="${item.id}"
                    >
                        +
                    </button>
                </div>
            `;
            cartItems.appendChild(
                element
            );
        });
    }
    updateTotals();
    activateQuantityButtons();
}
// ===================================
// BUTTONS
// ===================================
function activateQuantityButtons() {
    const plusButtons =
        document.querySelectorAll(
            ".increase-btn"
        );
    const minusButtons =
        document.querySelectorAll(
            ".decrease-btn"
        );
    plusButtons.forEach(button => {
        button.addEventListener(
            "click",
            () => {
                increaseQuantity(
                    Number(
                        button.dataset.id
                    )
                );
            }
        );
    });
    minusButtons.forEach(button => {
        button.addEventListener(
            "click",
            () => {
                decreaseQuantity(
                    Number(
                        button.dataset.id
                    )
                );
            }
        );
    });
}
// ===================================
// UPDATE TOTALS
// ===================================
function updateTotals() {
    const itemCount = cart.reduce(
        (total, item) => {
            return (
                total +
                item.quantity
            );
        },
        0
    );
    cartCount.textContent =
        itemCount;
    subtotalPrice.textContent =
        `€${calculateSubtotal()
            .toFixed(2)}`;
    totalPrice.textContent =
        `€${calculateTotal()
            .toFixed(2)}`;
}
// ===================================
// EXPORTS
// ===================================
window.cart = cart;
window.getCartTotal =
    calculateTotal;
window.getCartItems =
    () => cart;
// ===================================
// INITIALIZE
// ===================================
renderCart();