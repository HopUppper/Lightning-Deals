const https = require('https');
const crypto = require('crypto');

// Helper to make HTTPS requests
function httpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-razorpay-signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed.' })
    };
  }

  try {
    const rawBody = event.body;
    const signature = event.headers['x-razorpay-signature'] || event.headers['X-Razorpay-Signature'];
    const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Cryptographic signature verification if secret is configured
    if (WEBHOOK_SECRET && signature) {
      const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
      hmac.update(rawBody);
      const generated = hmac.digest('hex');

      const signatureBuffer = Buffer.from(signature);
      const generatedBuffer = Buffer.from(generated);

      let isMatch = false;
      if (signatureBuffer.length === generatedBuffer.length) {
        isMatch = crypto.timingSafeEqual(signatureBuffer, generatedBuffer);
      }

      if (!isMatch) {
        console.error('Webhook signature mismatch.');
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Signature verification failed.' })
        };
      }
    }

    const payload = JSON.parse(rawBody);
    
    // We handle payment.captured and order.paid
    if (payload.event !== 'payment.captured' && payload.event !== 'order.paid') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Event ignored: ' + payload.event })
      };
    }

    const payment = payload.payload.payment.entity;
    const notes = payment.notes || {};

    // 1. Fetch current settings from Firebase to read dynamic credentials
    let settings = null;
    try {
      const settingsResult = await httpsRequest({
        hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
        port: 443,
        path: '/settings.json',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (settingsResult.statusCode === 200) {
        settings = JSON.parse(settingsResult.body);
      }
    } catch (e) {
      console.error('Failed to load settings from Firebase:', e);
    }

    // 1.2. Fetch secure settings from Firebase and merge them
    if (settings) {
      try {
        const secureSettingsResult = await httpsRequest({
          hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
          port: 443,
          path: '/secure_settings.json',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (secureSettingsResult.statusCode === 200) {
          const secureSettings = JSON.parse(secureSettingsResult.body);
          if (secureSettings) {
            settings = { ...settings, ...secureSettings };
          }
        }
      } catch (e) {
        console.error('Failed to load secure settings from Firebase:', e);
      }
    }

    // 1.5. Fetch current reseller templates from Firebase
    let templates = null;
    try {
      const templatesResult = await httpsRequest({
        hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
        port: 443,
        path: '/templates.json',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (templatesResult.statusCode === 200) {
        templates = JSON.parse(templatesResult.body);
      }
    } catch (e) {
      console.error('Failed to load templates from Firebase:', e);
    }

    // 2. Build the order object (with deterministic ID mapping based on payment ID to prevent duplicate creations)
    const orderId = "LD-PAY-" + payment.id;
    const amountVal = payment.amount ? (payment.amount / 100) : parseFloat(notes.subtotal || 0);

    // Duplicate protection check
    let existingOrder = null;
    try {
      const getExisting = await httpsRequest({
        hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
        port: 443,
        path: `/orders/${orderId}.json`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (getExisting.statusCode === 200 && getExisting.body && getExisting.body !== 'null') {
        existingOrder = JSON.parse(getExisting.body);
      }
    } catch (e) {
      console.error('Error checking duplicate order:', e);
    }

    if (existingOrder && (existingOrder.status === 'Paid' || existingOrder.status === 'Delivered')) {
      console.log(`Order ${orderId} has already been fulfilled. Skipping duplicate delivery.`);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Order already fulfilled.',
          orderId: orderId
        })
      };
    }

    const order = {
      id: orderId,
      product: notes.product_purchased || payment.description || "Premium Subscription Deal",
      plan: notes.plan_details || "Premium Plan",
      price: amountVal,
      subtotal: parseFloat(notes.subtotal || amountVal),
      discount: parseFloat(notes.discount || 0),
      coupon: notes.coupon || "",
      items: notes.items ? JSON.parse(notes.items) : [{
        productId: notes.product_purchased ? notes.product_purchased.toLowerCase().replace(/[^a-z0-9]/g, '-') : "custom",
        name: notes.product_purchased || payment.description || "Subscription Deal",
        planLabel: notes.plan_details || "Premium Plan",
        price: amountVal,
        qty: 1
      }],
      name: notes.customer_name || "Razorpay Customer",
      email: payment.email || notes.customer_email || "",
      phone: payment.contact || notes.customer_phone || "",
      utr: payment.id,
      screenshot: "razorpay_verified",
      date: new Date(payment.created_at * 1000).toLocaleString('en-IN') || new Date().toLocaleString('en-IN'),
      status: "Paid",
      razorpay_order_id: payment.order_id || "",
      razorpay_payment_id: payment.id
    };

    // 3. Save order record to Firebase Realtime Database
    const firebasePath = `/orders/${order.id}.json`;
    const saveResult = await httpsRequest({
      hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
      port: 443,
      path: firebasePath,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, order);

    console.log('Saved order result code:', saveResult.statusCode);

    // 4. Trigger order notifications based on settings
    if (settings) {
      const method = (settings.notificationMethod || 'disabled').toLowerCase();
      const whatsapp = settings.phone || "";

      // Option A: Discord Webhook
      if (method === 'discord' && settings.discordWebhookUrl) {
        const discordPayload = {
          content: `🎉 **New Paid Order Received via Razorpay!**`,
          embeds: [{
            title: `Order ID: ${order.id}`,
            color: 5814782, // Electric green/cyan
            fields: [
              { name: "Customer Name", value: order.name, inline: true },
              { name: "Product Purchased", value: order.product, inline: true },
              { name: "Amount Paid", value: `₹${order.price}`, inline: true },
              { name: "Customer WhatsApp", value: order.phone || "N/A", inline: true },
              { name: "Razorpay Payment ID", value: order.razorpay_payment_id, inline: false }
            ],
            timestamp: new Date().toISOString()
          }]
        };
        
        try {
          const parsedUrl = new URL(settings.discordWebhookUrl);
          await httpsRequest({
            hostname: parsedUrl.hostname,
            port: 443,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          }, discordPayload);
          console.log('Discord alert sent.');
        } catch (err) {
          console.error('Discord notification failed:', err);
        }
      }

      // Option B: WhatsApp (CallMeBot)
      if (method === 'whatsapp' && settings.callmebotApiKey && whatsapp) {
        const messageText = encodeURIComponent(
          `⚡ *New Order Received!*\n\n` +
          `*Order ID:* ${order.id}\n` +
          `*Name:* ${order.name}\n` +
          `*Product:* ${order.product}\n` +
          `*Plan:* ${order.plan}\n` +
          `*Paid:* ₹${order.price}\n` +
          `*WhatsApp:* ${order.phone}\n\n` +
          `Verify & activate on the Admin OS Panel!`
        );
        const botPhone = whatsapp.replace(/[^0-9]/g, '');
        const botPath = `/whatsapp.php?phone=${botPhone}&text=${messageText}&apikey=${settings.callmebotApiKey}`;
        
        try {
          await httpsRequest({
            hostname: 'api.callmebot.com',
            port: 443,
            path: botPath,
            method: 'GET'
          });
          console.log('CallMeBot WhatsApp notification sent.');
        } catch (err) {
          console.error('CallMeBot notification failed:', err);
        }
      }

      // Option C: Telegram
      if (method === 'telegram' && settings.telegramBotToken && settings.telegramChatId) {
        const telegramMsg = encodeURIComponent(
          `🎉 *New Order Confirmed!*\n\n` +
          `*Order ID:* \`${order.id}\`\n` +
          `*Customer:* ${order.name}\n` +
          `*Product:* ${order.product}\n` +
          `*Paid:* ₹${order.price}\n` +
          `*Contact:* [Chat on WhatsApp](https://wa.me/${order.phone})`
        );
        const tgPath = `/bot${settings.telegramBotToken}/sendMessage?chat_id=${settings.telegramChatId}&text=${telegramMsg}&parse_mode=Markdown`;
        
        try {
          await httpsRequest({
            hostname: 'api.telegram.org',
            port: 443,
            path: tgPath,
            method: 'GET'
          });
          console.log('Telegram notification sent.');
        } catch (err) {
          console.error('Telegram notification failed:', err);
        }
      }

      // Compile activation template
      let selectedTemplateText = `Hello {customer_name}! 👋\n\nThank you for ordering *{product_name}* ({plan_name}) on Lightning Deals. (Order ID: *{order_id}*)\n\nWe are preparing your premium activation credentials. You will receive them shortly via WhatsApp/Email.\n\nWarranty Expiry: {expiry_date}\n\nLet us know if you face any issues. Enjoy your premium access! ✨`;
      
      if (templates) {
        const prodLower = (order.product || '').toLowerCase();
        let matched = null;
        
        const isMatch = (t) => {
          const nameLower = (t.name || '').toLowerCase();
          const idLower = (t.id || '').toLowerCase();
          return prodLower.includes('canva') && (nameLower.includes('canva') || idLower.includes('canva')) ||
                 prodLower.includes('adobe') && (nameLower.includes('adobe') || idLower.includes('adobe')) ||
                 prodLower.includes('netflix') && (nameLower.includes('netflix') || idLower.includes('netflix') || nameLower.includes('streaming')) ||
                 prodLower.includes('spotify') && (nameLower.includes('spotify') || idLower.includes('spotify') || nameLower.includes('streaming')) ||
                 prodLower.includes('gpt') && (nameLower.includes('gpt') || idLower.includes('gpt') || nameLower.includes('chatgpt')) ||
                 prodLower.includes('cursor') && (nameLower.includes('cursor') || idLower.includes('cursor'));
        };

        if (Array.isArray(templates)) {
          matched = templates.find(isMatch);
          if (!matched && templates.length > 0) matched = templates[0];
        } else if (typeof templates === 'object') {
          matched = Object.values(templates).find(isMatch);
        }

        if (matched && matched.text) {
          selectedTemplateText = matched.text;
        }
      }

      // Replace placeholders helper
      const compileTemplate = (templateText, o) => {
        let text = templateText;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30); // 30-day standard license
        const expiryStr = expiryDate.toLocaleDateString('en-IN');

        const replacements = {
          '{customer_name}': o.name || 'Customer',
          '{customer_email}': o.email || '',
          '{product_name}': o.product || 'Premium Subscription',
          '{plan_name}': o.plan || 'Premium Plan',
          '{order_id}': o.id || '',
          '{expiry_date}': expiryStr,
          '{invite_link}': 'https://lightningdeals.online/activate/' + o.id,
          '{login_email}': o.email || '',
          '{login_password}': 'AutoGeneratedPass123',
          '{profile_name}': o.name || 'Profile 1',
          '{profile_pin}': '1234'
        };

        for (const [placeholder, value] of Object.entries(replacements)) {
          text = text.split(placeholder).join(value);
        }
        return text;
      };

      const compiledCredentials = compileTemplate(selectedTemplateText, order);

      // 5. Auto-Delivery Webhook (from 3.6)
      if (settings.fulfillmentWebhook) {
        const fulfillPayload = {
          orderId: order.id,
          name: order.name,
          email: order.email,
          phone: order.phone,
          product: order.product,
          plan: order.plan,
          price: order.price,
          razorpayPaymentId: order.razorpay_payment_id,
          activationCredentials: compiledCredentials
        };

        try {
          const parsedUrl = new URL(settings.fulfillmentWebhook);
          await httpsRequest({
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || 443,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          }, fulfillPayload);
          console.log('Fulfillment webhook triggered.');
        } catch (err) {
          console.error('Fulfillment webhook failed:', err);
        }
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Webhook processed, order captured.',
        orderId: orderId
      })
    };
  } catch (error) {
    console.error('Error in razorpay-webhook Netlify function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server Failure: ' + error.message })
    };
  }
};
