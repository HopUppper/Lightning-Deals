<?php
// =========================================================================
//   RAZORPAY PAYMENT GATEWAY SECURE CONFIGURATION
// =========================================================================

// --- PLACE YOUR SECURE KEYS HERE ---
// 1. Log into your Razorpay Dashboard (razorpay.com)
// 2. Switch to Test Mode (for testing) or Live Mode (for real payments)
// 3. Go to Account & Settings -> API Keys -> Generate Key
// 4. Copy and paste your Key ID and Key Secret below:

define('RAZORPAY_KEY_ID', 'rzp_live_ShEwZq0c7pipun'); // Put your Key ID here
define('RAZORPAY_KEY_SECRET', 'fg5k1n9Kzn2iJeP6lByW3GDT'); // Put your Key Secret here

// -------------------------------------------------------------------------
// Global PHP Server Environment Adjustments
// -------------------------------------------------------------------------
ini_set('display_errors', 0); // Hide raw errors from public view in production
error_reporting(E_ALL);

// Enable CORS so your frontend can communicate securely
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight CORS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
