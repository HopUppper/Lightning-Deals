<?php
// =========================================================================
//   SECURE PAYMENT VERIFICATION ENDPOINT (POST)
// =========================================================================
require_once 'config.php';

// Accept only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed. Only POST is supported.']);
    exit;
}

// Read raw JSON POST input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['razorpay_payment_id']) || empty($input['razorpay_order_id']) || empty($input['razorpay_signature'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid transaction details. Payment ID, Order ID, and Signature are required.']);
    exit;
}

$payment_id = $input['razorpay_payment_id'];
$order_id = $input['razorpay_order_id'];
$signature = $input['razorpay_signature'];

// If placeholders are still active, bypass or notify the user
if (RAZORPAY_KEY_ID === 'rzp_test_YOUR_KEY_ID' || RAZORPAY_KEY_SECRET === 'YOUR_KEY_SECRET') {
    http_response_code(500);
    echo json_encode([
        'error' => 'Razorpay Gateway is not fully configured yet.',
        'details' => 'Please configure your credentials in api/config.php.'
    ]);
    exit;
}

// Razorpay official signature verification algorithm:
// Expected Signature = HMAC-SHA256(order_id + "|" + payment_id, secret_key)
$data_to_hash = $order_id . "|" . $payment_id;
$generated_signature = hash_hmac('sha256', $data_to_hash, RAZORPAY_KEY_SECRET);

// Safe timing-attack-resistant string comparison (hash_equals)
if (hash_equals($generated_signature, $signature)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Payment verified successfully.'
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'error' => 'Signature verification failed. Mismatch detected.',
        'details' => 'The payment signature does not match. Ensure your Key Secret matches your dashboard configuration.'
    ]);
}
