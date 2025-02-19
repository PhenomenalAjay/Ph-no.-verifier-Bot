// Import necessary modules
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

// Initialize the Telegram bot
const token = process.env.TELEGRAM_BOT_TOKEN; // Ensure you have this token in your .env file
const bot = new TelegramBot(token, { polling: true });

// Function to verify phone number
const verifyPhoneNumber = async (phoneNumber) => {
    const apiKey = process.env.NUMVERIFY_API_KEY; // Retrieve API key from environment variables
    const url = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${phoneNumber}`;

    try {
        const response = await axios.get(url);
        console.log('API Response:', JSON.stringify(response.data, null, 2)); // Log the API response for debugging in a readable format

        return response.data;
    } catch (error) {
        console.error('Error verifying phone number:', error);
        return null;
    }
};

// Handle incoming messages
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const command = msg.text.split(' ')[0];

    if (command === '/start') {
        bot.sendMessage(chatId, 'Welcome! Please send your mobile number to verify.');
    } else {
        const phoneNumber = '+91' + msg.text; // Prepend +91 to the mobile number
        const verificationResult = await verifyPhoneNumber(phoneNumber);

        if (verificationResult) {
            const { number, carrier, location, country_code } = verificationResult;
            bot.sendMessage(chatId, `Verification result:\n- Mobile Number: ${number}\n- Carrier: ${carrier}\n- Location: ${location}\n- Country Code: ${country_code}`);
        } else {
            bot.sendMessage(chatId, 'Failed to verify the phone number.');
        }
    }
});

// Handle polling errors
bot.on("polling_error", (error) => {
    console.error("Polling error:", error.code); // Log the error code
});
