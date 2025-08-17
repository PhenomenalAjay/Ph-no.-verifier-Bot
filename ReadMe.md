# Number Verifier Bot

A Telegram bot that verifies phone numbers using the NumVerify API.

## Features
- Verify phone numbers with carrier and location information
- Built with Node.js and Express
- Deployed on Render with webhook support

## Environment Variables

Create a `.env` file with the following variables:

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
NUMVERIFY_API_KEY=your_numverify_api_key
PORT=10000
WEBHOOK_URL=https://your-app.onrender.com/bot<your_telegram_bot_token>
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your `.env` file with the required variables

3. Start the bot:
   ```bash
   npm start
   ```

## Deployment on Render

1. Create a new Web Service on Render
2. Set the build command: `npm install`
3. Set the start command: `npm start`
4. Add environment variables in Render dashboard
5. Ensure the webhook URL matches your deployed app URL

## API Endpoints

- `GET /` - Health check endpoint
- `POST /bot<token>` - Telegram webhook endpoint

## Usage

1. Start a chat with your bot on Telegram
2. Send `/start` to begin
3. Send a phone number to verify it
