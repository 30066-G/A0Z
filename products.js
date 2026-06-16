import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { db } from "./firebase.js";

const productsGrid = document.getElementById("productsGrid");
let products = [];
window.products = products;

onValue(ref(db, "products"), snapshot => {
    const data = snapshot.val();
    if (!data) {
        productsGrid.innerHTML = `<div class="loading-card">Geen producten gevonden</div>`;
        return;
    }


    products = Object.entries(data).map(([id, product]) => ({
        id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        image: product.image,
        category: product.category || 'uncategorized' 
    }));

    window.products = products;
    renderProducts();
});


function renderProducts(filter = 'all') {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";

    products.forEach(product => {

        if (filter !== 'all' && product.category !== filter) return;

        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">€${product.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${product.id}">Toevoegen</button>
            </div>
        </div>
        `;
        productsGrid.appendChild(card);
    });

    activateButtons();
}


window.filterProducts = renderProducts;

function activateButtons() {
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            const product = products.find(p => p.id === id);
            if (!product) return;
            if (window.addToCart) {
                window.addToCart(product);
            }
        });
    });
}
