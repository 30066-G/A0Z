import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getDatabase
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {

    apiKey: "AIzaSyDXIty5TGVNu37oLDYtWFjgA-pLcnqgEmU",
            authDomain: "nl-team.firebaseapp.com",
            projectId: "nl-team",
            databaseURL: "https://nl-team-default-rtdb.europe-west1.firebasedatabase.app",
            storageBucket: "nl-team.firebasestorage.app",
            messagingSenderId: "165944460560",
            appId: "1:165944460560:web:7435e881c6823413d3d195"
        };

const app =
    initializeApp(
        firebaseConfig
    );

export const db =
    getDatabase(app);