exports.handler = async (event) => {
    return {
        statusCode: 200,
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            CUSTOMER_JWT_SECRET: process.env.CUSTOMER_JWT_SECRET || 'Not Found',
            FIREBASE_DB_SECRET: process.env.FIREBASE_DB_SECRET || 'Not Found',
            RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'Not Found',
            RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'Not Found'
        }, null, 2)
    };
};
