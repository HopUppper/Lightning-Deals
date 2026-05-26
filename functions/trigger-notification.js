const https = require('https');

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
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    const { order } = JSON.parse(event.body);
    if (!order) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Order payload is required.' })
      };
    }

    // 1. Fetch public settings
    let publicSettings = {};
    try {
      const res = await httpsRequest({
        hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
        port: 443,
        path: '/settings.json',
        method: 'GET'
      });
      if (res.statusCode === 200) {
        publicSettings = JSON.parse(res.body) || {};
      }
    } catch (e) {
      console.error('Failed to load public settings:', e);
    }

    // 2. Fetch secure settings
    let secureSettings = {};
    try {
      const res = await httpsRequest({
        hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
        port: 443,
        path: '/secure_settings.json',
        method: 'GET'
      });
      if (res.statusCode === 200) {
        secureSettings = JSON.parse(res.body) || {};
      }
    } catch (e) {
      console.error('Failed to load secure settings:', e);
    }

    // Merge settings
    const settings = { ...publicSettings, ...secureSettings };
    const method = (settings.notificationMethod || 'disabled').toLowerCase();
    const adminPhone = settings.phone || "917695956938";

    if (method === 'disabled') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Notifications are disabled.' })
      };
    }

    let itemsText = "";
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        itemsText += `• ${item.name} (${item.planLabel || 'Premium'}) x ${item.qty} - ₹${(item.price * item.qty).toLocaleString('en-IN')}\n`;
      });
    } else {
      itemsText = `• ${order.product} (${order.plan || 'Premium'}) x 1 - ₹${order.price.toLocaleString('en-IN')}\n`;
    }

    let messageText = `🔔 *New Order Placed!*\n\n`;
    messageText += `🆔 *Order ID:* ${order.id}\n`;
    messageText += `👤 *Customer:* ${order.name}\n`;
    messageText += `📧 *Email:* ${order.email || 'N/A'}\n`;
    messageText += `📞 *WhatsApp:* +${order.phone || 'N/A'}\n\n`;
    messageText += `📦 *Items:*\n${itemsText}\n`;
    messageText += `💰 *Total Paid:* ₹${order.price.toLocaleString('en-IN')}\n`;
    messageText += `🔗 *UTR:* ${order.utr || 'N/A'}\n`;
    messageText += `📅 *Date:* ${order.date || new Date().toLocaleString('en-IN')}`;

    let notificationSent = false;

    // Option A: WhatsApp (CallMeBot)
    if (method === 'callmebot' && settings.callmebotApiKey && adminPhone) {
      const encodedMsg = encodeURIComponent(messageText);
      const botPhone = adminPhone.replace(/[^0-9]/g, '');
      const botPath = `/whatsapp.php?phone=${botPhone}&text=${encodedMsg}&apikey=${settings.callmebotApiKey}`;
      
      try {
        await httpsRequest({
          hostname: 'api.callmebot.com',
          port: 443,
          path: botPath,
          method: 'GET'
        });
        console.log('CallMeBot notification sent successfully.');
        notificationSent = true;
      } catch (err) {
        console.error('CallMeBot secure trigger failed:', err);
      }
    }

    // Option B: Discord Webhook
    if (method === 'discord' && settings.discordWebhookUrl) {
      const discordPayload = {
        embeds: [{
          title: "🔔 New Order Placed!",
          color: 16750848, // Orange/Gold
          fields: [
            { name: "Order ID", value: order.id, inline: true },
            { name: "Customer", value: order.name, inline: true },
            { name: "Email", value: order.email || 'N/A', inline: true },
            { name: "Phone", value: `+${order.phone}`, inline: true },
            { name: "Total Paid", value: `₹${order.price.toLocaleString('en-IN')}`, inline: true },
            { name: "UTR ID", value: order.utr || 'N/A', inline: true },
            { name: "Items", value: itemsText.trim().substring(0, 1024) }
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
        console.log('Discord webhook sent successfully.');
        notificationSent = true;
      } catch (err) {
        console.error('Discord secure trigger failed:', err);
      }
    }

    // Option C: Telegram Bot
    if (method === 'telegram' && settings.telegramBotToken && settings.telegramChatId) {
      const encodedMsg = encodeURIComponent(messageText);
      const tgPath = `/bot${settings.telegramBotToken}/sendMessage?chat_id=${settings.telegramChatId}&text=${encodedMsg}&parse_mode=Markdown`;
      
      try {
        await httpsRequest({
          hostname: 'api.telegram.org',
          port: 443,
          path: tgPath,
          method: 'GET'
        });
        console.log('Telegram secure notification sent.');
        notificationSent = true;
      } catch (err) {
        console.error('Telegram secure trigger failed:', err);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, sent: notificationSent })
    };
  } catch (error) {
    console.error('Error in trigger-notification Netlify function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server Failure: ' + error.message })
    };
  }
};
