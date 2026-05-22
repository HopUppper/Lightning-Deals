/* ==========================================================================
   LIGHTNING DEALS - DATABASE CONFIGURATION
   ========================================================================== */

// Replace these placeholders with your actual Firebase project settings.
// You can get these settings by registering a Web App in your Firebase console.
const FIREBASE_CONFIG = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
