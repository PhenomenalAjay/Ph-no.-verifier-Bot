// Import necessary modules
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const express = require('express');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 10000;

// Initialize the Telegram bot
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
    console.error('❌ TELEGRAM_BOT_TOKEN is required. Please add it to your .env file');
    process.exit(1);
}

const bot = new TelegramBot(token);

// Function to verify phone number
const verifyPhoneNumber = async (phoneNumber) => {
    const apiKey = process.env.NUMVERIFY_API_KEY;
    if (!apiKey) {
        console.error('❌ NUMVERIFY_API_KEY is required. Please add it to your .env file');
        return null;
    }

    const url = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${phoneNumber}`;

    try {
        const response = await axios.get(url);
        console.log('API Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error verifying phone number:', error.message);
        return null;
    }
};

// Handle incoming messages
bot.on('message', async (msg) => {
    console.log('📨 Received message:', msg.text);
    const chatId = msg.chat.id;
    const text = msg.text || '';

    if (text.startsWith('/start')) {
        bot.sendMessage(chatId, 'Welcome! Please send your 10-digit mobile number to verify (e.g., 9876543210)');
    } else if (/^\d{10}$/.test(text.trim())) {
        const phoneNumber = '+91' + text.trim();
        bot.sendMessage(chatId, '🔍 Verifying your number...');
        
        const verificationResult = await verifyPhoneNumber(phoneNumber);

        if (verificationResult && verificationResult.valid) {
            const { number, carrier, location, country_code, line_type } = verificationResult;
            bot.sendMessage(chatId, 
                `✅ Verification successful!\n\n` +
                `📱 Number: ${number}\n` +
                `📞 Carrier: ${carrier || 'Unknown'}\n` +
                `📍 Location: ${location || 'Unknown'}\n` +
                `🌍 Country: ${country_code || 'Unknown'}\n` +
                `📡 Type: ${line_type || 'Unknown'}`
            );
        } else {
            bot.sendMessage(chatId, '❌ Failed to verify the phone number. Please check the number format and try again.');
        }
    } else {
        bot.sendMessage(chatId, 'Please send a valid 10-digit mobile number or use /start to begin.');
    }
});

// Handle errors
bot.on("polling_error", (error) => {
    console.error("📊 Polling error:", error.code);
});

bot.on("error", (error) => {
    console.error("🤖 Bot error:", error.message);
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        status: 'Bot is running', 
        timestamp: new Date().toISOString(),
        bot_name: 'Phone Number Verifier Bot',
        webhook_url: process.env.WEBHOOK_URL || 'Not configured'
    });
});

// Webhook endpoint
app.use(express.json());
app.post(`/bot${token}`, (req, res) => {
    console.log('🔄 Webhook received:', req.body.update_id);
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/`);
    console.log(`🤖 Webhook URL: https://your-app.onrender.com/bot${token}`);
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Trying port ${PORT + 1}`);
        app.listen(PORT + 1, () => {
            console.log(`🚀 Server is running on port ${PORT + 1}`);
        });
    } else {
        console.error('❌ Server error:', error);
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// For local development - use polling
if (!process.env.WEBHOOK_URL && process.env.NODE_ENV !== 'production') {
    console.log('🔧 Using polling mode for local development');
    bot.startPolling();
}
