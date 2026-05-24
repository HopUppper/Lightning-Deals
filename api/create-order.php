<?php
// =========================================================================
//   SECURE ORDER CREATION ENDPOINT (POST)
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

if (!$input || empty($input['amount']) || empty($input['receipt'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input parameters. Amount and receipt are required.']);
    exit;
}

$amount = intval($input['amount']); // Amount in Paise (e.g. ₹500 = 50000 paise)
$receipt = preg_replace('/[^A-Za-z0-9_\-]/', '', $input['receipt']); // Clean alphanumeric receipt string

// If placeholders are still present, block the request with a helpful error
if (RAZORPAY_KEY_ID === 'rzp_test_YOUR_KEY_ID' || RAZORPAY_KEY_SECRET === 'YOUR_KEY_SECRET') {
    http_response_code(500);
    echo json_encode([
        'error' => 'Razorpay Gateway is not fully configured yet.',
        'details' => 'Please open api/config.php and add your real Razorpay Key ID and Key Secret.'
    ]);
    exit;
}

// Assemble data parameters for Razorpay
$data = [
    'amount' => $amount,
    'currency' => 'INR',
    'receipt' => $receipt,
    'payment_capture' => 1 // Auto-capture checkout payments
];

$payload = json_encode($data);

// Initiate cURL request to Razorpay
$ch = curl_init('https://api.razorpay.com/v1/orders');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ":" . RAZORPAY_KEY_SECRET);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($payload)
]);

$response = curl_exec($ch);
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Server cURL Failure: ' . $curl_error]);
    exit;
}

if ($http_status !== 200) {
    http_response_code($http_status);
    echo json_encode([
        'error' => 'Razorpay API rejected order creation (Status ' . $http_status . ')',
        'details' => json_decode($response, true)
    ]);
    exit;
}

// Relay Razorpay's generated order details back to client
echo $response;
