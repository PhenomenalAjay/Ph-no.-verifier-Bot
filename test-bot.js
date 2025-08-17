// Simple test script to verify bot functionality
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.error('❌ TELEGRAM_BOT_TOKEN not found in .env file');
    process.exit(1);
}

const bot = new TelegramBot(token);

// Test bot token validity
bot.getMe().then((me) => {
    console.log('✅ Bot token is valid');
    console.log('Bot info:', me);
    
    // Test webhook info
    bot.getWebHookInfo().then((info) => {
        console.log('Webhook info:', info);
    });
}).catch((error) => {
    console.error('❌ Invalid bot token:', error.message);
});
