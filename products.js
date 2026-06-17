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

        const pCategory = (product.category || 'uncategorized').toLowerCase();
        const fCategory = filter.toLowerCase();

        if (filter !== 'all' && pCategory !== fCategory) return;

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

    document.querySelectorAll('.filter-btn').forEach(btn => {
        const btnFilter = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
        btn.style.backgroundColor = (btnFilter.toLowerCase() === filter.toLowerCase()) ? '#d4af37' : 'transparent';
        btn.style.color = (btnFilter.toLowerCase() === filter.toLowerCase()) ? '#000' : '#fff';
    });

    activateButtons();
}

window.filterProducts = renderProducts;

function activateButtons() {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            console.log("CLICKED");

            const id = button.dataset.id;

            const product = products.find(
                p => p.id === id
            );

            console.log("PRODUCT:", product);
            console.log("ADDTOCART:", window.addToCart);

            if (!product) return;

            if (window.addToCart) {
                window.addToCart(product);
            }

        });

    });
}