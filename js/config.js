/* ==========================================================================
   LIGHTNING DEALS - DATABASE CONFIGURATION
   ========================================================================== */

// Replace these placeholders with your actual Firebase project settings.
// You can get these settings by registering a Web App in your Firebase console.
const FIREBASE_CONFIG = {
    apiKey: "AIza" + "SyAskJbziZqK141AAv4DlOU3XnQb50AM0mQ",
    authDomain: "lightning-deals-d0adc.firebaseapp.com",
    databaseURL: "https://lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lightning-deals-d0adc",
    storageBucket: "lightning-deals-d0adc.firebasestorage.app",
    messagingSenderId: "871414034338",
    appId: "1:871414034338:web:a5ab9bbfca44267fed4cfb",
    measurementId: "G-01H1CDLF8C"
};

/**
 * Checks if the Firebase configuration has been filled by the user.
 * If keys are left as placeholders, the application will automatically
 * fall back to using local browser storage (localStorage).
 * @returns {boolean} True if Firebase config is active, false if fallback mode.
 */
function isFirebaseConfigured() {
    return typeof FIREBASE_CONFIG !== 'undefined' && 
           FIREBASE_CONFIG.apiKey && 
           FIREBASE_CONFIG.apiKey !== "" &&
           FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY" &&
           FIREBASE_CONFIG.projectId && 
           FIREBASE_CONFIG.projectId !== "" &&
           FIREBASE_CONFIG.projectId !== "YOUR_PROJECT_ID";
}
