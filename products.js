// ===================================
// NL.TEAM PRODUCTS
// ===================================
// مؤقتاً بيانات محلية
// لاحقاً سنجلبها من Firebase
const products = [
    {
        id: 1,
        name: "Snack Box",
        description: "Verse snacks voor snelle levering.",
        price: 5.00,
        image: "https://picsum.photos/600/400?random=1"
    },
    {
        id: 2,
        name: "Premium Box",
        description: "Meer snacks en premium selectie.",
        price: 10.00,
        image: "https://picsum.photos/600/400?random=2"
    },
    {
        id: 3,
        name: "Family Box",
        description: "Perfect voor familie en vrienden.",
        price: 15.00,
        image: "https://picsum.photos/600/400?random=3"
    }
];
// نجعلها متاحة لباقي الملفات
window.products = products;
const productsGrid =
    document.getElementById("productsGrid");
function renderProducts() {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >
            <div class="product-content">
                <h3 class="product-title">
                    ${product.name}
                </h3>
                <p class="product-description">
                    ${product.description}
                </p>
                <div class="product-footer">
                    <span class="product-price">
                        €${product.price.toFixed(2)}
                    </span>
                    <button
                        class="add-to-cart"
                        data-id="${product.id}"
                    >
                        Toevoegen
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
    activateButtons();
}
function activateButtons() {
    const buttons =
        document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const id =
                Number(button.dataset.id);
            const product =
                products.find(
                    p => p.id === id
                );
            if (!product) return;
            if (window.addToCart) {
                window.addToCart(product);
            } else {
                console.log(
                    "Cart system not loaded yet"
                );
            }
        });
    });
}
renderProducts();