import { db } from "./firebase.js"; 
import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const statusBar = document.querySelector(".status-bar span:last-child");
const statusDot = document.querySelector(".status-dot");

const ordersRef = ref(db, 'orders');

onValue(ordersRef, (snapshot) => {
    const orders = snapshot.val();
    
    const activeOrders = orders ? Object.keys(orders).length : 0;
    
    const hour = new Date().getHours();

    if (hour >= 21 || hour < 3) {
        
        if (activeOrders > 3) {
            statusDot.style.background = "#f59e0b";
            statusBar.innerText = `Online Nu • Druk (vertraging 25-40 min) • ${activeOrders} bestellingen`;
        } else {
            statusDot.style.background = "#22c55e";
            statusBar.innerText = "Online Nu • Gemiddelde levertijd: 17 min";
        }

    } else {
        statusDot.style.background = "#ef4444"; 
        statusBar.innerText = "Gesloten • Momenteel niet beschikbaar";
    }
});